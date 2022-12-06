import { AuthService } from './../services/auth.service';

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { exhaustMap, Observable, take } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        auth: 'my-auth-token',
      }),
    };

    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(request);
        }
        const modifiedRequest = request.clone({
          headers: request.headers.set('auth', user.token),
        });
        return next.handle(modifiedRequest);
      })
    );
  }
}
