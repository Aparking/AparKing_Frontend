import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import {
  ParkingCreate,
  ParkingSize,
  ParkingType,
} from 'src/app/models/parking';
import { DataManagementService } from 'src/app/service/data-management.service';
import { LocationService } from 'src/app/service/location.service';

@Component({
  selector: 'app-create-parking-modal',
  templateUrl: './create-parking-modal.component.html',
  styleUrls: ['./create-parking-modal.component.scss'],
})
export class CreateParkingModalComponent implements OnInit {
  parkingCreateResponse: ParkingCreate | undefined;

  parkingForm: FormGroup | undefined;

  constructor(
    private dataManagement: DataManagementService,
    private locationService: LocationService,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private router: Router
  ) {
    this.parkingForm = this.formBuilder.group({
      size: ['', Validators.required],
      parking_type: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.dataManagement.getCreateParking().then((data: ParkingCreate) => {
      this.parkingCreateResponse = data;
    });
  }

   convertToColorEnum(str: string): ParkingSize | undefined {
    const colorValue = ParkingSize[str as keyof typeof ParkingSize];
    return colorValue;
  }

  async onSubmit() {
    if (this.parkingForm) {
      const loading = await this.loadingCtrl.create({
        message: 'Creando plaza...',
      });
      loading.present();
      this.locationService.getLocation().then((location) => {
        if (
          this.parkingForm &&
          typeof this.parkingForm.value.size === 'string' &&
          typeof this.parkingForm.value.parking_type === 'string'
        ) {
          const sizeString: string = this.parkingForm.value.size;
          const sizeEnum: string = (Object.keys(ParkingSize) as (keyof typeof ParkingSize)[]).filter(key => ParkingSize[key] === sizeString)[0];
          const typeString: string = this.parkingForm.value.parking_type;
          const typeEnum: string = (Object.keys(ParkingType) as (keyof typeof ParkingType)[]).filter(key => ParkingType[key] === typeString)[0];
          if (location) {
            this.dataManagement
              .postCreateParking({
                location: {
                  type: 'Point',
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                  coordinates: [42.3851, 2.1734],
                },
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                size: sizeEnum,
                parking_type: typeEnum,
                is_assignment: false,
                isTransfer: false,
              })
              .then((_) => {
                loading.dismiss();
                window.location.reload();
              });
          }
        }
      });
    }
  }
}
