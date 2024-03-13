import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.models';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  //Inicialización
  user: User = {
    username: '',
    email: '',
    dni: '',
    birth_date: undefined,
    gender: '',
    photo: '',
    phone: '',
    password: '',
    is_staff: ''
};
submitted = false;
public users: User[] = [];

  constructor(private userService: UserService, private router: Router) {
    this.userService.getAll().subscribe(users => {
    this.users = users;
  }); }

  ngOnInit(): void {
    this.user = {};
  }

  //Funcionalidades
  saveUser(): void {
    const data: User = {
      username: this.user.username,
      email: this.user.email,
      dni: this.user.dni,
      birth_date: this.user.birth_date,
      gender: this.user.gender,
      photo: this.user.photo,
      phone: this.user.phone,
      password: this.user.password,
      is_staff: this.user.is_staff
    };

    this.userService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
          this.router.navigate(['/users']);
        },
        error: (e) => console.error(e)
      });
  }

  newUser(): void {
    this.submitted = false;
    this.user = {
      username: '',
      email: '',
      dni: '',
      birth_date: undefined,
      gender: '',
      photo: '',
      phone: '',
      password: '',
      is_staff: ''
    };
  }

  //Validaciones
  public isUsernameUnique(): boolean {
    const otherUsers = this.users.filter(u => u.username === this.user.username);
    return otherUsers.length === 0;
  }

  public isDniUnique(): boolean {
    const otherUsers = this.users.filter(u => u.dni === this.user.dni);
    return otherUsers.length === 0;
  }

  public isEmailUnique(): boolean {
    const otherUsers = this.users.filter(u => u.email === this.user.email);
    return otherUsers.length === 0;
  }
}
