import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import * as L from 'leaflet';
import {
  Location,
  NotificationsSocket,
  Parking,
  ParkingSize,
  ParkingSocket,
  ParkingType,
} from 'src/app/models/parking';
import { DataManagementService } from 'src/app/service/data-management.service';
import { LocationService } from 'src/app/service/location.service';
import { WebsocketService } from 'src/app/service/websocket.service';
import { environment } from 'src/environments/environment';
import { CreateParkingModalComponent } from '../create-parking-modal/create-parking-modal.component';

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
  private icon = L.icon({
    iconUrl: 'marker-icon.png',
    iconSize: [25, 35],
  });
  private layerGroup: L.LayerGroup = L.layerGroup();

  public messages: string[] = [];
  constructor(
    private dataManagement: DataManagementService,
    private locationService: LocationService,
    private websocket: WebsocketService,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController
  ) {}

  async ngOnInit() {
    this.prepareMap();
    this.locationService.getLocation().then((location) => {
      if (location) {
        this.userLocation = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };

        this.dataManagement.getParkingNear(this.userLocation).then((data) => {
          this.parkings = data.parkingData;
          this.group = data.group;
          try {
            this.websocket
              .connect(`${environment.wsUrl}${this.group}/`)
              .forEach((response: MessageEvent): any => {
                let data: ParkingSocket = JSON.parse(response.data);

                this.manageSocketAdd(data);
                return data;
              });
          } catch (error) {
            console.error(error);
          }
          this.prepareMap(this.userLocation!, this.map, this.parkings);
        });
      }
    });
  }

  async locateUserOnMap() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
    });
    loading.present();
    this.locationService.getLocation().then((location) => {
      if (location) {
        this.userLocation = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        this.dataManagement.getParkingNear(this.userLocation).then((data) => {
          this.parkings = data.parkingData;
          this.group = data.group;
          this.manageMarkers();
          loading.dismiss();
        });
      }
    });
  }

  async showCreateModal() {
    const modal = await this.modalCtrl.create({
      component: CreateParkingModalComponent,
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.5,
    });
    await modal.present();
  }

  private prepareMap(location?: Location, map?: L.Map, parkings?: Parking[]) {
    if (!location) {
      location = {
        latitude: -5.9912307,
        longitude: 37.3807579,
      };
    }
    this.map = map
      ? map.setView([location.latitude, location.longitude], 18)
      : L.map('mapId', { zoomControl: false }).setView(
          [location.latitude, location.longitude],
          18
        );
    this.map.invalidateSize();
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
    if (parkings) {
      for (const parking of parkings) {
        const markPoint = this.createMarker(parking);
        this.layerGroup?.addLayer(markPoint);
        this.map.addLayer(markPoint);
      }
    }
  }

  manageSocketAdd(socket: ParkingSocket) {
    switch (socket.type) {
      case NotificationsSocket.PARKING_NOTIFIED:
        this.manageMarkers(undefined, socket.message);
        break;
      case NotificationsSocket.PARKING_DELETED:
        this.manageMarkers(socket.message.id);
        break;

      case NotificationsSocket.PARKING_BOOKED:
        this.manageMarkers(socket.message.id, socket.message);
        break;
      default:
        break;
    }
  }

  createMarker(parking: Parking): L.Marker {
    const markPoint = L.marker(
      [parking.location.latitude, parking.location.longitude],
      { icon: this.icon }
    );
    markPoint.bindPopup(`
    <div style="width:140px;">
        <p><b>Tipo:</b>
          ${
            ParkingType[
              parking.parking_type as unknown as keyof typeof ParkingType
            ]
          }</p>
        <p><b>Tamaño:</b>
          ${
            ParkingSize[parking.size as unknown as keyof typeof ParkingSize]
          }</p>
          <p><b>Estado:</b>
          ${parking.is_assignment ? 'Alguien de camino</p>' : 'Aun libre</p>'}
        <a href="https://www.google.com/maps?q=${parking.location.latitude},${
      parking.location.longitude
    }">Ir a la plaza</a>
      </div>
   `);
    return markPoint;
  }

  manageMarkers(id?: number, parking?: Parking) {
    this.layerGroup?.clearLayers();
    if (id) {
      this.parkings = this.parkings.filter((parking) => parking.id !== id);
    }
    if (parking) {
      this.parkings.push(parking);
    }
    this.parkings.forEach((parking) => {
      this.layerGroup?.addLayer(this.createMarker(parking));
    });
    this.map?.addLayer(this.layerGroup);
  }
}
