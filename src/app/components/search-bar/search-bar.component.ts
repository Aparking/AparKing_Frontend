// search-bar.component.ts
import { Component } from '@angular/core';
import { SearchbarChangeEventDetail } from '@ionic/angular';
import { IonSearchbarCustomEvent } from '@ionic/core';
import { CityService } from '../../service/cities.service';
import { LocationService } from '../../service/location.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
//   styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  cities: any[] = [];

  constructor(
    private cityService: CityService,
    private locationService: LocationService
  ) {}

  async searchCities($event: IonSearchbarCustomEvent<SearchbarChangeEventDetail>) {
    const query = $event.target.value;
    let coordinates;
    try {
      // Get current coordinates
      coordinates = await this.locationService.getLocation();
    } catch (error) {
      console.error('Error getting location:', error);
      return;
    }

    // Check if coordinates were obtained successfully
    if (coordinates) {
      // Call service to get cities
      this.cityService
        .getCitiesNear(coordinates.coords.latitude, coordinates.coords.longitude)
        .subscribe(
          (data: any) => {
            this.cities = data;
          },
          (error) => {
            console.error('Error getting cities:', error);
          }
        );
    } else {
      console.error('Could not obtain coordinates.');
    }
  }
}
