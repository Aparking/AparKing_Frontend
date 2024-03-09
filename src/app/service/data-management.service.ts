import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Location, ParkingCreate, ParkingResponse } from '../models/parking';
import { PersistenceService } from './persistence.service';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root',
})
export class DataManagementService {
  constructor(
    private rest: RestService,
    private router: Router,
    private persistenceService: PersistenceService
  ) {}
  public userLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  public email: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public role: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public userId: BehaviorSubject<string> = new BehaviorSubject<string>('');

  formCorreo!: FormGroup;

  // parking

  async getParkingNear(coordenates: Location): Promise<ParkingResponse> {
    return this.rest
      .getParkingNear(coordenates)
      .then((data) => data)
      .catch((err) => {
        alert(err);
        return err;
      });
  }

  async getCreateParking(): Promise<ParkingCreate> {
    return this.rest
      .getCreateParking()
      .then((data) => data)
      .catch((err) => {
        alert(err);
        return err;
      });
  }

  async postCreateParking(parking: any): Promise<ParkingResponse> {
    return this.rest
      .postCreateParking(parking)
      .then((data) => data)
      .catch((err) => {
        alert(err);
        return err;
      });
  }
}
