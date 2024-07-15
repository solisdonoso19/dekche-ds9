import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = sessionStorage.getItem('token') || '';

  const authReq = req.clone({
    setHeaders: {
      'x-access-token': authToken,
    },
  });

  return next(authReq);
};

export const authInterceptor = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  return next(req).pipe(
    tap((event) => {
      if (event.type === HttpEventType.Response) {
        if (event.status === 401 || event.status === 403) {
          console.log(event.status);
          sessionStorage.clear();
          location.replace('/login');
        }
      }
    }),
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
        console.log('Error Unauthorized or Forbidden:', error.status);
        sessionStorage.clear();
        location.replace('/login');
      }
      return throwError(error);
    })
  );
};
