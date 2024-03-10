import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-garage-detail',
  templateUrl: './garage-detail.component.html',
  styleUrls: ['./garage-detail.component.scss'],
})
export class GarageDetailComponent implements OnInit {
  constructor(
    private restService: RestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  MEDIA_BASE_ULR = 'http://127.0.0.1:8000';
  garageId: string = '';
  currentGarage?: any;
  currentGarageImages: any[] = [];

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      if (id) this.garageId = id;
      else {
        console.error('No id provided');
        this.router.navigate([`/garages/${this.garageId}`]);
      }
    });
    this.retrieveGarage();
  }

  retrieveGarage() {
    this.restService
      .getGarageById(this.garageId)
      .then((garage) => {
        this.currentGarage = garage;
      })
      .catch((error) => {
        console.error(error);
        this.router.navigate([`/garages/${this.garageId}`]);
      });

    this.restService.getImageByGarageId(this.garageId).then((images) => {
      this.currentGarageImages = images;
    });
  }

  toggleGarageStatus() {
    if (this.currentGarage) {
      this.currentGarage.is_active = !this.currentGarage.is_active;
      this.restService
        .updateGarage(this.garageId, this.currentGarage)
        .then(() => {
          this.retrieveGarage();
        })
        .catch((error) => {
          console.error(error);
          this.router.navigate([`/garages/${this.garageId}`]);
        });
    }
  }
}
