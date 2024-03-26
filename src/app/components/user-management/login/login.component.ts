/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { LoginUser } from '../../../models/userLogin.models';
import { LoginService } from '../../../service/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
  loginData: LoginUser = {
    email: '',
    password: '',
  };
  submitted = false;
  errorEmail: string = '';
  errorPass: string = '';

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  async saveLogin(): Promise<void> {
    const data: LoginUser = {
      email: this.loginData.email,
      password: this.loginData.password,
    };

    try {
      const res = await this.loginService.loginUser(data);
      console.log(res);
      this.loginService.setCurrentUser(res.user);
      this.submitted = true;
    } catch (e: any) {
      this.errorEmail = e.error.email;
      this.errorPass = e.error.password;
      console.error(e);
    }
  }

  newLogin(): void {
    this.submitted = false;
    this.loginData = {
      email: '',
      password: '',
    };
  }

}
