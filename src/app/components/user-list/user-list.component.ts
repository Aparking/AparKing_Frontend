import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.models';
import { UserService } from 'src/app/service/user.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {

  users?: User[];
  currentIndex = -1;
  currentUser: User = {};
  username = '';

  constructor(private userService: UserService, private alertController: AlertController) { }

  ngOnInit(): void {
    this.retrieveUsers();
  }

  async retrieveUsers(): Promise<void> {
    try {
      const data = await this.userService.getAll();
      this.users = data;
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  }

  refreshList(): void {
    this.retrieveUsers();
    this.currentUser = {};
    this.currentIndex = -1;
  }

  async searchUsername(): Promise<void> {
    this.currentUser = {};
    this.currentIndex = -1;

    try {
      const data = await this.userService.findByUsername(this.username);
      this.users = data;
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  }

  async removeAllUsers(): Promise<void> {
    try {
      const res = await this.userService.deleteAll();
      console.log(res);
      this.refreshList();
    } catch (e) {
      console.error(e);
    }
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
