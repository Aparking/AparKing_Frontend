// subscription.module.ts (o el nombre de tu módulo de característica)
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SubscriptionComponent } from 'src/app/components/subscription/subscription.component';

@NgModule({
    declarations: [SubscriptionComponent],
    imports: [CommonModule],
    exports: [SubscriptionComponent]
})
export class SubscriptionModule { }
