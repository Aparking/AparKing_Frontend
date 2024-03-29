import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { RestService } from 'src/app/service/rest.service';

@Component({
  selector: 'app-garage-create',
  templateUrl: './garage-create.component.html',
  styleUrls: ['./garage-create.component.scss'],
})
export class GarageCreateComponent implements OnInit {
  garageForm!: FormGroup;
  imageForm!: FormGroup;
  garages: any[] = [];
  selectedFile!: File;

  constructor(
    private formGargeBuilder: FormBuilder,
    private formImageBuilder: FormBuilder,
    private restService: RestService,
    private router: Router
  ) {}

  ngOnInit() {
    this.garageForm = this.formGargeBuilder.group({
      address: this.formGargeBuilder.group({
        unit_number: [null, Validators.required],
        street_number: [null, Validators.required],
        address_line: [null, Validators.required],
        city: [null, Validators.required],
        region: [null, Validators.required],
        country: [null],
        postal_code: [null, Validators.required],
      }),
      name: [null, Validators.required],
      description: [null, Validators.required],
      height: [null, Validators.required],
      width: [null, Validators.required],
      length: [null, Validators.required],
      price: [null, Validators.required],
      creation_date: [this.getCurrentDate(), Validators.required],
      modification_date: [this.getCurrentDate(), Validators.required],
      is_active: [true, Validators.required],
      owner: [null, Validators.required], //TODO  QUE LO PILLE AUTOMATICAMENTE
    });

    //IMAGE**
    this.imageForm = this.formImageBuilder.group({
      image: this.formImageBuilder.group({
        garage: [1, Validators.required],
        image: [null, Validators.required],
        alt: [null, Validators.required],
        publication_date: [this.getCurrentDate(), Validators.required],
      }),
    });

    this.getAllGarages();

    from(this.restService.getAllGarages()).subscribe((data: any) => {
      // Make sure the data has the same structure as your formz
      const address = data.address || {};
      const country = address.country || 'ES'; // Use 'ES' as a default value
      this.garageForm.patchValue({ address: { country } });
    });
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    return currentDate.toISOString();
  }

  getAllGarages() {
    from(this.restService.getAllGarages()).subscribe((data: any[]) => {
      this.garages = data;
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  saveGarage() {
    if (this.garageForm.valid) {
      from(this.restService.getCreateGarage(this.garageForm.value)).subscribe(
        (response) => {
          console.log('Garaje creado', response);
          this.garageForm.reset(); // Limpia los campos del formulario
          const garageId = response.id; // Obtén el ID del garaje creado
          this.imageForm.get('image')?.get('garage')?.setValue(garageId); // Establece el ID del garaje en el formulario de imagen

          // Verifica si el formulario de imagen también es válido y se ha seleccionado un archivo
          if (this.imageForm.valid && this.selectedFile) {
            const formData = new FormData();
            formData.append('garage', garageId); // Envía el ID del garaje en lugar de obtenerlo del formulario de imagen
            formData.append('image', this.selectedFile, this.selectedFile.name);
            formData.append(
              'alt',
              this.imageForm.get('image')?.get('alt')?.value
            );

            from(this.restService.getCreateImage(formData)).subscribe(
              (response) => {
                console.log('Imagen asociada', response);
                this.imageForm.reset(); // Limpia los campos del formulario
                this.router.navigate(['/G11/aparKing/garages/']); // Navega a la página de creación de garajes
              }
            );
          } else {
            console.log(
              'El formulario de imagen no es válido o no se ha seleccionado un archivo'
            );
          }
        }
      );
    } else {
      //TODO - Imprimir mensajes de error en el formulario
      console.log('El formulario de garaje no es válido');
    }
  }
}
