import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { constants } from '../constants.ts';
import { Token, User, Vehicle } from '../models/authentication';
import {
  CesionParking,
  City,
  Location,
  Parking,
  ParkingCreate,
  ParkingResponse
} from '../models/parking';
import { CombinedDataPayment } from '../models/payments.js';
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
  ) { }
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

  async postVerifyEmail(code: string): Promise<Token> {
    return this.rest
      .postVerifyEmail(
        code,
        this.persistenceService.getValue(constants.PROVISIONAL_TOKEN)
      )
      .then(async (data: Token) => {
        this.persistenceService.setToken(data);
        this.persistenceService.removeValue(constants.PROVISIONAL_TOKEN);
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
        this.persistenceService.setValue(
          constants.PROVISIONAL_TOKEN,
          data.token
        );
        return data;
      })
      .catch((err: HttpErrorResponse) => {
        throw err;
      });
  }

  async postDeleteAccount(): Promise<void> {
    return this.rest
      .postDeleteAccount(
        this.persistenceService.getValue(constants.PROVISIONAL_TOKEN)
      )
      .then((_) => {
        this.persistenceService.removeValue(constants.TOKEN);
        this.persistenceService.removeValue(constants.PROVISIONAL_TOKEN);
      })
      .catch((err: HttpErrorResponse) => {
        throw err;
      });
  }

  async postLogout(): Promise<void> {
    return this.rest
      .logout()
      .then((_) => {
        this.persistenceService.removeValue(constants.TOKEN);
        this.persistenceService.removeValue(constants.PROVISIONAL_TOKEN);
      })
      .catch((err: HttpErrorResponse) => {
        throw err;
      });
  }

  async createCheckoutSessionRental(data: any): Promise<any> {
    return await this.rest
      .createCheckoutSessionRental(data)
      .then((data) => data)
      .catch((err) => {
        return err;
      });
  }


  async getCities(location: Location, query: string): Promise<City[]> {
    return this.rest
      .getCities(location, query)
      .then((data) => data)
      .catch((err) => {
        throw err;
      });
  }
  async postVehicleRegister(vehicle: Vehicle): Promise<void> {
    return this.rest
      .postVehicleRegister(vehicle)
      .then(async (data) => {
        return data;
      })
      .catch((err: HttpErrorResponse) => {
        throw err;
      });
  }

  async subscription(): Promise<{ user_info: CombinedDataPayment }> {
    return this.rest
      .subscription()
      .then((data) => data)
      .catch((err) => {
        return err;
      });
  }

  async createCheckoutSession(planId: string, url: string): Promise<any> {
    return await this.rest
      .createCheckoutSession(planId, url)
      .then((data) => data)
      .catch((err) => {
        return err;
      });
  }
  async getParkingCesion(): Promise<CesionParking> {
    return this.rest.getParkingCesion()
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });
  }
  async getVehicle(): Promise<{ vehicles: Vehicle[] } | undefined> {
    return this.rest.getVehicles()
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });
  }

  async updateParkingCesion(parkingId: number): Promise<Parking> {
    return await this.rest
      .updateParkingCesion(parkingId)
      .then((data) => data)
      .catch((err) => {
        return err;
      });
  }

  async createCheckoutSessionCredit(credit: number, url: string): Promise<any> {
    return await this.rest
      .createCheckoutSessionCredit(credit, url)
      .then((data) => data)
      .catch((err) => {
        return err;
      });
  }

  async updateVehiculoPrincipal(vehicleId: number): Promise<any> {
    return await this.rest
      .updateVehiculoPrincipal(vehicleId)
      .then((data) => data)
      .catch((err) => {
        return err;
      });
  }

}

