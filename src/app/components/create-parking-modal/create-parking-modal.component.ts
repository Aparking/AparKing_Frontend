import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  LoadingController,
  ModalController,
  ToastController,
} from '@ionic/angular';
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
    private modalCtrl: ModalController,
    private toastController: ToastController,
    private router: Router
  ) {
    this.parkingForm = this.formBuilder.group({
      size: ['', Validators.required],
      parking_type: ['', Validators.required],
      appointmentDateTime: [
        { value: new Date().toISOString(), disabled: false },
        Validators.required,
      ],
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
          const sizeEnum: string = (
            Object.keys(ParkingSize) as (keyof typeof ParkingSize)[]
          ).filter((key) => ParkingSize[key] === sizeString)[0];
          const typeString: string = this.parkingForm.value.parking_type;
          const typeEnum: string = (
            Object.keys(ParkingType) as (keyof typeof ParkingType)[]
          ).filter((key) => ParkingType[key] === typeString)[0];
          if (location) {
            const postData = {
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
              appointmentDateTime: this.parkingForm.value.appointmentDateTime,
            };

            // Añadir el campo de fecha y hora de la cesión si es necesario

            this.dataManagement
              .postCreateParking(postData)
              .then((_) => {
                loading.dismiss();
                this.modalCtrl.dismiss();
              })
              .catch(async (error) => {
                if (error.status === 400 && error.error.error['location']) {
                  loading.dismiss();
                  const toast = await this.toastController.create({
                    message: 'Ya existe una plaza creada demasiado cerca',
                    duration: 2000,
                  });
                  this.modalCtrl.dismiss();
                  toast.present();
                }
              });
          }
        }
      });
    }
  }
}
