import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.models';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  //Inicialización
  @Input() viewMode = false;

  @Input() currentUser: User = {
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

  message = '';
  public users: User[] = [];

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) {
      this.userService.getAll().subscribe(users => {
      this.users = users;
    });}

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getUser(this.route.snapshot.params["id"]);
    }
  }

  //Funcionalidades
  getUser(id: string): void {
    this.userService.get(id)
      .subscribe({
        next: (data) => {
          this.currentUser = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updateUser(): void {
    this.message = '';
    this.userService.update(this.currentUser.id, this.currentUser)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This user was updated successfully!';
          this.router.navigate(['/users']);
        },
        error: (e) => console.error(e)
      });
  }

  deleteUser(): void {
    this.userService.delete(this.currentUser.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/users']);
        },
        error: (e) => console.error(e)
      });
  }

  //Validaciones
  public isUsernameUnique(): boolean {
    const otherUsers = this.users.filter(user => user.id !== this.currentUser.id && user.username === this.currentUser.username);
    return otherUsers.length === 0;
  }

  public isDniUnique(): boolean {
    const otherUsers = this.users.filter(user => user.id !== this.currentUser.id && user.dni === this.currentUser.dni);
    return otherUsers.length === 0;
  }

  public isEmailUnique(): boolean {
    const otherUsers = this.users.filter(user => user.id !== this.currentUser.id && user.email === this.currentUser.email);
    return otherUsers.length === 0;
  }
}
