import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GarageCreateComponent } from './components/rental/garage-create/garage-create.component';
import { GarageDetailComponent } from './components/rental/garage-detail/garage-detail.component';
import { GarageCreateImageComponent } from './components/rental/garage-create-image/garage-create-image.component';


const routes: Routes = [
  { path: '', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule) },

  {  path: 'garage-create', component: GarageCreateComponent },
  {  path: 'garage-create-image', component: GarageCreateImageComponent },

  { path: 'garages/:id', component: GarageDetailComponent },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { 
      preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

