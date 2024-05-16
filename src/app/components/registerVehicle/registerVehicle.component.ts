import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { Vehicle } from 'src/app/models/authentication';
import { DataManagementService } from 'src/app/service/data-management.service';

@Component({
  selector: 'app-register',
  templateUrl: './registerVehicle.component.html',
  styleUrls: ['./registerVehicle.component.scss'],
})
export class registerVehicleComponent implements OnInit {
  registerForm: FormGroup;
  vehicle?: Vehicle[] | undefined;

  constructor(
    private dataManagement: DataManagementService,
    private router: Router
  ) {
    this.registerForm = new FormGroup(
      {
        carModel: new FormControl('', [Validators.required]),
        color: new FormControl('', [Validators.required]),
        height: new FormControl('', [Validators.required, Validators.min(1)]),
        width: new FormControl('', [Validators.required, Validators.min(1)]),
        length: new FormControl('', [Validators.required, Validators.min(1)]),
      },
    );
  }

  ngOnInit() {
    console.log('register');
    this.getVehicles();
  }

  async registerSubmit() {
    if (this.registerForm.valid) {
      try {
        const response = await this.dataManagement.postVehicleRegister(this.registerForm.value);
        console.log('Vehicle registered:', response);
        window.location.reload();
      } catch (error) {
        console.error('Error during vehicle registration:', error);
      }
    } else {
      console.log('Form is not valid');
    }
  }


  async getVehicles() {
    this.dataManagement.getVehicle().then((data: { vehicles: Vehicle[] } | undefined) => {
      if (!data || data.vehicles.length === 0) {
        this.router.navigate(['/G11/aparKing/tab3/registerVehicle']);
        return data?.vehicles.length;
      } else {
        this.vehicle = data.vehicles;
        console.log(this.vehicle)
        return data?.vehicles.length;
      }
    }).catch(error => {
      console.error('There was an error!', error);
    });
  }

  async updateVehiculoPrincipal(vehicleId: number) {
    try {
      await this.dataManagement.updateVehiculoPrincipal(vehicleId);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }
}
