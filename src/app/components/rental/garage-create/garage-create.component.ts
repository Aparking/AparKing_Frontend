import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-garage-create',
  templateUrl: './garage-create.component.html',
  styleUrls: ['./garage-create.component.scss'],
})
export class GarageCreateComponent implements OnInit {
  garageId: string = '';
  garageForm!: FormGroup;
  file: any;

  constructor(
    private formBuilder: FormBuilder,
    private restService: RestService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.garageForm = this.formBuilder.group({
      address: this.formBuilder.group({
        id: [],
        unit_number: [, Validators.required],
        street_number: [, Validators.required],
        address_line: [, Validators.required],
        city: [, Validators.required],
        region: [, Validators.required],
        country: [],
        postal_code: [, Validators.required],
      }),
      images: this.formBuilder.group({
        id: [],
        image: [, Validators.required],
        alt: [],
      }),
      id: [],
      name: [, Validators.required],
      description: [],
      height: [, Validators.required],
      width: [, Validators.required],
      length: [, Validators.required],
      price: [, Validators.required],
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.garageId = params['id'];
        this.loadGarage(this.garageId);
      }
    });
  }

  loadGarage(id: string) {
    Promise.all([
      this.restService.getGarageById(id),
      this.restService.getImageByGarageId(id),
    ])
      .then(([garage, image]) => {
        console.log(garage);
        if (garage && image) {
          this.garageForm.patchValue({
            address: {
              id: garage.address.id,
              unit_number: garage.address.unit_number,
              street_number: garage.address.street_number,
              address_line: garage.address.address_line,
              city: garage.address.city,
              region: garage.address.region,
              country: garage.address.country,
              postal_code: garage.address.postal_code,
            },
            // images: {
            //   id: image.id,
            //   image: image.image,
            //   alt: image.alt,
            // },
            image: garage.image,
            id: garage.id,
            name: garage.name,
            description: garage.description,
            height: garage.height,
            width: garage.width,
            length: garage.length,
            price: garage.price,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  uploadImage(event: any) {
    this.file = event.target.files[0];
    console.log(this.file);
  }

  saveGarage() {
    if (this.garageForm.value && this.garageForm.valid) {
      const garageData = this.garageForm.value;
      const allData = new FormData();

      if (this.garageId) {
        this.restService
          .updateGarage(this.garageId, allData)
          .then((response) => {
            console.log('Garaje actualizado', response);
            this.router.navigate([`aparKing/garages/${this.garageId}`]);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        this.restService
          .createGarage(allData)
          .then((response) => {
            console.log('Garaje creado', response);
            this.router.navigate([`aparKing/garages`]);
          })
          .catch((error) => {
            console.error(error);
          });

        // formData.append('garage', this.garageId);
        // formData.append('alt', 'Imagen de garaje');
        // this.restService
        //   .uploadImage(formData)
        //   .then((response) => {
        //     console.log('Imagen subida', response);
        //   })
        //   .catch((error) => {
        //     console.error(error);
        //   });
      }
    } else {
      console.log('El formulario no es válido');
    }
  }
}
