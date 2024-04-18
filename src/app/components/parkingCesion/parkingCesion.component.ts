import { Component, OnInit } from '@angular/core';
import { CesionParking, Location } from 'src/app/models/parking';
import { DataManagementService } from 'src/app/service/data-management.service';


@Component({
  selector: 'app-subscription',
  templateUrl: './parkingCesion.component.html',
  styleUrls: ['./parkingCesion.component.scss']
})
export class parkingCesionComponent implements OnInit {
  parking?: CesionParking | undefined;

  ngOnInit() {
    this.getParkingCesion();
  }


  constructor(private dataManagementService: DataManagementService) { }


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

  async postParkingCesion(parkingId: number) {
    try {
      const session = await this.dataManagementService.postParkingCesion(parkingId);
      return session
    } catch (error) {
      console.error(error);
    }
  }

}