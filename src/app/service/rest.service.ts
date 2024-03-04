import { Injectable } from '@angular/core';
import { Location, ParkingResponse } from '../models/parking';
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

  async postCreateParking(): Promise<number> {
    return await this.makePostRequest(`${this.path}/parking/create/`);
  }
}
