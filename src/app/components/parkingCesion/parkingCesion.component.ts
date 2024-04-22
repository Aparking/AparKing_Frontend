import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CesionParking, Location } from 'src/app/models/parking';
import { DataManagementService } from 'src/app/service/data-management.service';
import { Vehicle } from '../../models/authentication';


@Component({
  selector: 'app-subscription',
  templateUrl: './parkingCesion.component.html',
  styleUrls: ['./parkingCesion.component.scss']
})
export class parkingCesionComponent implements OnInit {
  parking?: CesionParking | undefined;
  vehicle?: Vehicle[] | undefined;

  ngOnInit() {
    this.getParkingCesion();
  }


  constructor(private dataManagementService: DataManagementService, private router: Router) { }


  async getParkingCesion() {
    this.dataManagementService.getParkingCesion().then((data: CesionParking) => {
      console.log("datos parking", data);
      this.parking = data;
    }).catch(error => {
      console.error('There was an error!', error);
    });
  }


  parseLocation(locationString: Location): Location | null {
    const matches = String(locationString).match(/POINT \(([^ ]+) ([^ ]+)\)/);
    if (matches && matches.length >= 3) {
      return {
        latitude: parseFloat(matches[2]),
        longitude: parseFloat(matches[1]),
      };
    }
    return null;
  }


  async getVehicles() {
    this.dataManagementService.getVehicle().then((data: { vehicles: Vehicle[] } | undefined) => {
      console.log("datos vehículos", data);
      console.log(!data || data.vehicles.length === 0);
      if (!data || data.vehicles.length === 0) {
        console.log("No hay vehículos disponibles o la data es undefined");
        this.router.navigate(['/registerVehicle']);
        return data?.vehicles.length;
      } else {
        this.vehicle = data.vehicles;
        return data?.vehicles.length;
      }
    }).catch(error => {
      console.error('There was an error!', error);
    });
  }

  async postParkingCesion(parkingId: number) {
    try {
      console.log(parkingId)
      await this.getVehicles();
      if (this.vehicle && this.vehicle.length > 0) {
        console.log("hola")
        const session = await this.dataManagementService.postParkingCesion(parkingId);
        return session;
      }

    } catch (error) {
      console.error(error);
    }
  }

}