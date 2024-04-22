import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { PersistenceService } from '../service/persistence.service';

@Injectable({
  providedIn: 'root',
})
export class NeedAuthGuard implements CanActivate {
  constructor(
    private persistenceService: PersistenceService,
    private navCtr: NavController
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = this.persistenceService.getToken();
    if (!token) {
      return true;
    }
    this.navCtr.navigateRoot('/G11');
    return false;
  }
}
