import { Component, Input, OnInit, input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Garage, Address } from 'src/app/models/garage.models';

@Component({
  selector: 'app-garage-create',
  templateUrl: './garage-create.component.html',
  styleUrls: ['./garage-create.component.scss'],
})
export class GarageCreateComponent  implements OnInit {

  API_URL = 'http://localhost:8000/garages/';
  garageForm: FormGroup;

  tittle="Create Garage";

  changeTitle(){ 
    this.tittle="No no tienes garajes manin";
  }

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.garageForm = this.formBuilder.group({
      address: this.formBuilder.group({
        unit_number: [, Validators.required],
        street_number: [, Validators.required],
        address_line: [, Validators.required],
        city: [, Validators.required],
        region: [, Validators.required],
        country: [],
        postal_code: [, Validators.required],
      }),
      name: [, Validators.required],
      description: [, Validators.required],
      height: [, Validators.required],
      width: [, Validators.required],
      length: [, Validators.required],
      price: [, Validators.required],
      creation_date: [new Date(), Validators.required],
      modification_date: [new Date(), Validators.required],
      is_active: [true, Validators.required],
      owner: [, Validators.required]
    });
  }
  
  
  saveGarage() {
    console.log(this.garageForm.value);
    if (this.garageForm.valid) {
      this.http.post(this.API_URL, this.garageForm.value).subscribe(response => {
        console.log('Garaje creado', response);
        this.garageForm.reset(); // Limpia los campos del formulario
      });
    } else {
      console.log('El formulario no es válido');
    }
  }
  
  ngOnInit(){
    this.http.get(this.API_URL).subscribe((data: any) => {
      // Make sure the data has the same structure as your form
      const address = data.address || {};
      const country = address.country || 'ES'; // Use 'ES' as a default value
      this.garageForm.patchValue({address: {country}});
    });
  }
}

