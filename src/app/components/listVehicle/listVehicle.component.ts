import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Vehicle } from 'src/app/models/authentication';
import { DataManagementService } from 'src/app/service/data-management.service';

@Component({
    selector: 'app-vehicle-list',
    templateUrl: './listVehicle.component.html',
    styleUrls: ['./listVehicle.component.scss'],
})
export class listVehicleComponent implements OnInit {
    vehicle?: Vehicle[] | undefined;
    private vehicleSubscription: Subscription = new Subscription();

    constructor(
        private dataManagement: DataManagementService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.getVehicles();
        this.vehicleSubscription = this.dataManagement.vehicleRegistered.subscribe(() => {
            this.getVehicles();
        });

    }

    ngOnDestroy() {
        if (this.vehicleSubscription) {
            this.vehicleSubscription.unsubscribe();
        }
    }

    async getVehicles() {
        this.dataManagement.getVehicle().then((data: { vehicles: Vehicle[] } | undefined) => {
            if (data && data.vehicles.length > 0) {
                this.vehicle = data.vehicles;
                console.log(this.vehicle)
            }
        }).catch(error => {
            console.error('There was an error!', error);
        });
    }

    async updateVehiculoPrincipal(vehicleId: number) {
        try {
            await this.dataManagement.updateVehiculoPrincipal(vehicleId);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    }

    redirectToRegisterVehicle() {
        this.router.navigate(['/G11/aparKing/tab3/registerVehicle']);
    }
}