import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { from } from 'rxjs';
import { User } from 'src/app/models/authentication';
import { GarageStateService } from 'src/app/service/garage-state.service';
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
  base_url = '/G11/aparKing/garages';
  garageId: string = '';
  currentGarage?: any;
  currentGarageImages: any[] = [];
  user!: User;

  constructor(
    private formGargeBuilder: FormBuilder,
    private formImageBuilder: FormBuilder,
    private toastController: ToastController,
    private restService: RestService,
    private router: Router,
    private route: ActivatedRoute,
    private navCtr: NavController,
    private garageStateService: GarageStateService
  ) {
    this.garageForm = this.formGargeBuilder.group({
      address: this.formGargeBuilder.group({
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
      owner: [null, Validators.required],
    });
    this.imageForm = this.formImageBuilder.group({
      image: this.formImageBuilder.group({
        garage: [1, Validators.required],
        image: [null, Validators.required],
        alt: [null, Validators.required],
        publication_date: [this.getCurrentDate(), Validators.required],
      }),
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      if (id) this.garageId = id;
    });

    if (this.garageId) {
      this.retrieveGarage();
    } else {
      this.getAllGarages();
      from(this.restService.getAllGarages()).subscribe((data: any) => {
        // Make sure the data has the same structure as your formz
        const address = data.address || {};
        const country = address.country || 'ES'; // Use 'ES' as a default value
        this.garageForm.patchValue({ address: { country } });
      });
    }

    this.restService
      .getUserData()
      .then((data) => {
        this.user = data;
      })
      .catch((error) => {
        console.error(error);
        this.navCtr.navigateRoot('G11/aparKing/garages');
      });
  }

  retrieveGarage() {
    this.restService
      .getGarageById(this.garageId)
      .then((garage) => {
        this.currentGarage = garage;
        this.garageForm.setValue({
          address: {
            street_number: garage.address.street_number,
            address_line: garage.address.address_line,
            city: garage.address.city,
            region: garage.address.region,
            country: garage.address.country,
            postal_code: garage.address.postal_code,
          },
          name: garage.name,
          description: garage.description,
          height: garage.height,
          width: garage.width,
          length: garage.length,
          price: garage.price,
          creation_date: garage.creation_date,
          modification_date: garage.modification_date,
          is_active: garage.is_active,
          owner: garage.owner,
        });
      })
      .catch((error) => {
        console.error(error);
        this.router.navigate([`${this.base_url}/${this.garageId}`]);
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

  uploadImage(toast: any) {
    if (this.imageForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('garage', this.garageId);
      formData.append('image', this.selectedFile, this.selectedFile.name);
      formData.append('alt', this.imageForm.get('image')?.get('alt')?.value);

      this.restService.getCreateImage(formData).then(async (_) => {
        toast.message = `Imagen subida correctamente.`;
        toast.present();
        this.router.navigate(['/G11/aparKing/garages/']);
      });
    } else {
      toast.message = `Error al subir la imagen, vuelva a intentarlo.`;
      toast.present();
    }
  }

  async saveGarage() {
    const toast = await this.toastController.create({
      duration: 2000, // Duración del toast en milisegundos
      position: 'bottom', // Posición del toast (top, middle, bottom)
      color: 'dark', // Color del toast
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel',
        },
      ],
    });

    this.garageForm.patchValue({ owner: this.user.id });
    if (this.garageForm.valid) {
      if (this.garageId) {
        this.restService
          .updateGarage(this.garageId, this.garageForm.value)
          .then(async (_) => {
            if (this.selectedFile) {
              this.imageForm
                .get('image')
                ?.get('garage')
                ?.setValue(this.garageId);
              this.uploadImage(toast);
            }
            this.garageStateService.refreshGarages();
            this.navCtr.navigateBack('G11/aparKing/garages');
          })
          .catch(async (_) => {
            toast.message = `Error al actualizar el garaje, vuelva a intentarlo.`;
            await toast.present();
          });
      } else {
        this.restService
          .getCreateGarage(this.garageForm.value)
          .then(async (response) => {
            this.garageId = response.id;
            if (this.selectedFile) {
              this.uploadImage(toast); // Sube la imagen asociada al garaje
            }
            this.garageStateService.refreshGarages();
            this.navCtr.navigateBack('G11/aparKing/garages');
          })
          .catch(async (_) => {
            toast.message = `Error al crear el garaje, vuelva a intentarlo.`;
            await toast.present();
          });
      }
    } else {
      //TODO - Imprimir mensajes de error en el formulario
      console.log('El formulario de garaje no es válido');
    }
  }
}
