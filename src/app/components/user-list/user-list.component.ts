import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { User } from 'src/app/models/user.models';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent  implements OnInit {

  users?: User[];
  currentIndex = -1;
  currentUser: User = {};
  username= '';

  constructor(private userService: UserService,private alertController: AlertController, private router: Router) { }

  ngOnInit(): void {
    this.retrieveUsers();
  }


  retrieveUsers(): void {
    this.userService.getAll()
      .subscribe({
        next: (data) => {
          this.users = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveUsers();
    this.currentUser = {};
    this.currentIndex = -1;
  }

  searchUsername(): void {
    this.currentUser = {};
    this.currentIndex = -1;

    this.userService.findByUsername(this.username)
      .subscribe({
        next: (data) => {
          this.users = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }


  removeAllUsers(): void {
    this.userService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  async confirmRemoveAllUsers() {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Are you sure you want to remove all users?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Remove',
          handler: () => {
            this.removeAllUsers();
          }
        }
      ]
    });

    await alert.present();
  }
}
