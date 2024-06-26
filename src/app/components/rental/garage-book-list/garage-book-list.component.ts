import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { RestService } from 'src/app/service/rest.service';

@Component({
  selector: 'app-garage-book-list',
  templateUrl: './garage-book-list.component.html',
})
export class GarageBookListComponent implements OnInit {
  myBookings: any = [];
  totalPrice: number = 0;

  constructor(
    private modalCtrl: ModalController,
    private restService: RestService,
    private toastController: ToastController,
    private alertController: AlertController
  ) { }

  ngOnInit(): void {
    this.loadBookings();
  }

  async loadBookings() {
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

    this.restService
      .getBookings()
      .then(async (bookings) => {
        this.myBookings = bookings;
        const promises = [];
        for (const booking of this.myBookings) {
          const availabilityPromise = this.restService
            .getAvailabilityById(booking.availability)
            .then((availability) => {
              booking.availability = availability;
              return this.restService.getGarageById(availability.garage);
            })
            .then((garage) => {
              booking.garage = garage;
            })
            .catch((_) => {
              toast.message =
                'No se pudieron cargar los datos. Intente más tarde.';
              toast.present();
              this.closeModal();
            });
          promises.push(availabilityPromise);
        }
        try {
          await Promise.all(promises);
          this.calculateTotalPrice();
        } catch (error) {
          toast.message = 'No se pudieron cargar los datos. Intente más tarde.';
          toast.present();
          this.closeModal();
        }
      })
      .catch((err) => {
        if (err.status === 404) {
          this.myBookings = [];
        } else {
          toast.message = 'No se pudieron cargar los datos. Intente más tarde.';
          toast.present();
          this.closeModal();
        }
      });

  }

  async closeModal() {
    await this.modalCtrl.dismiss(null, 'back');
  }

  async alertCancelBooking(bookingId: string) {
    const alert = await this.alertController.create({
      header: 'Cancelar reserva',
      message: '¿Estás seguro de que quieres cancelar la reserva?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.cancelBooking(bookingId);
          },
        },
      ],
    });

    await alert.present();
  }

  async cancelBooking(bookingId: string) {
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

    const currentBooking = this.myBookings.find(
      (booking: any) => booking.id === bookingId
    );
    currentBooking.availability.status = 'AVAILABLE';
    this.restService
      .updateAvailability(currentBooking.availability)
      .catch((error) => {
        console.error(error);
      });

    this.restService
      .deleteBooking(bookingId)
      .then(() => {
        toast.message = 'Reserva cancelada correctamente.';
        toast.present();
        this.loadBookings();
      })
      .catch(() => {
        toast.message = 'No se pudo cancelar la reserva. Intente más tarde.';
        toast.present();
      });
  }

  calculateTotalPrice() {
    this.totalPrice = this.myBookings.reduce((total: number, booking: any) => {
      const price = Number(booking.garage.price);
      return total + (isNaN(price) ? 0 : price);
    }, 0);
  }
}