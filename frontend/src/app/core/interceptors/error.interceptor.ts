import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private readonly MAX_RETRIES = 2;
  private readonly RETRY_DELAY = 1000;
    snackBar: any;

  constructor(private notificationService: NotificationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      // Retry failed requests (except for certain status codes)
      retry({
        count: this.shouldRetry(req) ? this.MAX_RETRIES : 0,
        delay: this.RETRY_DELAY
      }),
      catchError((error: HttpErrorResponse) => {
        this.handleError(error, req);
        return throwError(() => error);
      })
    );
  }

  /**
   * Handle HTTP errors
   */
  private handleError(error: HttpErrorResponse, req: HttpRequest<any>): void {
    // Skip error handling for certain requests
    if (this.shouldSkipErrorHandling(req, error)) {
      return;
    }

    let errorMessage = 'Si è verificato un errore imprevisto';
    let showNotification = true;

    switch (error.status) {
      case 0:
        // Network error
        errorMessage = 'Errore di connessione. Verifica la tua connessione internet.';
        break;

      case 400:
        // Bad Request
        errorMessage = this.extractErrorMessage(error) || 'Richiesta non valida';
        break;

      case 401:
        // Unauthorized - usually handled by AuthInterceptor
        showNotification = false;
        break;

      case 403:
        // Forbidden
        errorMessage = 'Non hai i permessi necessari per questa operazione';
        break;

      case 404:
        // Not Found
        errorMessage = 'Risorsa non trovata';
        break;

      case 409:
        // Conflict
        errorMessage = this.extractErrorMessage(error) || 'Conflitto nei dati';
        break;

      case 422:
        // Unprocessable Entity
        errorMessage = this.extractErrorMessage(error) || 'Dati non validi';
        break;

      case 429:
        // Too Many Requests
        errorMessage = 'Troppe richieste. Riprova tra qualche minuto.';
        break;

      case 500:
        // Internal Server Error
        errorMessage = 'Errore del server. Riprova più tardi.';
        break;

      case 502:
        // Bad Gateway
        errorMessage = 'Il server non è temporaneamente disponibile';
        break;

      case 503:
        // Service Unavailable
        errorMessage = 'Servizio temporaneamente non disponibile';
        break;

      case 504:
        // Gateway Timeout
        errorMessage = 'Timeout del server. Riprova più tardi.';
        break;

      default:
        // Other errors
        errorMessage = this.extractErrorMessage(error) || `Errore ${error.status}`;
        break;
    }

    // Show notification if appropriate
    if (showNotification) {
      const isServerError = error.status >= 500;
      
      if (isServerError) {
        // Il servizio potrebbe essere implementato così:
        const snackBarRef = this.snackBar.open(errorMessage, 'Riprova', {
        duration: 0, // Impostando duration a 0 la notifica diventa persistente
    });

    // La callback viene gestita iscrivendosi all'evento 'onAction'
        snackBarRef.onAction().subscribe(() => {
        window.location.reload();
    });

} else {
    this.notificationService.showError(errorMessage);
}
    }

    // Log error for debugging
    this.logError(error, req);
  }

  /**
   * Extract error message from response
   */
  private extractErrorMessage(error: HttpErrorResponse): string | null {
    if (error.error) {
      // Try different common error message formats
      if (typeof error.error === 'string') {
        return error.error;
      }
      
      if (error.error.message) {
        return error.error.message;
      }
      
      if (error.error.error) {
        return error.error.error;
      }
      
      if (error.error.details) {
        return error.error.details;
      }

      // Handle validation errors
      if (error.error.errors && Array.isArray(error.error.errors)) {
        return error.error.errors.join(', ');
      }

      // Handle field-specific errors
      if (typeof error.error === 'object') {
        const firstErrorKey = Object.keys(error.error)[0];
        if (firstErrorKey && Array.isArray(error.error[firstErrorKey])) {
          return error.error[firstErrorKey][0];
        }
      }
    }

    return error.message || null;
  }

  /**
   * Check if request should be retried
   */
  private shouldRetry(req: HttpRequest<any>): boolean {
    // Only retry GET requests and certain safe operations
    const safeMethodsForRetry = ['GET', 'HEAD', 'OPTIONS'];
    
    // Don't retry auth requests
    if (req.url.includes('/api/auth/')) {
      return false;
    }

    // Don't retry file uploads
    if (req.body instanceof FormData) {
      return false;
    }

    return safeMethodsForRetry.includes(req.method);
  }

  /**
   * Check if error handling should be skipped
   */
  private shouldSkipErrorHandling(req: HttpRequest<any>, error: HttpErrorResponse): boolean {
    // Skip if request has specific header
    if (req.headers.has('Skip-Error-Handling')) {
      return true;
    }

    // Skip for certain URLs
    const skipUrls = [
      '/api/auth/refresh', // Handled by AuthInterceptor
      '/api/health',       // Health checks
    ];

    if (skipUrls.some(url => req.url.includes(url))) {
      return true;
    }

    // Skip 401 errors (handled by AuthInterceptor)
    if (error.status === 401) {
      return true;
    }

    return false;
  }

  /**
   * Log error for debugging
   */
  private logError(error: HttpErrorResponse, req: HttpRequest<any>): void {
    const errorInfo = {
      status: error.status,
      statusText: error.statusText,
      url: req.url,
      method: req.method,
      message: error.message,
      timestamp: new Date().toISOString()
    };

    console.error('HTTP Error:', errorInfo);
    
    // Could send to logging service here
    // this.loggingService.logError(errorInfo);
  }
}