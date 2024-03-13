import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Logout {

  private logoutUrl = 'http://localhost:8000/logout/';

  constructor(private http: HttpClient) { }

  logout(): Observable<any> {
    return this.http.get<any>(this.logoutUrl);
  }
}
