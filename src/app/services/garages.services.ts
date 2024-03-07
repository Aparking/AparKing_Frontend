import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Garage } from 'src/app/models/garage.models';



@Injectable({
  providedIn: 'root'
})
export class GarageService {
  API_URL = 'http://localhost:8000/api/garages/';

  constructor(private http: HttpClient) { }

  garageCreate(data: any){
    return this.http.post<Garage>(this.API_URL, data);
  } 

}
