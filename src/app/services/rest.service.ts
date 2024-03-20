import { Injectable } from '@angular/core';
import { Garage, Image } from '../models/garagement';
import { Location, ParkingResponse } from '../models/parking';
import { WsAstractService } from './ws-astract.service';

@Injectable({
  providedIn: 'root',
})
export class RestService extends WsAstractService {
  serverUrl = 'http://127.0.0.1:8000/';
  apiPath = '';
  path = this.serverUrl + this.apiPath;

  // PARKING

  async getParkingNear(coordenates: Location): Promise<ParkingResponse> {
    return await this.makePostRequest(
      `${this.path}/parking/near/`,
      coordenates
    );
  }

  async postCreateParking(): Promise<number> {
    return await this.makePostRequest(`${this.path}/parking/create/`);
  }

  // GARAGEMENT

  // - Garages
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

  // - Images

  async getCreateImage(data: any): Promise<any> {
    return await this.makePostRequest(`${this.path}/garages/images/create/`, data);
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
}

