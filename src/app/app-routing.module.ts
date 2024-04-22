import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NeedAuthGuard } from './guards/need-auth.guard';

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
    canActivate: [NeedAuthGuard],
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
    path: 'registerVehicle',
    loadChildren: () =>
      import('./pages/registerVehicle/registerVehicle.module').then(
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
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
