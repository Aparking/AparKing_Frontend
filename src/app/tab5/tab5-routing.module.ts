import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubscriptionComponent } from '../components/subscription/subscription.component';
import { Tab5Page } from './tab5.page';

const routes: Routes = [
  {
    path: '',
    component: Tab5Page,
  },
  {
    path: 'api/subscriptions',
    component: SubscriptionComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab5PageRoutingModule { }
