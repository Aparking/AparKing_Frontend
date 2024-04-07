import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { Garage } from 'src/app/models/garagement';
import { DataManagementService } from 'src/app/service/data-management.service';
import { RestService } from 'src/app/service/rest.service';

@Component({
  selector: 'app-garage-availability-list-create',
  templateUrl: './garage-availability-list-create.component.html',
})
export class GarageAvailabilityListCreateComponent implements OnInit {
  garageId!: string;
  currentGarage!: Garage;
  availabilityForm!: FormGroup;
  availabilities: any[] = [];
  constructor(
    private modalCtrl: ModalController,
    private dataManagement: DataManagementService,
    private restService: RestService,
    private toastController: ToastController,
    private navParams: NavParams
  ) {
    this.garageId = this.navParams.get('garageId');
    this.currentGarage = this.navParams.get('garage');
    this.availabilityForm = new FormGroup({
      start_date: new FormControl('', Validators.required),
      end_date: new FormControl('', Validators.required),
      status: new FormControl('AVAILABLE', Validators.required),
      garage: new FormControl(this.garageId, Validators.required),
    });
  }

  ngOnInit() {
    this.restService
      .getAvailabilitiesByGarageId(this.garageId)
      .then((availabilities) => {
        this.availabilities = availabilities;
      });
  }

  async cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
  async confirm() {
    if (this.availabilityForm.invalid) {
      return;
    }

    const availability = this.availabilityForm.value;
    this.restService
      .createAvailability(availability)
      .then((_) => {
        this.toastController
          .create({
            message: 'Disponibilidad creada con éxito.',
            duration: 2000,
          })
          .then((toast) => {
            toast.present();
          });
        this.modalCtrl.dismiss(null, 'confirm');
      })
      .catch((_) => {
        this.toastController
          .create({
            message: 'No se pudo crear la disponibilidad',
            duration: 2000,
          })
          .then((toast) => {
            toast.present();
          });
      });
  }
}
