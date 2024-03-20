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

      // image: this.formBuilder.group({
      //   image_url: [, Validators.required],
      //   alt: [, Validators.required],
      //   publication_date: [this.getCurrentDate(), Validators.required],
      //   garageId: [, Validators.required]
      // }),

        name: [, Validators.required],
        description: [, Validators.required],
        height: [, Validators.required],
        width: [, Validators.required],
        length: [, Validators.required],
        price: [, Validators.required],
        creation_date: [this.getCurrentDate(), Validators.required],
        modification_date: [this.getCurrentDate(), Validators.required],
        is_active: [true, Validators.required],
        owner: [, Validators.required] //TODO  QUE LO PILLE AUTOMATICAMENTE

    });

  }

  getCurrentDate(): string {
    const currentDate = new Date();
    return currentDate.toISOString();
  }


  saveGarage() {
    console.log(this.garageForm.value);
    if (this.garageForm.valid) {
      from(this.restService.getCreateGarage(this.garageForm.value)).subscribe(response => {
        console.log('Garaje creado', response);
        this.garageForm.reset(); // Limpia los campos del formulario
        this.garageForm.patchValue({garage_id: response.id}); // Actualiza el garage_id con el ID devuelto por el servidor
      });
      // from(this.restService.getCreateGarageImage(this.garageForm.value)).subscribe(response => {
      //   console.log('Imagen asociada', response);
      //   console.log('Garage', response.id);
      // });
      
    } else {
      console.log('El formulario no es válido');
      this.router.navigate(['/aparKing/garages/create/create-image/']); 
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