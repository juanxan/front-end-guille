import { HttpContextToken, HttpHeaders, HttpInterceptorFn } from '@angular/common/http';

export const NO_TOKEN = new HttpContextToken<boolean | undefined>(() => undefined);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache'
    });

    let clonedRequest = req; 

    if (req.context.get(NO_TOKEN) === undefined && token !== null) {
      clonedRequest = req.clone({
        headers: headers,
      });
    }
  return next(clonedRequest);
};
