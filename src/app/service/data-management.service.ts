import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Token, User } from '../models/authentication';
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
        return err;
      });
  }

  async getCreateParking(): Promise<ParkingCreate> {
    return this.rest
      .getCreateParking()
      .then((data) => data)
      .catch((err) => {
        return err;
      });
  }

  async postCreateParking(parking: any): Promise<ParkingResponse> {
    return this.rest
      .postCreateParking(parking)
      .then((data) => data)
      .catch((err) => {
        return err;
      });
  }

  async postLogin(user: User): Promise<Token> {
    return this.rest
      .postLogin(user)
      .then(async (data) => {
        this.persistenceService.setToken(data);
        return data;
      })
      .catch((err: HttpErrorResponse) => {
        throw err;
      });
  }

  async postRegister(user: User): Promise<Token> {
    return this.rest
      .postRegister(user)
      .then(async (data) => {
        this.persistenceService.setToken(data);
        return data;
      })
      .catch((err: HttpErrorResponse) => {
        throw err;
      });
  }
}
