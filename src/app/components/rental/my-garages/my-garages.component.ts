import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Garage } from 'src/app/models/garagement';
import { RestService } from 'src/app/service/rest.service';

@Component({
  selector: 'app-my-garages',
  templateUrl: './my-garages.component.html',
  styleUrls: ['./my-garages.component.scss'],
})
export class MyGaragesComponent implements OnInit {
  garages!: any[];
  garage: Garage[] = [];

  constructor(private restService: RestService, private modalController: ModalController) { }



  ngOnInit(): void {
    this.getMyGarages();
  }

  getMyGarages() {
    this.restService.getMyGarages().then((garages) => {
      this.garages = garages;
      console.log(this.garages);
    });
  }

  async closePopup() {
    await this.modalController.dismiss();
  }
}
