import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.models';
import { WsAstractService } from './ws-astract.service';

const baseUrl = 'http://localhost:8000/api/users';


@Injectable({
  providedIn: 'root'
})
export class UserService extends WsAstractService{

  serverUrl = 'http://127.0.0.1:8000/';
  apiPath = '';
  path = this.serverUrl + this.apiPath;
  async getAll(): Promise<User[]> {
    return await this.makeGetRequest(`${this.path}api/users`);
  }

  async findByUsername(username: any): Promise<User[]> {
    return await this.makeGetRequest(`${this.path}api/users?username=${username}`);
  }

  async deleteAll(): Promise<any> {
    return await this.makeDeleteRequest(`${this.path}api/users`,{});
  }
}
