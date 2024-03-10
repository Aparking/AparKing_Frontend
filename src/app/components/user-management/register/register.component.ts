/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { BackendUser } from '../../../models/user.models';
import { RegisterService } from '../../../service/register.service';
import { format, parseISO } from 'date-fns'; // npm install date-fns@2.16.1

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  registerData: BackendUser = {
    username: '',
    password: '',
    email: '',
    dni: '',
    birth_date: null,
    gender: '',
    phone: '',
    photo: ''
  };
  submitted = false;
  errorEmail: string = '';
  errorPass: string = '';
  errorUsername: string = '';
  errorDNI: string = '';
  errorBirthDate: string = '';
  errorGender: string = '';
  errorPhone: string = '';
  errorPhoto: string = '';

  constructor(private registerService: RegisterService) { }

  ngOnInit(): void {
  }

  saveRegister(): void {
    console.log(this.registerData.birth_date);
    const data: BackendUser = {
      username: this.registerData.username,
      password: this.registerData.password,
      email: this.registerData.email,
      dni: this.registerData.dni,
      birth_date: format(parseISO(this.registerData.birth_date), 'yyyy-MM-dd'),
      gender: this.registerData.gender,
      phone: this.registerData.phone,
      photo: this.registerData.photo
    };

    this.registerService.registerUser(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => {
          this.errorEmail = e.error.email;
          this.errorPass = e.error.password;
          this.errorUsername = e.error.username;
          this.errorDNI = e.error.dni;
          this.errorBirthDate = e.error.birth_date;
          this.errorGender = e.error.gender;
          this.errorPhone = e.error.phone;
          this.errorPhoto = e.error.photo;
          console.error(e);
        }
      });
  }

  newRegister(): void {
    this.submitted = false;
    this.registerData = {
      username: '',
      password: '',
      email: '',
      dni: '',
      birth_date: null,
      gender: '',
      phone: '',
      photo: ''
    };
  }
  onFileChange(event: Event) {
    const element = event.target as HTMLInputElement;
    if (element && element.files && element.files.length > 0) {
      const file = element.files[0];
      if (file.type !== 'image/png') {
        alert('Only PNG files are allowed!');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        this.registerData.photo = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

}
