import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.models';

const baseUrl = 'http://localhost:8000/api/users';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<User[]> {
    return this.http.get<User[]>(baseUrl);
  }

  findByUsername(username: any): Observable<User[]> {
    return this.http.get<User[]>(`${baseUrl}?username=${username}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
}
