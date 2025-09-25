import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { NotificationService } from './notification.service';
import { environment } from '@env/environment';

export interface WebSocketMessage {
  type: string;
  data: any;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  
  private connectionStatusSubject = new BehaviorSubject<boolean>(false);
  private messageSubject = new Subject<WebSocketMessage>();
  
  public connectionStatus$ = this.connectionStatusSubject.asObservable();
  public messages$ = this.messageSubject.asObservable();

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  connect(): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      return; // Already connected
    }

    const token = this.authService.getToken();
    if (!token) {
      console.warn('No auth token available for WebSocket connection');
      return;
    }

    try {
      const wsUrl = `${environment.wsUrl}?token=${token}`;
      this.socket = new WebSocket(wsUrl);

      this.socket.onopen = () => {
        console.log('WebSocket connected');
        this.connectionStatusSubject.next(true);
        this.reconnectAttempts = 0;
      };

      this.socket.onmessage = (event) => {
        try {
          const message: WebSocketMessage = {
            ...JSON.parse(event.data),
            timestamp: new Date()
          };
          this.messageSubject.next(message);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      this.socket.onclose = (event) => {
        console.log('WebSocket disconnected:', event.code, event.reason);
        this.connectionStatusSubject.next(false);
        
        if (!event.wasClean && this.shouldReconnect()) {
          this.scheduleReconnect();
        }
      };

      this.socket.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.notificationService.showError('Errore di connessione in tempo reale');
      };

    } catch (error) {
      console.error('Error creating WebSocket connection:', error);
      this.notificationService.showError('Impossibile stabilire la connessione');
    }
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.close(1000, 'User disconnected');
      this.socket = null;
    }
    this.connectionStatusSubject.next(false);
  }

  sendMessage(type: string, data: any): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      const message = {
        type,
        data,
        timestamp: new Date().toISOString()
      };
      this.socket.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket is not connected. Cannot send message.');
      this.notificationService.showWarning('Connessione non disponibile');
    }
  }

  // Subscribe to specific message types
  onMessageType(messageType: string): Observable<WebSocketMessage> {
    return new Observable(subscriber => {
      const subscription = this.messages$.subscribe(message => {
        if (message.type === messageType) {
          subscriber.next(message);
        }
      });
      
      return () => subscription.unsubscribe();
    });
  }

  isConnected(): boolean {
    return this.socket?.readyState === WebSocket.OPEN;
  }

  private shouldReconnect(): boolean {
    return this.reconnectAttempts < this.maxReconnectAttempts && 
           this.authService.isLoggedIn();
  }

  private scheduleReconnect(): void {
    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
    
    console.log(`Scheduling WebSocket reconnection attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts} in ${delay}ms`);
    
    setTimeout(() => {
      if (this.shouldReconnect()) {
        this.connect();
      }
    }, delay);
  }
}