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

  garageId: string = '';
  currentGarage?: any;

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      if (id) this.garageId = id;
      else {
        console.error('No id provided');
        this.router.navigate(['']);
      }
    });
    this.retrieveGarage();
  }

  retrieveGarage() {
    this.restService
      .getGarageById(this.garageId)
      .then((garage) => {
        this.currentGarage = garage;
        console.log(garage);
      })
      .catch((error) => {
        console.error(error);
        this.router.navigate(['']);
      });
  }

  toggleGarageStatus() {
    if (this.currentGarage) {
      this.currentGarage.is_active = !this.currentGarage.is_active;
      this.restService
        .updateGarage(this.garageId, this.currentGarage)
        .then((garage) => {
          this.currentGarage = garage;
        })
        .catch((error) => {
          console.error(error);
          this.router.navigate([`/garages/${this.garageId}`]);
        });
    }
  }
}
