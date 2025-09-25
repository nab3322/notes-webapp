import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '@core/services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Skip loading for certain requests
    if (this.shouldSkipLoading(request)) {
      return next.handle(request);
    }

    this.loadingService.show();
    
    return next.handle(request).pipe(
      finalize(() => this.loadingService.hide())
    );
  }

  private shouldSkipLoading(request: HttpRequest<unknown>): boolean {
    // Skip loading for auto-save requests, websocket, etc.
    return request.url.includes('/auto-save') ||
           request.url.includes('/heartbeat') ||
           request.headers.has('X-Skip-Loading');
  }
}