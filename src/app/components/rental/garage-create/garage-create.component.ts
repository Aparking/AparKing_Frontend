import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RestService } from 'src/app/services/rest.service';
import { from } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-garage-create',
  templateUrl: './garage-create.component.html',
  styleUrls: ['./garage-create.component.scss'],
})
export class GarageCreateComponent implements OnInit { 
  garageForm: FormGroup;
  garages: any[] = [];
  

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private restService: RestService,
    private router: Router  ) {

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

      image: this.formBuilder.group({
        image_url: [, Validators.required],
        alt: [, Validators.required],
        publication_date: [this.getCurrentDate(), Validators.required],
      }),
      
        name: [, Validators.required],
        description: [, Validators.required],
        height: [, Validators.required],
        width: [, Validators.required],
        length: [, Validators.required],
        price: [, Validators.required],
        creation_date: [this.getCurrentDate(), Validators.required],
        modification_date: [this.getCurrentDate(), Validators.required],
        is_active: [true, Validators.required],
      
    });
    
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    return currentDate.toISOString();
  }

  saveGarage() {
    console.log(this.garageForm.value);
          //json para el backend
    if (this.garageForm.valid) {
      const garaje_json= {
        "garage": {
          "name": this.garageForm.value.name,
          "description": this.garageForm.value.description,
          "height": this.garageForm.value.height,
          "width": this.garageForm.value.width,
          "length": this.garageForm.value.length,
          "price": this.garageForm.value.price,
          "creation_date": this.garageForm.value.creation_date,
          "modification_date": this.garageForm.value.modification_date,
          "is_active": this.garageForm.value.is_active,
          "owner": this.garageForm.value.owner,
        },
        "address": {
          "unit_number": this.garageForm.value.address.unit_number,
          "street_number": this.garageForm.value.address.street_number,
          "address_line": this.garageForm.value.address.address_line,
          "city": this.garageForm.value.address.city,
          "region": this.garageForm.value.address.region,
          "country": this.garageForm.value.address.country,
          "postal_code": this.garageForm.value.address.postal_code,
        },
        "image": {
          "image_url": this.garageForm.value.image.image_url,
          "alt": this.garageForm.value.image.alt,
          "publication_date": this.garageForm.value.image.publication_date,
          "garageId": this.garageForm.value.image.garageId
        }
      }
      from(this.restService.createGarage(garaje_json)).subscribe(response => {
        console.log('Garaje creado', response);
        this.garageForm.reset(); // Limpia los campos del formulario
        this.garageForm.patchValue({garage_id: response.id}); // Actualiza el garage_id con el ID devuelto por el servidor
          this.router.navigate([`aparKing/garages`]); 
        });
    } else {
      console.log('El formulario no es válido');
    }
  }
  
  ngOnInit(){
    from(this.restService.getAllGarages()).subscribe((data: any) => {
      // Make sure the data has the same structure as your form
      const address = data.address || {};
      const country = address.country || 'ES'; // Use 'ES' as a default value
      this.garageForm.patchValue({address: {country}});
    });
  }
}