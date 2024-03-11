import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestService } from 'src/app/services/rest.service';
import { from } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-garage-create-image',
  templateUrl: './garage-create-image.component.html',
  styleUrls: ['./garage-create-image.component.scss']
})
export class GarageCreateImageComponent implements OnInit {

   
  garageForm!: FormGroup;
  garages: any[] = [];
  selectedFile!: File ;
  
  constructor(
    private formBuilder: FormBuilder, 
    private restService: RestService,
    private router: Router) {

    from(this.restService.getGarages()).subscribe((data: any[]) => {
      this.garages = data;
    });
      this.garageForm = this.formBuilder.group({
    
        garageId: [, Validators.required],
        image_url: ['https://variety.com/wp-content/uploads/2021/07/Rick-Astley-Never-Gonna-Give-You-Up.png?w=1000&h=563&crop=1', Validators.required], //una imagen cualquira que luego se sutituye
        alt: [, Validators.required],
        publication_date: [this.getCurrentDate(), Validators.required],  

  
      });
    }

  getCurrentDate(): string {
    const currentDate = new Date();
    return currentDate.toISOString();
  }


  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }

  saveGarage() {
    if (this.garageForm.valid) {
      const formData = new FormData();
      formData.append('garage', this.garageForm.get('garageId')?.value);
      formData.append('image', this.selectedFile, this.selectedFile.name); // Add the selected file to the form data
      formData.append('alt', this.garageForm.get('alt')?.value);
  
      from(this.restService.getCreateGarageImage(formData)).subscribe(response => {
        console.log('Imagen asociada', response);
      });
      this.router.navigate(['/garage-create/']); 

    } else {
      console.log(this.garageForm.value);
      console.log('El formulario no es válido');
    }
  }

  ngOnInit() {
    from(this.restService.getGarages()).subscribe((data: any) => {
      // Make sure the data has the same structure as your form
      const address = data.address || {};
      const country = address.country || 'ES'; // Use 'ES' as a default value
      this.garageForm.patchValue({address: {country}});
    });
  }
}


