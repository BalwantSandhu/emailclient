import { Component } from '@angular/core';
import { EmailIndexComponent } from '../email-index/email-index.component';
import { RouterOutlet } from '@angular/router';
import { ModalComponent } from '../../Shared/modal/modal.component';
import { EmailCreateComponent } from '../email-create/email-create.component';

@Component({
  selector: 'app-home',
  imports: [EmailIndexComponent, RouterOutlet, ModalComponent, EmailCreateComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
