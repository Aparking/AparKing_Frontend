import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { constants } from 'src/app/constants.ts';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.page.html',
  styleUrls: ['./start-page.page.scss'],
})
export class StartPagePage implements OnInit {
  constants = constants;
  isDarkMode: boolean = false;

  constructor(private platform: Platform, private navCtr: NavController) {
    this.checkDarkMode();
  }

  ngOnInit() {
    this.checkDarkMode();
  }

  ionViewDidEnter() {
    this.checkDarkMode();
  }

  checkDarkMode() {
    this.isDarkMode =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  goLogin() {
    this.navCtr.navigateForward('/login');
  }

  goRegister() {
    this.navCtr.navigateForward('/register');
  }
}
