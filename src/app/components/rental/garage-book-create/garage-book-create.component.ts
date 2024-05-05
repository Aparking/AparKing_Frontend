import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  AlertController,
  ModalController,
  NavParams,
  ToastController,
} from '@ionic/angular';
import { DataManagementService } from 'src/app/service/data-management.service';

import {
  BookingStatus,
  Garage,
  PaymentMethod,
} from 'src/app/models/garagement';
import { RestService } from 'src/app/service/rest.service';


@Component({
  selector: 'app-garage-book-create',
  templateUrl: './garage-book-create.component.html',
})
export class GarageBookCreateComponent implements OnInit {
  garageId!: string;
  currentGarage!: Garage;
  baseUrl = '/G11/aparKing/garages';
  bookForm!: FormGroup;
  payment_methods!: PaymentMethod[];
  availabilities!: any[];
  user: any;
  serverUrl = window.location.href;
  apiPath = '';
  path = this.serverUrl + this.apiPath;

  constructor(
    private modalCtrl: ModalController,
    private restService: RestService,
    private toastController: ToastController,
    private navParams: NavParams,
    private alertController: AlertController,
    private dataManagementService: DataManagementService
  ) {
    this.garageId = this.navParams.get('garageId');
    this.currentGarage = this.navParams.get('garage');
    this.payment_methods = Object.values(PaymentMethod);

    this.bookForm = new FormGroup({
      payment_method: new FormControl(PaymentMethod.CARD, Validators.required),
      status: new FormControl(BookingStatus.CONFIRMED, Validators.required),
      user: new FormControl(null, Validators.required),
      availability: new FormControl(1, Validators.required),
    });
  }

  ngOnInit(): void {
    this.restService
      .getAvailabilitiesByGarageId(this.garageId)
      .then((availabilities) => {
        this.availabilities = availabilities.filter((availability: any) => {
          return availability.status === 'AVAILABLE';
        });
        if (this.availabilities.length === 0) {
          this.cancel();
        }
      })
      .catch((_) => {
        this.showAlert('Este garaje no tiene reservas disponibles.');
        this.cancel();
      });
    this.restService
      .getUserData()
      .then((user) => {
        this.user = user;
      })
      .catch((_) => {
        this.showAlert('No se ha podido obtener la información del usuario');
        this.cancel();
      });
  }

  async showAlert(text: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: text,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async confirm() {
    const toast = await this.toastController.create({
      duration: 2000, // Duración del toast en milisegundos
      position: 'bottom', // Posición del toast (top, middle, bottom)
      color: 'dark', // Color del toast
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel',
        },
      ],
    });

    this.bookForm.patchValue({ user: this.user.id });
    if (this.bookForm.valid) {
      const translatedPaymentMethod = this.translatePaymentMethod(
        this.bookForm.value.paymentMethod
      );
      const translatedStatus = this.translateBookingStatus(
        this.bookForm.value.status
      );

      const bookingData = {
        ...this.bookForm.value,
        payment_method: translatedPaymentMethod,
        status: translatedStatus,
      };

      this.restService
        .createBooking(bookingData)
        .then((_) => {
          toast.message = 'Reserva creada correctamente';
          toast.present();
        })
        .catch((_) => {
          toast.message = 'Error al crear la reserva';
          toast.present();
        });

      return this.modalCtrl.dismiss(null, 'confirm');
    }
    return this.modalCtrl.dismiss(null, 'cancel');
  }


  async confirmBooking() {
    console.log(String(this.bookForm.value.paymentMethod)); // Añade esta línea
    const toast = await this.toastController.create({
      duration: 2000, // Duración del toast en milisegundos
      position: 'bottom', // Posición del toast (top, middle, bottom)
      color: 'dark', // Color del toast
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel',
        },
      ],
    });

    this.bookForm.patchValue({ user: this.user.id });
    if (this.bookForm.valid) {
      console.log(this.bookForm.value);
      console.log(this.bookForm.value.payment_method); // Añade esta línea

      //console.log(this.bookForm.value.get('payment_method')); // Añade esta línea


      const translatedPaymentMethod = this.translatePaymentMethod(
        this.bookForm.value.paymentMethod
      );
      const translatedStatus = this.translateBookingStatus(
        this.bookForm.value.status
      );

      const bookingData = {
        ...this.bookForm.value,
        payment_method: translatedPaymentMethod,
        status: translatedStatus,
        url: this.path
      };

      if (this.bookForm.value.payment_method === 'CARD') {
        try {
          const session = await this.dataManagementService.createCheckoutSessionRental(bookingData);
          window.location.href = session.url;
          const toast = await this.toastController.create({
            message: 'Reserva creada correctamente',
            duration: 2000
          });
          toast.present();
        } catch (error) {
          const toast = await this.toastController.create({
            message: 'Error al crear la reserva',
            duration: 2000
          });
          toast.present();
          //this.restService
          //.createBooking(bookingData)
          //.then((_) => {
          //  toast.message = 'Reserva creada correctamente';
          //  toast.present();
          //})
          //.catch((_) => {
          //  toast.message = 'Error al crear la reserva';
          //  toast.present();
          //});
        }
      } else {
        this.restService
          .createBooking(bookingData)
          .then((_) => {
            toast.message = 'Reserva creada correctamente';
            toast.present();
          })
          .catch((_) => {
            toast.message = 'Error al crear la reserva';
            toast.present();
          });
      }

      return this.modalCtrl.dismiss(null, 'confirm');
    }
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  translatePaymentMethod(paymentMethod: string): string {
    console.log(paymentMethod); // Añade esta línea
    switch (paymentMethod) {
      case 'CASH':
        return 'CASH';
      case 'CARD':
        return 'CARD';
      default:
        return 'CARD';
    }
  }

  translateBookingStatus(status: string): string {
    switch (status) {
      case 'Pendiente':
        return 'PENDING';
      case 'Confirmada':
        return 'CONFIRMED';
      case 'Cancelada':
        return 'CANCELLED';
      default:
        return 'CONFIRMED';
    }
  }
}
