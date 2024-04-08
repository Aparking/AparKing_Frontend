import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams, ToastController } from '@ionic/angular';

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

  constructor(
    private modalCtrl: ModalController,
    private restService: RestService,
    private toastController: ToastController,
    private navParams: NavParams
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
        this.cancel();
      });
    this.restService
      .getUserData()
      .then((user) => {
        this.user = user;
      })
      .catch((_) => {
        console.error('Error al obtener los datos del usuario');
        this.cancel();
      });
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

  translatePaymentMethod(paymentMethod: string): string {
    switch (paymentMethod) {
      case 'Efectivo':
        return 'CASH';
      case 'Tarjeta':
        return 'CARD';
      default:
        return 'CASH';
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
