import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { parkingCesionComponent } from 'src/app/components/parkingCesion/parkingCesion.component';
import { SubscriptionComponent } from 'src/app/components/subscription/subscription.component';
import { AuthGuard } from './guards/auth.guard';
import { NeedAuthGuard } from './guards/need-auth.guard';

const routes: Routes = [
  {
    path: 'G11',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  { path: 'api/subscriptions', component: SubscriptionComponent, canActivate: [AuthGuard] },
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
    path: 'verify-user',
    loadChildren: () =>
      import('./pages/verify-user/verify-user.module').then(
        (m) => m.VerifyUserPageModule
      ),
  },
  {
    path: 'about-us',
    loadChildren: () =>
      import('./pages/about-us/about-us-page.module').then(
        (m) => m.AboutUsPageModule
      ),
  },
  {
    path: 'terms-and-conditions',
    loadChildren: () =>
      import('./pages/terms-and-conditions/terms-and-conditions-page.module').then(
        (m) => m.TermsAndConditionsPageModule
      ),
  },
  { path: 'G11/aparKing/list-parking-cesion', component: parkingCesionComponent, canActivate: [AuthGuard] },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
