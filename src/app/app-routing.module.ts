import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { parkingCesionComponent } from 'src/app/components/parkingCesion/parkingCesion.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'G11',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/start-page/start-page.module').then(
        (m) => m.StartPagePageModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    path: 'verify-user',
    loadChildren: () =>
      import('./pages/verify-user/verify-user.module').then(
        (m) => m.VerifyUserPageModule
      ),
  },
  { path: 'parking/getParkingCesion', component: parkingCesionComponent, canActivate: [AuthGuard] },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
