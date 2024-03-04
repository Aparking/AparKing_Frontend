import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import {
  Geolocation,
  PermissionStatus,
  Position,
} from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor() {}

  getLocation = async (): Promise<Position | undefined> => {
    let coordenates: Position | undefined;
    const locationStatus = await this.requestLocationPermissions();
    if (locationStatus || Capacitor.getPlatform() === 'web') {
      coordenates = await Geolocation.getCurrentPosition();
    } else {
      coordenates = undefined;
    }
    return coordenates;
  };

  async checkLocationPermission(): Promise<PermissionStatus> {
    return await Geolocation.checkPermissions();
  }

  async requestLocationPermissions(): Promise<boolean> {
    let status = await this.checkLocationPermission();
    let allowed: boolean = status.location == 'granted';
    if (!allowed && Capacitor.getPlatform() !== 'web') {
      await Geolocation.requestPermissions();
      status = await this.checkLocationPermission();
      allowed = status.location == 'granted';
    }
    return allowed;
  }
}
