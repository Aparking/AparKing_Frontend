import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Garage, Image } from 'src/app/models/garagement';
import { RestService } from 'src/app/service/rest.service';
import { GarageBookListComponent } from '../garage-book-list/garage-book-list.component';
import { GarageDetailComponent } from '../garage-detail/garage-detail.component';
import { BehaviorSubject, Observable, Subject, combineLatest, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-garage-list',
  templateUrl: './garage-list.component.html',
  styleUrls: ['./garage-list.component.scss'],
})
export class GarageListComponent implements OnInit {
  component = GarageDetailComponent;

  garages!: any[];
  images!: any[];
  image: Image[] = [];

  allGarages: Garage[]=[];
  listFiltered: Garage[]=[];
  filters = {
    minPrice: new Subject<number>(),
    maxPrice: new Subject<number>(),
    startDate: new Subject<Date>(),
    endDate: new Subject<Date>(),
    name: new Subject<string>(),
    minDimension: new Subject<number>(),
    maxDimension: new Subject<number>(),
    city: new Subject<string>(),
    country: new Subject<string>(),
  };
  
  dataGarage$ = new Observable<Garage[]>();

  constructor(
    private restService: RestService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit(): void {
    this.retrieveAllGarages();
    this.listFiltered = this.allGarages;

    this.dataGarage$ = combineLatest([
      this.filters.name, this.filters.minPrice, this.filters.maxPrice, this.filters.startDate, this.filters.endDate, 
      this.filters.minDimension, this.filters.maxDimension, this.filters.city, this.filters.country, this.listFiltered
    ])
    .pipe(
      map(([name, minPrice, maxPrice, startDate, endDate, 
        minDimension, maxDimension, city, country, listFiltered]) => {
        return listFiltered.filter(garage =>
            (!name || garage.name.toLowerCase().includes(name.toLowerCase())) &&
            (!minPrice || garage.price >= minPrice) &&
            (!maxPrice || garage.price <= maxPrice) &&
            (!startDate || new Date(garage.availability.startDate) >= startDate) &&
            (!endDate || new Date(garage.availability.endDate) <= endDate) &&
            (!minDimension || (garage.height * garage.length * garage.width) >= minDimension) &&
            (!maxDimension || (garage.height * garage.length * garage.width) <= maxDimension) &&
            (!city || garage.address.city.toLowerCase() === city.toLowerCase()) &&
            (!country || garage.address.country.toLowerCase() === country.toLowerCase())
        );
      })
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
      this.allGarages = garages.filter(garage => garage.is_active === true);
    });
  }

  getImage(garage: Garage): Image | undefined {
    return this.images.find((image) => image.garageId === garage.id);
  }

  onNameUpdated(value: any) {
    this.filters.name.next(value);
  }

  onMinPriceUpdated(value: any) {
    if (typeof value === 'number' && !isNaN(value)) {
      this.filters.minPrice.next(value);
    }
  }

  onMaxPriceUpdated(value: any) {
    if (typeof value === 'number' && !isNaN(value)) {
      this.filters.maxPrice.next(value);
    }
  }
  
  onStartDateUpdated(value: any) {
    const selectedDate = new Date(value);
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    if (selectedDate instanceof Date) {
        if (selectedDate >= oneWeekAgo) {
            this.filters.startDate.next(selectedDate);
        } else {
            console.error('La fecha inicial no puede ser previa a una semana antes del día actual');
        }
    } else {
        console.error('Formato de fecha inválido: DD/MM/YYYY');
    }
    
  }
  
  onEndDateUpdated(value: any) {
    const selectedDate = new Date(value);
    const maxDate = new Date(2199, 11, 31); 
    if (selectedDate instanceof Date) {
        if (selectedDate <= maxDate) {
            this.filters.endDate.next(selectedDate);
        } else {
            console.error('La fecha final es demasiado lejana en el futuro');
        }
    } else {
        console.error('Formato de fecha inválido: DD/MM/YYYY');
    }
  }
  
  onMinDimensionUpdated(value: any) {
    if (typeof value === 'number' && !isNaN(value)) {
      this.filters.minDimension.next(value);
    }  
  }
  
  onMaxDimensionUpdated(value: any) {
    if (typeof value === 'number' && !isNaN(value)) {
      this.filters.maxDimension.next(value);
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
    this.filters.startDate.next(new Date(2024, 4, 6));
    this.filters.endDate.next(new Date(2199, 12, 31));
    this.filters.minDimension.next(0);
    this.filters.maxDimension.next(Number.MAX_SAFE_INTEGER);
    this.filters.city.next('');
    this.filters.country.next('');
  }

}
