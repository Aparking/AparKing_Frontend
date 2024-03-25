import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  LoadingController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { Constants } from 'src/app/constants.ts';
import { DataManagementService } from 'src/app/service/data-management.service';
import { UtilsProviderService } from './../../service/utils-provider.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  constants: Constants = new Constants();
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dataManagement: DataManagementService,
    private toastController: ToastController,
    private navCtr: NavController,
    private loadingCtrl: LoadingController,
    private utilProvider: UtilsProviderService
  ) {
    this.registerForm = new FormGroup(
      {
        username: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
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
        genre: new FormControl('', Validators.required),
      },
      {
        validators: this.confirmPasswordValidator,
      }
    );
  }

  ngOnInit() {
    console.log('register');
  }

  async registerSubmit() {
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
    this.registerForm.value.phone = `+${this.registerForm.value.countryCode}${this.registerForm.value.phone}`;
    this.dataManagement
      .postRegister(this.registerForm.value)
      .then(async (_) => {
        toast.message = `Bienvenido a AparKing`;
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

  confirmPasswordValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    return control.value.password === control.value.confirmPassword
      ? null
      : { mismatch: true };
  };

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
}
