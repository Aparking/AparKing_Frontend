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
        } else {
          // Agregar un observador al campo de disponibilidad
          this.bookForm.get('availability')!.valueChanges.subscribe(selectedAvailability => {
            const selectedAvailabilityIndex = this.availabilities.findIndex(avail => avail.id === selectedAvailability);
            if (selectedAvailabilityIndex !== -1) {
              this.calculateTotalPrice(selectedAvailabilityIndex);
            }
          });
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
        const totalPrice = this.calculateTotalPrice(selectedAvailabilityIndex); // Calcular el precio total
        const translatedPaymentMethod = this.translatePaymentMethod(this.bookForm.value.paymentMethod);
        const translatedStatus = this.translateBookingStatus(this.bookForm.value.status);
        const bookingData = {
          ...this.bookForm.value,
          payment_method: translatedPaymentMethod,
          status: translatedStatus,
          total_price: totalPrice, // Agregar el precio total al objeto de reserva
          url: this.path,
        };

        // Resto del código para crear la reserva...

      } else {
        this.showAlert('La disponibilidad seleccionada no es válida.');
      }
    }
  }

  async confirmBooking() {
    console.log(String(this.bookForm.value.paymentMethod)); // Añade esta línea
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
        const totalPrice = this.calculateTotalPrice(selectedAvailabilityIndex); // Calcular el precio total
        const translatedPaymentMethod = this.translatePaymentMethod(this.bookForm.value.payment_method);
        const translatedStatus = this.translateBookingStatus(this.bookForm.value.status);
        const bookingData = {
          ...this.bookForm.value,
          payment_method: translatedPaymentMethod,
          status: translatedStatus,
          total_price: totalPrice, // Agregar el precio total al objeto de reserva
          url: this.path,
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

  calculateBookingDuration(availability: any): number {
    const start = new Date(availability.start_date);
    const end = new Date(availability.end_date);
    console.log('Start date:', start);
    console.log('End date:', end);
    console.log('AAAA', availability);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      console.error('Invalid start or end date:', availability.start, availability.end);
      return 0;  // Retorna 0 o algún otro valor predeterminado
    }

    return Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  }
  calculateTotalPrice(selectedAvailabilityIndex: number): number {
    const selectedAvailability = this.availabilities[selectedAvailabilityIndex];

    if (!selectedAvailability) {
      console.log('No availability selected.');
      return 1;  // Retorna 0 o algún otro valor predeterminado
    }

    const duration = this.calculateBookingDuration(selectedAvailability);
    const pricePerDay = this.currentGarage.price || 2;  // Si this.currentGarage.price es undefined o null, usa 0
    this.totalPrice = duration * pricePerDay;
    console.log('Selected availability:', selectedAvailability);
    console.log('Duration:', duration);
    console.log('Total price:', this.totalPrice);
    return this.totalPrice;
  }
}
