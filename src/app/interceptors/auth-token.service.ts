import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PersistenceService } from '../service/persistence.service';

@Injectable({
  providedIn: 'root',
})
export class AuthTokenService implements HttpInterceptor {
  constructor(private persistenceService: PersistenceService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.persistenceService.getToken();
    if (token) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Token ${token.token}`,
        },
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
