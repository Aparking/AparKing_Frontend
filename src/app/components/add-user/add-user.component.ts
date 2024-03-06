import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.models';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  user: User = {
    username: '',
    email: '',
    dni: '',
    birth_date: undefined,
    gender: '',
    photo: '',
    phone: '',
    is_staff: ''
};
submitted = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user = {};
  }

  saveUser(): void {
    const data: User = {
      username: this.user.username,
      email: this.user.email,
      dni: this.user.dni,
      birth_date: this.user.birth_date,
      gender: this.user.gender,
      photo: this.user.photo,
      phone: this.user.phone,
      is_staff: this.user.is_staff
    };

    this.userService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
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
      is_staff: ''
    };
  }

}
