import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent {
  @Input() message: string = '';
  @Input() field!: AbstractControl;
  @Input() error: string = '';

  constructor() {}

  shouldShowError(): boolean {
    let res: boolean = false;
    if (this.field?.touched && this.field.errors?.[this.error]) {
      res = true;
    }
    return res;
  }
}
