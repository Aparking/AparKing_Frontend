import { Component, OnInit } from '@angular/core';
import { Garage, Image } from 'src/app/models/garagement';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-available-garages',
  templateUrl: './available-garages.component.html',
  styleUrls: ['./available-garages.component.scss'],
})
export class AvailableGaragesComponent  implements OnInit {
  garages!: any[];
  garage: Garage[] = [];
  nameFilter: string = '';
  priceFilter!: number;
  dimensionFilter!: number;

  constructor(private restService: RestService) {}

  ngOnInit(): void {
    this.getAvailableGarages();
  }

  getAvailableGarages() {
    this.restService.getAvailableGarages().then((garages) => {
      this.garages = garages;
      console.log(this.garages);
    });
  }

  get filteredGarages() {
    return this.garages.filter(garage =>
      garage.name.toLowerCase().includes(this.nameFilter.toLowerCase()) &&
      (!this.priceFilter || garage.price <= this.priceFilter) &&
      (!this.dimensionFilter || Math.max(garage.height, garage.width, garage.length) <= this.dimensionFilter)
    );
  }
}
