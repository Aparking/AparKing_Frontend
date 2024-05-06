import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Token, User, Vehicle } from '../models/authentication';
import { Availability, Book, Garage, Image } from '../models/garagement';

import {
  CesionParking,
  City,
  Location,
  Parking,
  ParkingCreate,
  ParkingResponse
} from '../models/parking';

import { CombinedDataPayment } from '../models/payments';
import { WsAbstractService } from './ws-astract.service';

@Injectable({
  providedIn: 'root',
})
export class RestService extends WsAbstractService {
  serverUrl = environment.restUrl;
  apiPath = '';
  path = this.serverUrl + this.apiPath;

  async getParkingNear(coordenates: Location): Promise<ParkingResponse> {
    return await this.makePostRequest(
      `${this.path}/parking/near/`,
      coordenates
    );
  }

  async postCreateParking(parking: any): Promise<number> {
    return await this.makePostRequest(`${this.path}/parking/create/`, parking);
  }

  async getCreateParking(): Promise<ParkingCreate> {
    return await this.makeGetRequest(`${this.path}/parking/getCreate/`);
  }

  async postLogin(user: User): Promise<Token> {
    return await this.makePostRequest(`${this.path}/login/`, user);
  }

  async postVerifyEmail(code: string, token: string): Promise<Token> {
    const params = {
      code: code,
      token: token,
    };
    return await this.makePostRequest(`${this.path}/verify/`, params);
  }

  async postRegister(user: User): Promise<Token> {
    return await this.makePostRequest(`${this.path}/register/`, user);
  }

  async postDeleteAccount(token: string): Promise<void> {
    await this.makePostRequest(`${this.path}/deleteAccount/`, { token: token });
  }

  async logout(): Promise<void> {
    return await this.makeGetRequest(`${this.path}/logout/`);
  }

  async getUserData(): Promise<User> {
    return await this.makeGetRequest(`${this.path}/user-info/`);
  }

  async updateUser(data: User): Promise<any> {
    return await this.makePostRequest(`${this.path}/user/profile`, data);
  }
  async getAllGarages(): Promise<Garage[]> {
    return await this.makeGetRequest(`${this.path}/garages/`);
  }

  async getMyGarages(): Promise<Garage[]> {
    return await this.makeGetRequest(`${this.path}/garages/mine/`);
  }

  async getAvailableGarages(): Promise<Garage[]> {
    return await this.makeGetRequest(`${this.path}/garages/available/`);
  }

  async getMyAvailableGarages(): Promise<Garage[]> {
    return await this.makeGetRequest(`${this.path}/garages/mine/available/`);
  }

  async getGarageById(id: string): Promise<any> {
    return await this.makeGetRequest(`${this.path}/garages/${id}/`);
  }

  async getCreateGarage(data: any): Promise<any> {
    return await this.makePostRequest(`${this.path}/garages/create/`, data);
  }

  async updateGarage(id: string, data: any): Promise<Garage> {
    return await this.makePutRequest(`${this.path}/garages/${id}/`, data);
  }

  async deleteGarage(id: string): Promise<any> {
    return await this.makeDeleteRequest(`${this.path}/garages/${id}/`, {});
  }

  async getCreateImage(data: any): Promise<any> {
    return await this.makePostRequest(
      `${this.path}/garages/images/create/`,
      data
    );
  }

  async getAllImages(): Promise<Image[]> {
    return await this.makeGetRequest(`${this.path}/garages/images/`);
  }

  async getImage(id: string): Promise<any> {
    return await this.makeGetRequest(`${this.path}/garages/images/${id}/`);
  }

  async getImagesByGarageId(id: string): Promise<any> {
    return await this.makeGetRequest(`${this.path}/garages/${id}/images/`);
  }

  async getBookings(): Promise<Book[]> {
    return await this.makeGetRequest(`${this.path}/bookings/`);
  }
  async getBookingById(id: string): Promise<Book> {
    return await this.makeGetRequest(`${this.path}/bookings/${id}/`);
  }
  async createBooking(data: any): Promise<any> {
    return await this.makePostRequest(`${this.path}/bookings/create/`, data);
  }
  async deleteBooking(id: string): Promise<any> {
    return await this.makeDeleteRequest(`${this.path}/bookings/${id}/`, {});
  }

  async getAvailabilityById(id: string): Promise<any> {
    return await this.makeGetRequest(
      `${this.path}/garages/availability/${id}/`
    );
  }
  async getAvailabilitiesByGarageId(id: string): Promise<Availability[]> {
    return await this.makeGetRequest(
      `${this.path}/garages/${id}/availability/`
    );
  }
  async createAvailability(data: any): Promise<any> {
    return await this.makePostRequest(
      `${this.path}/garages/availability/create/`,
      data
    );
  }
  async updateAvailability(data: any): Promise<any> {
    return await this.makePutRequest(
      `${this.path}/garages/availability/${data.id}/`,
      data
    );
  }
  async deleteAvailability(id: string): Promise<any> {
    return await this.makeDeleteRequest(
      `${this.path}/garages/availability/${id}/`,
      {}
    );
  }

  async createCheckoutSessionRental(data: any): Promise<any> {
    try {
      return await this.makePostRequest(
        `${this.path}/bookings/createCheckoutSession/`,
        data
      );
    } catch (error) {
      throw error;
    }
  }

  async getCities(coordenates: Location, query: string): Promise<City[]> {
    return await this.makePostRequest(
      `${this.path}/parking/get_cities/${query}/`,
      coordenates
    );
  }

  async postVehicleRegister(vehicle: Vehicle): Promise<void> {
    return await this.makePostRequest(`${this.path}/registerVehicle/`, vehicle);
  }

  async subscription(): Promise<{ user_info: CombinedDataPayment }> {
    return await this.makeGetRequest(`${this.path}/payment/api/subscriptions/`);
  }

  async createCheckoutSession(planId: string, url: string): Promise<any> {
    try {
      return await this.makePostRequest(
        `${this.path}/payment/api/create-checkout-session/`,
        { planId, url }
      );
    } catch (error) {
      throw error;
    }
  }
  async getParkingCesion(): Promise<CesionParking> {
    return await this.makeGetRequest(`${this.path}/parking/getParkingCesion/`);
  }

  async getVehicles(): Promise<{ vehicles: Vehicle[] } | undefined> {
    return await this.makeGetRequest(`${this.path}/parking/getVehicles/`);
  }

  async updateParkingCesion(parkingId: number): Promise<Parking> {
    return await this.makePutRequest(`${this.path}/parking/updateParkingCesion/`, parkingId);
  }

  async createCheckoutSessionCredit(credit: number, url: string): Promise<any> {
    try {
      return await this.makePostRequest(
        `${this.path}/payment/credits/`,
        { credit, url }
      );
    } catch (error) {
      throw error;
    }
  }

  async updateVehiculoPrincipal(vehicleId: number): Promise<any> {
    return await this.makePutRequest(`${this.path}/updateVehicle/`, vehicleId);
  }

}
