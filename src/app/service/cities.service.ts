import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  apiUrl = 'https://localhost/get_cities';

  constructor(private http: HttpClient) { }

  getCitiesNear(latitude: number, longitude: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?latitude=${latitude}&longitude=${longitude}`);
  }
}
