import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const  loginUrl:string = 'http://localhost:8000/login/';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }


  loginUser(data: any): Observable<any> {
    return this.http.post(loginUrl, data);
  }
}
