import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ValidationService } from './services/validation.service';


@Component({
  selector: 'control-messages',
  template: `<div *ngIf="errorMessage !== null"><span class="label label-danger">{{errorMessage}}</span></div>`
})
export class ControlMessages {
  
  @Input() control: FormControl;
  constructor() { }

  get errorMessage(): string {

    // console.log(this.control.errors);
    
    for (let propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName)) {// && this.control.touched) {
        return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }
    
    return null;
  }
}