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
  totalPrice = 0;
  minStartDate: any;
  maxEndDate: any;

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
      start_date: new FormControl(Date(), Validators.required),
      end_date: new FormControl(Date(), Validators.required)
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

  async confirmBooking() {
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

    this.bookForm.patchValue({ user: this.user.id });
    if (this.bookForm.valid) {
      const selectedAvailability = this.bookForm.value.availability; // Obtener la disponibilidad seleccionada
      const selectedAvailabilityIndex = this.availabilities.findIndex(avail => avail.id === selectedAvailability); // Obtener el índice de la disponibilidad seleccionada
      if (selectedAvailabilityIndex !== -1) {
        console.log(this.bookForm.value.start_date, this.bookForm.value.end_date);
        const totalPrice = this.calculateTotalPrice(selectedAvailabilityIndex, this.bookForm.value.start_date, this.bookForm.value.end_date); // Calcular el precio total
        const translatedPaymentMethod = this.translatePaymentMethod(this.bookForm.value.payment_method);
        const translatedStatus = this.translateBookingStatus(this.bookForm.value.status);
        const bookingData = {
          ...this.bookForm.value,
          payment_method: translatedPaymentMethod,
          status: translatedStatus,
          total_price: totalPrice, // Agregar el precio total al objeto de reserva
          url: this.path,
          start_date: this.bookForm.value.start_date,
          end_date: this.bookForm.value.end_date
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
      } else {
        this.showAlert('La disponibilidad seleccionada no es válida.');
      }
    }
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  translatePaymentMethod(paymentMethod: string): string {
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

  calculateBookingDuration(availability: any, start_date: any, end_date: any): any {
    const start = new Date(start_date);
    const end = new Date(end_date);
    this.maxEndDate = new Date(availability.end_date);
    this.minStartDate = new Date(availability.start_date);
    console.log(this.maxEndDate, this.minStartDate);
    console.log(start < this.minStartDate || end > this.maxEndDate);
    if (start.getTime() >= end.getTime()) {
      this.showAlert('Start date must be before end date');
      return this.modalCtrl.dismiss(null, 'cancel');
    }

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      this.showAlert('Invalid start or end date');
      return this.modalCtrl.dismiss(null, 'cancel');
    }

    if (start.getTime() < this.minStartDate.getTime() || end.getTime() > this.maxEndDate.getTime()) {
      this.showAlert('Las fechas elegidas no están dentro de la disponibilidad del garaje.');
      return this.modalCtrl.dismiss(null, 'cancel');
    } else {
      return Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    }
  }
  calculateTotalPrice(selectedAvailabilityIndex: number, start_date: any, end_date: any): number {
    const selectedAvailability = this.availabilities[selectedAvailabilityIndex];

    if (!selectedAvailability) {
      console.log('No availability selected.');
      return 0;  // Retorna 0 o algún otro valor predeterminado
    }

    const duration = this.calculateBookingDuration(selectedAvailability, start_date, end_date);
    const pricePerDay = this.currentGarage.price || 0;  // Si this.currentGarage.price es undefined o null, usa 0
    this.totalPrice = duration * pricePerDay;
    console.log('Selected availability:', selectedAvailability);
    console.log('Duration:', duration);
    console.log('Total price:', this.totalPrice);
    return this.totalPrice;
  }
}
