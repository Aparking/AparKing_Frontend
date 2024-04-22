import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { constants } from '../constants.ts';
import { PersistenceService } from '../service/persistence.service';

@Injectable({
  providedIn: 'root',
})
export class VerifyGuard implements CanActivate {
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
    if (token) {
      this.navCtr.navigateRoot('/G11');
      return false;
    }
    const provisionalToken = this.persistenceService.getValue(
      constants.PROVISIONAL_TOKEN
    );
    if (!provisionalToken) {
      this.navCtr.navigateRoot('register');
      return false;
    }
    return true;
  }
}
