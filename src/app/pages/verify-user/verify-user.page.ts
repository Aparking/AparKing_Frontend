import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  LoadingController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { DataManagementService } from 'src/app/service/data-management.service';
import { constants } from './../../constants.ts';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.page.html',
  styleUrls: ['./verify-user.page.scss'],
})
export class VerifyUserPage {
  constants = constants;
  isDarkMode: boolean = false;
  form: FormGroup;

  constructor(
    private dataManagement: DataManagementService,
    private navCtr: NavController,
    private loadingCtrl: LoadingController,
    private toastController: ToastController
  ) {
    this.checkDarkMode();
    this.form = new FormGroup({
      code: new FormControl('', [Validators.required, Validators.minLength(9)]),
    });
  }

  async goBack() {
    const loading = await this.loadingCtrl.create({});
    loading.present();
    this.dataManagement
      .postDeleteAccount()
      .then((_) => {
        this.navCtr.navigateRoot('register');
        loading.dismiss();
      })
      .catch(async (err) => {
        console.log(err);
        const toast = await this.toastController.create({
          message: 'No se pudo eliminar tu cuenta.',
          duration: 2000,
          color: 'dark',
          buttons: [
            {
              text: 'Cerrar',
              role: 'cancel',
            },
          ],
        });
        toast.present();
        loading.dismiss();
      });
  }

  checkDarkMode() {
    this.isDarkMode =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  async formSubmit() {
    const loading = await this.loadingCtrl.create({});
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
    this.dataManagement
      .postVerifyEmail(this.form.value.code)
      .then(async (_) => {
        toast.message = `Enhorabuena, tu cuenta ha sido verificada.`;
        await toast.present();
        this.navCtr.navigateRoot('/G11');
        loading.dismiss();
      })
      .catch(async (err) => {
        toast.message = `Error con los datos introducidos, vuelva a intentarlo.`;
        await toast.present();
        loading.dismiss();
      });
  }
}
