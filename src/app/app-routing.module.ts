import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GarageCreateComponent } from './components/garage-create/garage-create.component';
import { GarageDetailComponent } from './components/rental/garage-detail/garage-detail.component';


const routes: Routes = [
  { path: '', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule) },

  {  path: 'garage-create', component: GarageCreateComponent },
  
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
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

