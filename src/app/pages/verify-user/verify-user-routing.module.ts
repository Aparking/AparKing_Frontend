import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerifyUserPage } from './verify-user.page';

const routes: Routes = [
  {
    path: '',
    component: VerifyUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifyUserPageRoutingModule {}
