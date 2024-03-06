import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GarageDetailComponent } from './components/rental/garage-detail/garage-detail.component';
import { GarageListComponent } from './components/rental/garage-list/garage-list.component';
import { IonicModule } from '@ionic/angular'; 


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'garages', component: GarageListComponent },
  { path: 'garages/:id', component: GarageDetailComponent },
];
@NgModule({
  imports: [
    IonicModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
