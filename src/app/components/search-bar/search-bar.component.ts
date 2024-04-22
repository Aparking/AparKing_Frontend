import { DataManagementService } from 'src/app/service/data-management.service';
// search-bar.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { City, Location } from 'src/app/models/parking';
import { LocationService } from '../../service/location.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  //   styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  @Input() cities: City[] | undefined;
  originalCities: City[] = [];
  desiredlocation: Location | undefined;
  query: string = '';

  constructor(
    private datamanagement: DataManagementService,
    private locationService: LocationService,
    private modalController: ModalController,
    private loadingCtrl: LoadingController
  ) {
    if (!this.cities) {
      this.cities = [];
    }
  }
  ngOnInit(): void {
    if (this.cities && this.cities.length > 0) {
      this.originalCities = [...this.cities];
    }
  }

  public manageClearCities() {
    this.cities = this.originalCities;
    this.query = '';
  }

  async searchCities($event: Event) {
    let coordinates;
    const loading = await this.loadingCtrl.create({
      message: 'Buscando ciudades...',
    });
    await loading.present();
    try {
      // Get current coordinates
      coordinates = await this.locationService.getLocation();
      if (coordinates) {
        this.desiredlocation = {
          latitude: coordinates.coords.latitude,
          longitude: coordinates.coords.longitude,
        };
      }
    } catch (error) {
      console.error('Error getting location:', error);
      return;
    }

    // Check if coordinates were obtained successfully
    if (this.desiredlocation) {
      // Call service to get cities
      this.datamanagement
        .getCities(
          this.desiredlocation,
          this.query == '' ? 'empty' : this.query
        )
        .then((cities) => (this.cities = cities))
        .catch((error) => console.error('Error getting cities', error));
    } else {
      console.error('Could not obtain coordinates.');
    }
    loading.dismiss();
  }

  async closeModal(city?: City) {
    await this.modalController.dismiss(city);
  }
}
