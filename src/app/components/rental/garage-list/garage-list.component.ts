import { Component, OnInit } from '@angular/core';
import { Garage, Image } from 'src/app/models/garagement';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-garage-list',
  templateUrl: './garage-list.component.html',
  styleUrls: ['./garage-list.component.scss'],
})
export class GarageListComponent implements OnInit {
  garages!: any[];
  address!: any[];
  images!: any[];
  garage: Garage[] = [];
  image: Image[] = [];

  constructor(private restService: RestService) {}

  ngOnInit(): void {
    this.retrieveAllGarages();
    this.getAllImages();
  }

  retrieveAllGarages() {
    this.restService.getAllGarages().then((garages) => {
      this.garages = garages;
      console.log(this.garages);
    });
  }

  getImage(garage: Garage): Image | undefined {
    return this.images.find((image) => image.garageId === garage.id);
  }

  getAllImages() {
    this.restService.getAllImages().then((images) => {
      this.images = images;
      console.log(this.images);
    });
  }
}
