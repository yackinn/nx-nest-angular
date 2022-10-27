import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, Optional }                                      from '@angular/core';
import {
  REQUEST
}                                                                            from '@nguniversal/express-engine/tokens';
import { Request }                                                           from 'express';
import { Observable }                                                        from 'rxjs';

// todo find a better way for authenticating user
// use custom cookie and update passport authentication
const xhr2                               = require('xhr2');
xhr2.prototype._restrictedHeaders.cookie = false;

@Injectable()
export class CookieInterceptor implements HttpInterceptor {
  constructor(
    @Optional() @Inject(REQUEST) private request: Request
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers = new HttpHeaders();

    headers = headers.set('cookie', this.request.get('cookie')!);

    const _req = req.clone({
      withCredentials: true,
      headers: headers,
    });

    return next.handle(_req);
  }
}
