import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-garage-create',
  templateUrl: './garage-create.component.html',
  styleUrls: ['./garage-create.component.scss'],
})
export class GarageCreateComponent implements OnInit {
  garages: any[] = [];
  garageForm: FormGroup = this.formBuilder.group({
    address: this.formBuilder.group({
      unit_number: [, Validators.required],
      street_number: [, Validators.required],
      address_line: [, Validators.required],
      city: [, Validators.required],
      region: [, Validators.required],
      country: [],
      postal_code: [, Validators.required],
    }),
    image: this.formBuilder.group({
      image_url: [, Validators.required],
      alt: [, Validators.required],
    }),
    name: [, Validators.required],
    description: [, Validators.required],
    height: [, Validators.required],
    width: [, Validators.required],
    length: [, Validators.required],
    price: [, Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private restService: RestService,
    private router: Router
  ) {}

  ngOnInit() {
    from(this.restService.getAllGarages()).subscribe((data: any) => {
      // Make sure the data has the same structure as your form
      const address = data.address || {};
      const country = address.country || 'ES'; // Use 'ES' as a default value
      this.garageForm.patchValue({ address: { country } });
    });
  }

  saveGarage() {
    console.log(this.garageForm.value);
    //json para el backend
    if (this.garageForm.valid) {
      const garaje_json = {
        garage: {
          name: this.garageForm.value.name,
          description: this.garageForm.value.description,
          height: this.garageForm.value.height,
          width: this.garageForm.value.width,
          length: this.garageForm.value.length,
          price: this.garageForm.value.price,
        },
        address: {
          unit_number: this.garageForm.value.address.unit_number,
          street_number: this.garageForm.value.address.street_number,
          address_line: this.garageForm.value.address.address_line,
          city: this.garageForm.value.address.city,
          region: this.garageForm.value.address.region,
          country: this.garageForm.value.address.country,
          postal_code: this.garageForm.value.address.postal_code,
        },
        image: {
          image_url: this.garageForm.value.image.image_url,
          alt: this.garageForm.value.image.alt,
        },
      };
      from(this.restService.createGarage(garaje_json)).subscribe((response) => {
        console.log('Garaje creado', response);
        this.router.navigate([`aparKing/garages`]);
      });
    } else {
      console.log('El formulario no es válido');
    }
  }
}
