import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {
  @Input() label!: string;
  @Input() control!: FormControl;
  @Input() inputType!: string;

  showErrors(){
    const { dirty, touched, errors} = this.control;
    return dirty && touched && errors;
  }
}
