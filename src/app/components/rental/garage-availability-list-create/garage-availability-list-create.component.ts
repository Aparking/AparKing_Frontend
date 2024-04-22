import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  AlertController,
  ModalController,
  NavParams,
  ToastController,
} from '@ionic/angular';
import { Garage } from 'src/app/models/garagement';
import { RestService } from 'src/app/service/rest.service';

@Component({
  selector: 'app-garage-availability-list-create',
  templateUrl: './garage-availability-list-create.component.html',
})
export class GarageAvailabilityListCreateComponent implements OnInit {
  garageId!: string;
  currentGarage!: Garage;
  showAvailabilityForm = false;
  availabilityForm!: FormGroup;
  availabilities: any[] = [];
  user: any;
  constructor(
    private modalCtrl: ModalController,
    private restService: RestService,
    private toastController: ToastController,
    private navParams: NavParams,
    private alertController: AlertController
  ) {
    this.garageId = this.navParams.get('garageId');
    this.currentGarage = this.navParams.get('garage');
    this.availabilityForm = new FormGroup(
      {
        start_date: new FormControl('', [
          Validators.required,
          this.validateDate,
        ]),
        end_date: new FormControl('', [Validators.required, this.validateDate]),
        status: new FormControl('AVAILABLE', Validators.required),
        garage: new FormControl(this.garageId, Validators.required),
      },
      {
        validators: this.validateDates,
      }
    );
  }

  ngOnInit() {
    this.restService
      .getUserData()
      .then((user) => {
        this.user = user;
      })
      .catch((error) => {
        console.log(error);
        this.cancel();
      });
    this.loadAvailabilities();
  }

  async loadAvailabilities() {
    this.restService
      .getAvailabilitiesByGarageId(this.garageId)
      .then((availabilities) => {
        this.availabilities = availabilities;
      })
      .catch((error) => {
        console.log(error);
        this.cancel();
      });
  }

  async cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async showAvailabilityFormModal() {
    this.showAvailabilityForm = true;
  }

  validateDate: ValidatorFn = (control: AbstractControl) => {
    const formDate = new Date(control.value);
    const today = new Date();
    if (formDate < today) {
      return { invalidDate: true };
    }
    return null;
  };
  validateDates: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const start_date = new Date(control.get('start_date')?.value);
    const end_date = new Date(control.get('end_date')?.value);
    return start_date < end_date ? null : { invalidDates: true };
  };

  async confirm() {
    if (this.availabilityForm.invalid) {
      return;
    }

    if (this.user.id !== this.currentGarage.owner) {
      this.toastController
        .create({
          message:
            'No puedes crear disponibilidades en un garaje que no es tuyo.',
          duration: 2000,
        })
        .then((toast) => {
          toast.present();
        });
      this.cancel();
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
        this.showAvailabilityForm = false;
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

  async alertCancelAvailability(availabilityId: string) {
    const alert = await this.alertController.create({
      header: 'Cancelar disponibilidad',
      message: '¿Estás seguro de que quieres cancelar la disponibilidad?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.cancelAvailability(availabilityId);
          },
        },
      ],
    });

    await alert.present();
  }
  async cancelAvailability(availabilityId: string) {
    const toast = await this.toastController.create({
      duration: 2000,
      position: 'bottom',
      color: 'dark',
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel',
        },
      ],
    });
    this.restService
      .deleteAvailability(availabilityId)
      .then(() => {
        toast.message = 'Disponibilidad cancelada correctamente.';
        toast.present();
        this.loadAvailabilities();
      })
      .catch(() => {
        toast.message =
          'No se pudo cancelar la disponibilidad. Intentelo más tarde.';
        toast.present();
      });
  }
}
