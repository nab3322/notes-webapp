import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, throwError, timer } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { User, AuthResponse, LoginRequest, RegisterRequest, UserProfile } from '@core/models/user.model';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = environment.apiUrl;
  private readonly TOKEN_KEY = 'notes_auth_token';
  private readonly USER_KEY = 'notes_current_user';
  private readonly REFRESH_TOKEN_KEY = 'notes_refresh_token';

  private currentUserSubject = new BehaviorSubject<User | null>(this.getCurrentUser());
  public currentUser$ = this.currentUserSubject.asObservable();

  private tokenRefreshTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.initializeAuth();
  }

  // Authentication Methods
  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/auth/login`, credentials)
      .pipe(
        tap(response => this.handleAuthSuccess(response)),
        catchError(error => {
          this.notificationService.showError('Credenziali non valide');
          return throwError(() => error);
        })
      );
  }

  register(userData: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/auth/register`, userData)
      .pipe(
        tap(response => {
          this.handleAuthSuccess(response);
          this.notificationService.showSuccess('Registrazione completata con successo!');
        }),
        catchError(error => {
          const message = error.error?.message || 'Errore durante la registrazione';
          this.notificationService.showError(message);
          return throwError(() => error);
        })
      );
  }

  logout(): void {
    this.clearAuthData();
    this.clearTokenRefreshTimer();
    this.currentUserSubject.next(null);
    this.notificationService.showInfo('Logout effettuato con successo');
    this.router.navigate(['/auth/login']);
  }

  refreshToken(): Observable<AuthResponse> {
    const refreshToken = localStorage.getItem(this.REFRESH_TOKEN_KEY);
    
    if (!refreshToken) {
      this.logout();
      return throwError(() => new Error('No refresh token available'));
    }

    return this.http.post<AuthResponse>(`${this.API_URL}/auth/refresh`, { refreshToken })
      .pipe(
        tap(response => this.handleAuthSuccess(response)),
        catchError(error => {
          this.logout();
          return throwError(() => error);
        })
      );
  }

  // User Management
  getUserProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.API_URL}/users/profile`);
  }

  updateProfile(profile: Partial<UserProfile>): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${this.API_URL}/users/profile`, profile)
      .pipe(
        tap(updatedProfile => {
          const currentUser = this.getCurrentUser();
          if (currentUser) {
            const updatedUser: User = {
              ...currentUser,
              username: updatedProfile.username || currentUser.username
            };
            localStorage.setItem(this.USER_KEY, JSON.stringify(updatedUser));
            this.currentUserSubject.next(updatedUser);
          }
        })
      );
  }

  changePassword(currentPassword: string, newPassword: string): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/auth/change-password`, {
      currentPassword,
      newPassword
    }).pipe(
      tap(() => {
        this.notificationService.showSuccess('Password cambiata con successo');
      })
    );
  }

  // Token Management
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;

    const isValid = !this.isTokenExpired(token);
    if (!isValid) {
      this.logout();
      return false;
    }

    return true;
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user ? true : false; // Simplified role check
  }

  // Private Methods
  private initializeAuth(): void {
    if (this.isLoggedIn()) {
      this.setupTokenRefresh();
    }
  }

  private handleAuthSuccess(response: AuthResponse): void {
    // Store tokens
    localStorage.setItem(this.TOKEN_KEY, response.token);
    
    // Store user data
    const user: User = {
      id: response.userId,
      username: response.username,
      createdAt: new Date()
    };
    
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.currentUserSubject.next(user);
    
    // Setup token refresh
    this.setupTokenRefresh();
  }

  private clearAuthData(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000;
      return Date.now() >= exp;
    } catch {
      return true;
    }
  }

  private getTokenExpirationDate(token: string): Date | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000;
      return new Date(exp);
    } catch {
      return null;
    }
  }

  private setupTokenRefresh(): void {
    const token = this.getToken();
    if (!token) return;

    const expirationDate = this.getTokenExpirationDate(token);
    if (!expirationDate) return;

    // Refresh token 5 minutes before expiration
    const refreshTime = expirationDate.getTime() - Date.now() - (5 * 60 * 1000);
    
    if (refreshTime > 0) {
      this.tokenRefreshTimer = timer(refreshTime).subscribe(() => {
        this.refreshToken().subscribe({
          next: () => console.log('Token refreshed successfully'),
          error: () => this.logout()
        });
      });
    }
  }

  private clearTokenRefreshTimer(): void {
    if (this.tokenRefreshTimer) {
      this.tokenRefreshTimer.unsubscribe();
      this.tokenRefreshTimer = null;
    }
  }
}