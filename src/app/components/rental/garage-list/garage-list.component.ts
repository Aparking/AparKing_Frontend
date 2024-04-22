import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable, Subject, combineLatest, of, switchMap } from 'rxjs';
import { Garage } from 'src/app/models/garagement';
import { RestService } from 'src/app/service/rest.service';
import { GarageBookListComponent } from '../garage-book-list/garage-book-list.component';
import { GarageDetailComponent } from '../garage-detail/garage-detail.component';

@Component({
  selector: 'app-garage-list',
  templateUrl: './garage-list.component.html',
  styleUrls: ['./garage-list.component.scss'],
})
export class GarageListComponent implements OnInit {
  component = GarageDetailComponent;
  garages!: any[];
  images!: any[];
  garageImage: { [key: string]: any } = {};
  allGarages: Garage[] = [];
  listFiltered: Garage[] = [];
  filters = {
    minPrice: new Subject<number>(),
    maxPrice: new Subject<number>(),
    name: new Subject<string>(),
    minLength: new Subject<number>(),
    maxLength: new Subject<number>(),
    city: new Subject<string>(),
    country: new Subject<string>(),
  };

  dataGarage$ = new Observable<Garage[]>();

  constructor(
    private restService: RestService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit(): void {
    this.resetFilters();
    this.retrieveAllGarages();
    this.retrieveImagesForGarages();

    this.dataGarage$ = combineLatest([
      this.filters.name,
      this.filters.minPrice,
      this.filters.maxPrice,
      this.filters.minLength,
      this.filters.maxLength,
      this.filters.city,
      this.filters.country,
    ]).pipe(
      switchMap(
        ([name, minPrice, maxPrice, minLength, maxLength, city, country]) => {
          return this.dataGarageFromFilters(
            name,
            minPrice,
            maxPrice,
            minLength,
            maxLength,
            city,
            country
          );
        }
      )
    );
  }

  async openBookListModal() {
    const modal = await this.modalCtrl.create({
      component: GarageBookListComponent,
    });
    return await modal.present();
  }

  retrieveAllGarages() {
    this.restService.getAllGarages().then((garages) => {
      this.allGarages = garages.filter((garage) => garage.is_active === true);
      this.listFiltered = this.allGarages;
    });
  }

  retrieveImagesForGarages() {
    this.allGarages.forEach((garage) => {
      this.restService
        .getImagesByGarageId(garage.id.toString())
        .then((images) => {
          this.garageImage[garage.id] = images[0];
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }

  private dataGarageFromFilters(
    name: string,
    minPrice: number,
    maxPrice: number,
    minLength: number,
    maxLength: number,
    city: string,
    country: string
  ): Observable<Garage[]> {
    return of(
      this.listFiltered.filter(
        (garage) =>
          (!name || garage.name.toLowerCase().includes(name.toLowerCase())) &&
          (!minPrice || Number(garage.price) >= Number(minPrice)) &&
          (!maxPrice || Number(garage.price) <= Number(maxPrice)) &&
          (!minLength || Number(garage.length) >= Number(minLength)) &&
          (!maxLength || Number(garage.length) <= Number(maxLength)) &&
          (!city ||
            garage.address.city.toLowerCase().includes(city.toLowerCase())) &&
          (!country ||
            garage.address.country
              .toLowerCase()
              .includes(country.toLowerCase()))
      )
    );
  }

  onNameUpdated(value: any) {
    this.filters.name.next(value);
  }

  onMinPriceUpdated(value: any) {
    const minPrice = parseFloat(value);
    if (minPrice < 0.0 || minPrice > 99999.99) {
      console.error('El valor debe estar entre 0.00 y 99999.99');
      return;
    }
    this.filters.minPrice.next(minPrice);
  }

  onMaxPriceUpdated(value: any) {
    const maxPrice = parseFloat(value);
    if (maxPrice < 0.0 || maxPrice > 99999.99) {
      console.error('El valor debe estar entre 0.00 y 99999.99');
      return;
    }
    this.filters.maxPrice.next(maxPrice);
  }

  onMinDimensionUpdated(value: any) {
    const minLength = parseFloat(value);
    if (!isNaN(minLength) && minLength >= 0) {
      this.filters.minLength.next(minLength);
    } else {
      console.error('Valor de longitud mínima no válido');
    }
  }

  onMaxDimensionUpdated(value: any) {
    const maxLength = parseFloat(value);
    if (!isNaN(maxLength) && maxLength >= 0) {
      this.filters.maxLength.next(maxLength);
    } else {
      console.error('Valor de longitud máxima no válido');
    }
  }

  onCityUpdated(value: any) {
    this.filters.city.next(value);
  }

  onCountryUpdated(value: any) {
    this.filters.country.next(value);
  }

  resetFilters() {
    this.filters.name.next('');
    this.filters.minPrice.next(0);
    this.filters.maxPrice.next(Number.MAX_SAFE_INTEGER);
    this.filters.minLength.next(0);
    this.filters.maxLength.next(Number.MAX_SAFE_INTEGER);
    this.filters.city.next('');
    this.filters.country.next('');
  }
}
