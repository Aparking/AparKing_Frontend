import { Component, OnInit } from '@angular/core';
import { BackendUser } from './models/user.models';
import { RegisterService } from './register.service';

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

  constructor(private registerService: RegisterService) { }

  ngOnInit(): void {
  }

  saveRegister(): void {
    const data: BackendUser = {
      username: this.registerData.username,
      password: this.registerData.password,
      email: this.registerData.email,
      dni: this.registerData.dni,
      birth_date: this.registerData.birth_date,
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
        error: (e) => console.error(e)
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

}
