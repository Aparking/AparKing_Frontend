import { Component, OnInit } from '@angular/core';
import {
  AdMob,
  BannerAdOptions,
  BannerAdPosition,
  BannerAdSize,
} from '@capacitor-community/admob';
import { NavController, Platform, isPlatform } from '@ionic/angular';
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
    this.initialize().then((_) => this.showBanner());
  }

  async initialize() {
    const { status } = await AdMob.trackingAuthorizationStatus();
    if (status === 'notDetermined') {
      console.log('Requesting tracking authorization');
      await AdMob.requestTrackingAuthorization();
    }
    AdMob.initialize({
      testingDevices: ['3EE684B8616110F9640E39F68D0D8593'],
      initializeForTesting: true,
    });
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

  async showBanner() {
    const adId = isPlatform('ios')
      ? 'ca-app-pub-6591188318686915/6336576890'
      : 'ca-app-pub-6591188318686915/7924990732';
    const options: BannerAdOptions = {
      adId,
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
    };

    await AdMob.showBanner(options);
  }
}
