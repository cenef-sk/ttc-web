import { Injectable, Inject } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse
} from '@angular/common/http';

import { Router } from '@angular/router';
import { Globals } from '../globals';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { valid } from 'src/utils/token';
import { clearLocal } from "src/utils/localStorage";


/** Pass untouched request through to the next request handler. */
@Injectable()
export class NoopInterceptor implements HttpInterceptor {

  constructor(
    private globals: Globals,
    @Inject('LOCALSTORAGE') public local,
    private router: Router,
  ) {
  }

  loginMe() {
    this.router.navigate(['/']);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    const accessToken = this.local.getItem('accessToken')
    if (accessToken) {
      if (valid(accessToken)) {
        const authReq = req.clone({
          headers: req.headers.set('Authorization', "Bearer " + accessToken)
        });

        // return next.handle(authReq);

        return next.handle(authReq).pipe(
          tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
            }
          }),
          catchError((err: any) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
                  // this.router.navigate(['login']);
                  clearLocal(this.local);
                  this.globals.token = null;
                  this.globals.user = null;
                  this.loginMe();
              }
            }
            return of(err);
          })
        );

      } else {
        clearLocal(this.local);
        this.globals.token = null;
        this.globals.user = null;
        this.loginMe();
        // this.router.navigate(['login']);
      }
    } else {
      return next.handle(req);
    }
  }
}
