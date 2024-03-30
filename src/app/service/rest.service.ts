import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Token, User } from '../models/authentication';
import { Book, Garage, Image } from '../models/garagement';
import { Location, ParkingCreate, ParkingResponse } from '../models/parking';
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
  async getImageByGarageId(id: string): Promise<any> {
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
}
