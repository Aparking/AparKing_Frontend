import { Injectable } from '@angular/core';
import { Location, ParkingCreate, ParkingResponse } from '../models/parking';
import { WsAstractService } from './ws-astract.service';

@Injectable({
  providedIn: 'root',
})
export class RestService extends WsAstractService {
  serverUrl = 'http://localhost:8000';
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
}
