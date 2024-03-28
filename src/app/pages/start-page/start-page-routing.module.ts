import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StartPagePage } from './start-page.page';

const routes: Routes = [
  {
    path: '',
    component: StartPagePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StartPagePageRoutingModule {}
