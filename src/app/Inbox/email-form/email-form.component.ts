import { Component, Input } from '@angular/core';
import { Email } from '../email';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { InputComponent } from "../../Shared/input/input.component";

@Component({
  selector: 'app-email-form',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './email-form.component.html',
  styleUrl: './email-form.component.css'
})
export class EmailFormComponent {
  emailForm!: FormGroup<{
    to: FormControl<string | null>;
    from: FormControl<string | null>;
    subject: FormControl<string | null>;
    text: FormControl<string | null>;
  }>;
  @Input() email!: Email;

  ngOnInit() {
    const{ subject, from, to, text } = this.email;
    this.emailForm = new FormGroup({
      to: new FormControl(to,[Validators.required,Validators.email]),
      from : new FormControl({value: from, disabled: true}),
      subject: new FormControl(subject, [Validators.required]),
      text: new FormControl(text, [Validators.required])
    });
  }

}
