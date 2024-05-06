import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { User } from 'src/app/models/authentication';
import { PersistenceService } from 'src/app/service/persistence.service';
import { RestService } from 'src/app/service/rest.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user!: any;
  userForm: FormGroup;

  constructor(
    private restService: RestService,
    private alertCtrl: AlertController,
    private toastController: ToastController,
    private loadingCtrl: LoadingController,
    private persistenceService: PersistenceService,
    private router: Router,
    private navCtrl: NavController,
  ) {
    this.userForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      dni: new FormControl('', [Validators.required, this.validateDNI]),
      birth_date: new FormControl('', [
        Validators.required,
        this.minimumAgeValidator(18),
      ]),
      countryCode: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      phone: new FormControl('', [
        Validators.required,
        this.phoneNumberValidator(),
      ]),
      IBAN: new FormControl('', [Validators.required, this.validateIBAN]),
    });
  }

  async ngOnInit(): Promise<void> {
    await this.restService
      .getUserData()
      .then((data: User) => {
        this.user = data;
      })
      .catch((_) => {
        this.showAlert('Error al cargar los datos del usuario');
      });

    this.userForm.patchValue({
      username: this.user.username,
      email: this.user.email,
      dni: this.user.dni,
      birth_date: this.user.birth_date,
      countryCode: this.user.phone.substring(1, 3),
      phone: this.user.phone.substring(3),
      IBAN: this.user.iban,
    });
  }

  async showAlert(text: string) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: text,
      buttons: ['OK'],
    });
    await alert.present();
  }

  validateDNI(control: AbstractControl): { [key: string]: any } | null {
    const dni = control.value;
    const pattern = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;

    if (!pattern.test(dni)) {
      return { dniInvalid: true };
    }

    const letra = dni.charAt(dni.length - 1).toUpperCase();
    const numero = parseInt(dni, 10) % 23;
    const letrasValidas = 'TRWAGMYFPDXBNJZSQVHLCKE';

    if (letra !== letrasValidas.charAt(numero)) {
      return { dniInvalid: true };
    }

    return null;
  }

  validateIBAN(): ValidatorFn {
    console.log('validateIBAN');
    return (control: AbstractControl): { [key: string]: any } | null => {
      const ibanPattern = /^[A-Z]{2}[0-9]{2}( [A-Z0-9]{4}){4}[0-9]{2}$/;
      const isValid = ibanPattern.test(control.value);
      return isValid ? null : { ibanInvalid: true };
    };
  }

  private minimumAgeValidator(minimumAge: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (Validators.required(control)) {
        return null; // Si el campo es requerido, la validación es aprobada
      }

      const birthDate = new Date(control.value);
      const today = new Date();
      const minDate = new Date(
        today.getFullYear() - minimumAge,
        today.getMonth(),
        today.getDate()
      );

      return birthDate <= minDate ? null : { minimumAge: true };
    };
  }

  private phoneNumberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const phoneNumberPattern = /^\d{9}$/; // Expresión regular para 10 dígitos numéricos
      const isValid = phoneNumberPattern.test(control.value);
      return isValid ? null : { phoneNumber: true };
    };
  }

  async saveChanges() {
    console.log(this.userForm.value);
    console.log(this.userForm.value.iban);
    const loading = await this.loadingCtrl.create({
      message: 'Actualizando perfil',
    });
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
    loading.present();
    this.userForm.value.phone = `+${this.userForm.value.countryCode}${this.userForm.value.phone}`;
    this.restService
      .updateUser(this.userForm.value)
      .then(async (_) => {
        toast.message = `Información del perfil actualizada correctamente`;
        await toast.present();
        loading.dismiss();
      })
      .catch(async (err) => {
        let serverErr = err.error;
        let message = '';
        console.log(this.userForm.value);
        for (let key in serverErr) {
          message += (serverErr[key] as string[]).join(', ');
        }
        toast.message = message;
        await toast.present();
        loading.dismiss();
      });
  }

  async deleteProfile() {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar perfil',
      message: '¿Estás seguro de que deseas eliminar tu perfil?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: async () => {
            const loading = await this.loadingCtrl.create({
              message: 'Eliminando perfil',
            });
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

            const userToken = this.persistenceService.getToken();
            this.persistenceService.resetValues();
            if (!userToken) {
              toast.message = `Error al eliminar el perfil`;
              await toast.present();
              loading.dismiss();
              return;
            } else {
              loading.present();
              this.restService
                .postDeleteAccount(userToken.token)
                .then(async (_) => {
                  toast.message = `Perfil eliminado correctamente`;
                  await toast.present();
                  loading.dismiss();
                  this.router.navigate(['']);
                })
                .catch(async (_) => {
                  toast.message = `Error al eliminar el perfil`;
                  await toast.present();
                  loading.dismiss();
                });
            }
          },
        },
      ],
    });
    await alert.present();
  }

  async goRegisterVehicle() {
    this.navCtrl.navigateForward('/G11/aparKing/tab3/registerVehicle');
  }
}
