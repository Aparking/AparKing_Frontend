// subscription.module.ts (o el nombre de tu módulo de característica)
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SubscriptionComponent } from 'src/app/components/subscription/subscription.component';
@NgModule({
    declarations: [SubscriptionComponent],
    imports: [
        CommonModule,
        IonicModule.forRoot(),
        IonicModule
    ],
    exports: [SubscriptionComponent]
})
export class SubscriptionModule { }
