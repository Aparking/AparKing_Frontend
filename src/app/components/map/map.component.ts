import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Location, Parking } from 'src/app/models/parking';
import { DataManagementService } from 'src/app/service/data-management.service';
import { LocationService } from 'src/app/service/location.service';
import { WebsocketService } from 'src/app/service/websocket.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  userLocation: Location | undefined;
  parkings: Parking[] = [];
  group: string = '';
  map: L.Map | undefined;
  count: number = 0;

  constructor(
    private dataManagement: DataManagementService,
    private locationService: LocationService,
    private websocket: WebsocketService
  ) {}

  ngOnInit() {
    this.locationService.getLocation().then((location) => {
      if (location) {
        this.userLocation = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        this.dataManagement.getParkingNear(this.userLocation).then((data) => {
          this.parkings = data.parkingData;
          this.group = data.group;
          this.websocket.connect(
            `ws://localhost:8000/ws/parking/${this.group}/`
          );
          this.prepareMap(this.userLocation!, undefined, this.parkings);
        });
      }
    });
  }

  locateUserOnMap() {
    this.locationService.getLocation().then((location) => {
      if (location) {
        this.userLocation = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        this.dataManagement.getParkingNear(this.userLocation).then((data) => {
          console.log(data);
          this.parkings = data.parkingData;
          this.group = data.group;
          this.prepareMap(this.userLocation!, this.map, this.parkings);
        });
      }
    });
  }

  private prepareMap(location: Location, map?: L.Map, parkings?: Parking[]) {
    let icon = L.icon({
      iconUrl: 'marker-icon.png',
      iconSize: [25, 35],
    });
    console.log(parkings);
    this.map = map
      ? map.setView([location.latitude, location.longitude], 18)
      : L.map('mapId').setView([location.latitude, location.longitude], 18);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
    if (parkings) {
      for (const parking of parkings) {
        const markPoint = L.marker(
          [parking.location.latitude, parking.location.longitude],
          { icon: icon }
        );
        markPoint.bindPopup(`
        <b>Tipo:</b><p>${parking.parking_type}</p>
        <b>Tamaño:</b><p>${parking.size}</p>`);
        this.map.addLayer(markPoint);
      }
    }
  }
}
