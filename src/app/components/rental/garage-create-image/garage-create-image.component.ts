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
  selectedFile!: File;
  
  constructor(
    private formBuilder: FormBuilder, 
    private restService: RestService,
    private router: Router
  ) {}

  ngOnInit() {
    this.garageForm = this.formBuilder.group({
      garage: [null, Validators.required],
      image: [null, Validators.required],
      alt: [null, Validators.required],
      publication_date: [this.getCurrentDate(), Validators.required]
    });

    this.getAllGarages();
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
    if (this.garageForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('garage', this.garageForm.get('garage')?.value);
      formData.append('image', this.selectedFile, this.selectedFile.name);
      formData.append('alt', this.garageForm.get('alt')?.value);
  
      from(this.restService.getCreateImage(formData)).subscribe(response => {
        console.log('Imagen asociada', response);
        this.router.navigate(['/garage-create/']); 
      });
    } else {
      console.log('El formulario no es válido');
    }
  }
}
