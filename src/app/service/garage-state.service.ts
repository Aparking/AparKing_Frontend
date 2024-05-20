import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Garage } from '../models/garagement';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root',
})
export class GarageStateService {
  private garagesSource = new BehaviorSubject<Garage[]>([]);
  garages$ = this.garagesSource.asObservable();

  constructor(private restService: RestService) {}

  loadGarages(): Promise<void> {
    return this.restService.getAllGarages().then(
      (garages: Garage[]) => {
        this.garagesSource.next(garages);
      },
      (error) => {
        console.error('Failed to load garages', error);
      }
    );
  }

  refreshGarages() {
    this.loadGarages();
  }
}
