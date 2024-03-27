import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Token, User } from '../models/authentication';
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
}
