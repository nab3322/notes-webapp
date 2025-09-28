import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface LoadingState {
  key: string;
  message?: string;
  progress?: number;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingStates = new Map<string, LoadingState>();
  private loadingSubject = new BehaviorSubject<Map<string, LoadingState>>(new Map());

  public loading$ = this.loadingSubject.asObservable();

  /**
   * Start loading for a specific key
   */
  start(key: string, message?: string): void {
    const loadingState: LoadingState = {
      key,
      message,
      timestamp: new Date()
    };

    this.loadingStates.set(key, loadingState);
    this.emitLoadingStates();
  }

  /**
   * Stop loading for a specific key
   */
  stop(key: string): void {
    this.loadingStates.delete(key);
    this.emitLoadingStates();
  }

  /**
   * Update loading message for a specific key
   */
  updateMessage(key: string, message: string): void {
    const state = this.loadingStates.get(key);
    if (state) {
      state.message = message;
      this.loadingStates.set(key, state);
      this.emitLoadingStates();
    }
  }

  /**
   * Update loading progress for a specific key
   */
  updateProgress(key: string, progress: number): void {
    const state = this.loadingStates.get(key);
    if (state) {
      state.progress = Math.max(0, Math.min(100, progress));
      this.loadingStates.set(key, state);
      this.emitLoadingStates();
    }
  }

  /**
   * Check if a specific key is loading
   */
  isLoading(key: string): Observable<boolean> {
    return this.loading$.pipe(
      map(states => states.has(key))
    );
  }

  /**
   * Check if any loading is active
   */
  isAnyLoading(): Observable<boolean> {
    return this.loading$.pipe(
      map(states => states.size > 0)
    );
  }

  /**
   * Get loading state for a specific key
   */
  getLoadingState(key: string): Observable<LoadingState | null> {
    return this.loading$.pipe(
      map(states => states.get(key) || null)
    );
  }

  /**
   * Get all loading states
   */
  getAllLoadingStates(): Observable<LoadingState[]> {
    return this.loading$.pipe(
      map(states => Array.from(states.values()))
    );
  }

  /**
   * Clear all loading states
   */
  clearAll(): void {
    this.loadingStates.clear();
    this.emitLoadingStates();
  }

  /**
   * Start loading with auto-stop after timeout
   */
  startWithTimeout(key: string, message?: string, timeout: number = 30000): void {
    this.start(key, message);
    
    setTimeout(() => {
      this.stop(key);
    }, timeout);
  }

  /**
   * Wrap an observable with loading state
   */
  wrapObservable<T>(key: string, message?: string) {
    return (source: Observable<T>) => {
      return new Observable<T>(observer => {
        this.start(key, message);
        
        const subscription = source.subscribe({
          next: value => observer.next(value),
          error: error => {
            this.stop(key);
            observer.error(error);
          },
          complete: () => {
            this.stop(key);
            observer.complete();
          }
        });

        return () => {
          this.stop(key);
          subscription.unsubscribe();
        };
      });
    };
  }

  /**
   * Emit current loading states
   */
  private emitLoadingStates(): void {
    this.loadingSubject.next(new Map(this.loadingStates));
  }
}