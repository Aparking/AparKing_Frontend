import { Injectable } from '@angular/core';
import { Location, ParkingResponse } from '../models/parking';
import { WsAstractService } from './ws-astract.service';
import { Garage, Image } from '../models/garagement';

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
  async getAllGarages(): Promise<Garage[]> {
    return await this.makeGetRequest(`${this.path}/garages/`);
  }

  async getAllImages(): Promise<Image[]> {
    return await this.makeGetRequest(`${this.path}/garages/images/`);
  }

  async getImage(id: string): Promise<any> {
    return await this.makeGetRequest(`${this.path}/garages/images/${id}`);
  }

  async getGarageById(id: string): Promise<any> {
    return await this.makeGetRequest(`${this.path}/garages/${id}`);
  }

  async getAvailableGarages(): Promise<Garage[]> {
    return await this.makeGetRequest(`${this.path}/garages/available/`);
  }

  async getMyGarages(): Promise<Garage[]> {
    return await this.makeGetRequest(`${this.path}/garages/mine/`);
  }

  async getMyAvailableGarages(): Promise<Garage[]> {
    return await this.makeGetRequest(`${this.path}/garages/mine/available/`);
  }

  async createGarage(data: any): Promise<any> {
    return await this.makePostRequest(`${this.path}/garages/`, data);
  }

  async updateGarage(id: string, data: any): Promise<any> {
    return await this.makePutRequest(`${this.path}/garages/${id}`, data);
  }

  async deleteGarage(id: string): Promise<any> {
    return await this.makeDeleteRequest(`${this.path}/garages/${id}`, {});
  }
}
