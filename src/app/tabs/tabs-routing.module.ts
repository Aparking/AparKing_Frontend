import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { parkingCesionComponent } from '../components/parkingCesion/parkingCesion.component';
import { AuthGuard } from '../guards/auth.guard';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'aparKing',
    component: TabsPage,
    children: [
      {
        path: 'map',
        loadChildren: () =>
          import('../tab1/tab1.module').then((m) => m.Tab1PageModule),
      },
      {
        path: 'list-parking-cesion', component: parkingCesionComponent, canActivate: [AuthGuard],
        loadChildren: () =>
          import('../tab2/tab2.module').then((m) => m.Tab2PageModule),
      },
      {
        path: 'tab3',
        loadChildren: () =>
          import('../tab3/tab3.module').then((m) => m.Tab3PageModule),
      },
      {
        path: '',
        redirectTo: '/G11/aparKing/map',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/G11/aparKing/map',
    pathMatch: 'full',
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
