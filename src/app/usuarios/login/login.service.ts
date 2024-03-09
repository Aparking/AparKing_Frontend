import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const  loginUrl:string = 'http://localhost:8000/login/';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private currentUser: any;
  constructor(private http: HttpClient) { }


  loginUser(data: any): Observable<any> {
    return this.http.post(loginUrl, data);
  }

  setCurrentUser(user: any): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }
}