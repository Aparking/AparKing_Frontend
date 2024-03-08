import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GarageDetailComponent } from './components/rental/garage-detail/garage-detail.component';
import { GarageListComponent } from './components/rental/garage-list/garage-list.component';
import { IonicModule } from '@ionic/angular'; 
import { CommonModule } from '@angular/common'; 


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },

];
@NgModule({
  imports: [
    IonicModule, CommonModule, 
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
