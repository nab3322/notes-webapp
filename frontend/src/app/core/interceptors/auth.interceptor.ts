import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Skip auth for certain requests
    if (this.shouldSkipAuth(req)) {
      return next.handle(req);
    }

    // Add auth token to request
    const authReq = this.addTokenToRequest(req);

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle 401 unauthorized errors
        if (error.status === 401 && !this.isAuthRequest(req)) {
          return this.handle401Error(authReq, next);
        }

        return throwError(() => error);
      })
    );
  }

  /**
   * Add authentication token to request headers
   */
  private addTokenToRequest(req: HttpRequest<any>): HttpRequest<any> {
    const token = this.authService.getToken();
    
    if (token) {
      return req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return req;
  }

  /**
   * Handle 401 unauthorized errors with token refresh
   */
  private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const refreshToken = this.authService.getRefreshToken();
      
      if (refreshToken) {
        return this.authService.refreshToken().pipe(
          switchMap((tokenResponse: any) => {
            this.isRefreshing = false;
            this.refreshTokenSubject.next(tokenResponse.token);
            
            // Retry the original request with new token
            const newAuthReq = this.addTokenToRequest(req);
            return next.handle(newAuthReq);
          }),
          catchError((error) => {
            this.isRefreshing = false;
            this.refreshTokenSubject.next(null);
            
            // Refresh failed, logout user
            this.authService.logout().subscribe();
            
            return throwError(() => error);
          })
        );
      } else {
        // No refresh token, logout user
        this.isRefreshing = false;
        this.authService.logout().subscribe();
        return throwError(() => new Error('No refresh token available'));
      }
    } else {
      // Token refresh is in progress, wait for it to complete
      return this.refreshTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(() => {
          const newAuthReq = this.addTokenToRequest(req);
          return next.handle(newAuthReq);
        })
      );
    }
  }

  /**
   * Check if request should skip authentication
   */
  private shouldSkipAuth(req: HttpRequest<any>): boolean {
    const skipAuthUrls = [
      '/api/auth/login',
      '/api/auth/register',
      '/api/auth/refresh',
      '/api/auth/forgot-password',
      '/api/auth/reset-password'
    ];

    return skipAuthUrls.some(url => req.url.includes(url)) ||
           req.headers.has('Skip-Auth') ||
           req.headers.has('No-Auth');
  }

  /**
   * Check if request is an authentication request
   */
  private isAuthRequest(req: HttpRequest<any>): boolean {
    return req.url.includes('/api/auth/');
  }
}