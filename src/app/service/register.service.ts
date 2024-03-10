import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const  registerUrl:string = 'http://localhost:8000/register/';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private http: HttpClient) { }


  registerUser(data: any): Observable<any> {
    return this.http.post(registerUrl, data);
  }
}
