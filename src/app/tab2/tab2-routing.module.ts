import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthChoiceComponent } from './auth-choice/auth-choice.component'; // Importa tu nueva página aquí

const routes: Routes = [
  {
    path: '',
    component: AuthChoiceComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab2PageRoutingModule {}
