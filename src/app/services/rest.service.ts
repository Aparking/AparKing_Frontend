import { Injectable } from '@angular/core';
import { Garage } from '../models/garagement';
import { Location, ParkingResponse } from '../models/parking';
import { WsAstractService } from './ws-astract.service';

@Injectable({
  providedIn: 'root',
})
export class RestService extends WsAstractService {
  serverUrl = 'http://127.0.0.1:8000';
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

  // Garagement

  async getGarages(): Promise<Garage[]> {
    return await this.makeGetRequest(`${this.path}/garages/`);
  }

  async getGarageById(id: string): Promise<Garage> {
    return await this.makeGetRequest(`${this.path}/garages/${id}`);
  }

  async createGarage(data: any): Promise<Garage> {
    return await this.makePostRequest(`${this.path}/garages/`, data);
  }

  async updateGarage(id: string, data: any): Promise<Garage> {
    return await this.makePutRequest(`${this.path}/garages/${id}`, data);
  }

  async deleteGarage(id: string): Promise<any> {
    return await this.makeDeleteRequest(`${this.path}/garages/${id}`, {});
  }
}