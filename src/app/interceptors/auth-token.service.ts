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
    if (this.persistenceService.getToken()) {
      const token = this.persistenceService.getToken();
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Token ${token}`,
        },
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
