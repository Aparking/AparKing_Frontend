import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { RestService } from "src/app/services/rest.service";

@Component({
        selector: 'app-garage-detail',
        templateUrl: './garage-detail.component.html',
        styleUrls: ['./garage-detail.component.scss'],
    })
export class GarageDetailComponent implements OnInit {
    constructor(
        private restService: RestService,
        private route: ActivatedRoute
    ) {}
        
    garageId: string = '';
    
    ngOnInit() {
        this.route.paramMap.subscribe((params: ParamMap) => {
            let id = params.get('id');
            if (id) {
                this.garageId = id;
            } else {
                console.error('No se encontró el id del garaje');
            }
        });
        this.retrieveGarage();
    }

    retrieveGarage() {
        this.restService.getGarageById(this.garageId).then((garage) => {
            console.log(garage);
        });
    }
}
