import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const authToken = authService.getAccessToken();

  // Add Authorization header if token exists
  const authReq = authToken
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
      })
    : req;

  // Run request
  return next(authReq).pipe(
    catchError((error) => {
      // If the error is 401, try to refresh the token
      if (error.status === 401) {
        return authService.refreshToken().pipe(
          switchMap((newToken) => {
            // Clone the request and set the new token
            const retryReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken}`,
              },
            });
            return next(retryReq);
          }),
          // If the refresh token fails, logout the user
          catchError((refreshError) => {
            return throwError(() => refreshError);
          }),
        );
      }

      return throwError(() => error);
    }),
  );
};
