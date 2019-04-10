import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { ConfigurationService } from '../services/configuration.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private config: ConfigurationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.config.handleForbiddenAccess();
        }
        return throwError(err);
      })
    );
  }
}
