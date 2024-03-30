import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { RestService } from 'src/app/service/rest.service';

@Component({
  selector: 'app-garage-book-list',
  templateUrl: './garage-book-list.component.html',
})
export class GarageBookListComponent implements OnInit {
  myBookings: any = [];

  constructor(
    private modalCtrl: ModalController,
    private restService: RestService,
    public toastController: ToastController
  ) {}

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
      .then((bookings) => {
        this.myBookings = bookings;
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

    for (const booking of this.myBookings) {
      this.restService
        .getAvailabilityById(booking.availability)
        .then((availability) => {
          booking.availability = availability;
          this.restService
            .getGarageById(availability.garage_id)
            .then((garage) => {
              booking.garage = garage;
            })
            .catch((_) => {
              toast.message =
                'No se pudieron cargar los datos. Intente más tarde.';
              toast.present();
              this.closeModal();
            });
        })
        .catch(() => {
          toast.message = 'No se pudieron cargar los datos. Intente más tarde.';
          toast.present();
          this.closeModal();
        });
    }
  }

  async closeModal() {
    await this.modalCtrl.dismiss(null, 'back');
  }

  async cancelBooking(booking: any) {
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
      .deleteBooking(booking.id)
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
}
