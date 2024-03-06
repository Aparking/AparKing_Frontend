import { Component, OnInit } from '@angular/core';
import { RestService } from "src/app/services/rest.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { ActionSheetController } from '@ionic/angular';


@Component({
  selector: 'app-garage-list',
  templateUrl: './garage-list.component.html',
  styleUrls: ['./garage-list.component.scss'],
})

export class GarageListComponent implements OnInit {

  garages!: any[];
  address!: any[];

  constructor(
    private restService: RestService,
    private route: ActivatedRoute,
    private actionSheetController: ActionSheetController
    ) {}

  addressId: string = '';

  ngOnInit(): void {
    this.retrieveAllGarages();
  }

  retrieveAllGarages() {
    this.restService.getAllGarages().then((garages) => {
        this.garages = garages;
        console.log(this.garages);
    });
  }




}
