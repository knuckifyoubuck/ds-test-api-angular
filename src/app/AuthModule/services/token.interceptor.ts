import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

@Injectable()
export class TokenInterceptor {

  private authService: AuthService;

  constructor(private injector: Injector) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authService = this.injector.get(AuthService);
    const token: string | null = this.authService.getToken();
    request = request.clone({
      setHeaders: {
        'X-Token': `${token}`,
        'Content-Type': 'application/json'
      }
    });
    return next.handle(request);
  }
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((response: HttpErrorResponse) => {
          if(response.error instanceof HttpErrorResponse && response.error.status === 401) {
            localStorage.removeItem('token');
            this.router.navigateByUrl('/login');
          }
          return throwError(() => new Error(response.error));
        })
      )
  }
}
