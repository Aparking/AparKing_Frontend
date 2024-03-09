import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {RegisterComponent } from './usuarios/register/register.component';
import {LoginComponent } from './usuarios/login/login.component';
import { LogoutComponent } from './usuarios/logout/logout.component';
import { PricingPlanComponent } from './pricing-plan/pricing-plan.component';
import { AuthChoiceComponent } from './tab2/auth-choice/auth-choice.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {path: 'auth', component: AuthChoiceComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'pricing-plan', component: PricingPlanComponent},

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
