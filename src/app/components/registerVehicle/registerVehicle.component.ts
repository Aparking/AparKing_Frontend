import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { DataManagementService } from 'src/app/service/data-management.service';

@Component({
  selector: 'app-register',
  templateUrl: './registerVehicle.component.html',
  styleUrls: ['./registerVehicle.component.scss'],
})
export class registerVehicleComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private dataManagement: DataManagementService,
    private router: Router
  ) {
    this.registerForm = new FormGroup(
      {
        carModel: new FormControl('', [Validators.required]),
        color: new FormControl('', [Validators.required]),
        height: new FormControl('', [Validators.required]),
        width: new FormControl('', [Validators.required]),
        length: new FormControl('', [Validators.required]),
      },
    );
  }

  ngOnInit() {
    console.log('register');
  }

  async registerSubmit() {
    if (this.registerForm.valid) {
      try {
        const response = await this.dataManagement.postVehicleRegister(this.registerForm.value);
        console.log('Vehicle registered:', response);
        this.router.navigate(['/G11/aparKing/map']);
      } catch (error) {
        console.error('Error during vehicle registration:', error);
      }
    } else {
      console.log('Form is not valid');
    }
  }
}
