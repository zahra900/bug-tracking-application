import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       
        let currentUser = this.authService.currentUserValue;
       
       
        if (currentUser && currentUser['access_token']) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser['access_token']}`
                }
            });
            this.authService.isAdmin();
        }
        
        return next.handle(request);
    }
}