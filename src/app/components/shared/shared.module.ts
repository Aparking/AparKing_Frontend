import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ErrorMessageComponent } from '../error-message/error-message.component';

@NgModule({
  declarations: [ErrorMessageComponent],
  imports: [CommonModule, IonicModule.forRoot()],
  exports: [ErrorMessageComponent],
})
export class SharedModule {}
