import { Component } from '@angular/core';
import { ModalComponent } from '../../Shared/modal/modal.component';
import { NgIf } from "@angular/common";
import { EmailFormComponent } from "../email-form/email-form.component";
import { Email } from '../email';

@Component({
  selector: 'app-email-create',
  imports: [ModalComponent, NgIf, EmailFormComponent],
  templateUrl: './email-create.component.html',
  styleUrl: './email-create.component.css'
})
export class EmailCreateComponent {
  showModal = false;
  email: Email;

  constructor(){
    this.email = {
      id: '',
      to: '',
      subject: '',
      html: '',
      text: '',
      from: ''
    }
  }
}
