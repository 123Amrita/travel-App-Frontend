import { HttpInterceptorFn } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  const token = isPlatformBrowser(platformId) ? sessionStorage.getItem("token") : null;

  if(token){
    const clonedReq= req.clone({
       setHeaders: {
        Authorization: `Bearer ${token}`
       }
    });

    return next(clonedReq);
  }
  return next(req);
};
