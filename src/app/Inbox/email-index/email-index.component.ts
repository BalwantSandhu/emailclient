import { Component } from '@angular/core';
import { EmailService } from '../email.service';
import { NgForOf } from "@angular/common";
import { RouterLink, RouterLinkActive } from "@angular/router";

interface EmailSummary{
  id: string
  subject: string
  from: string
}

@Component({
  selector: 'app-email-index',
  imports: [NgForOf, RouterLink, RouterLinkActive],
  templateUrl: './email-index.component.html',
  styleUrl: './email-index.component.css'
})
export class EmailIndexComponent {
  emails:EmailSummary[] = [];

  constructor(private emailService: EmailService){}

  ngOnInit(){
    this.emailService.getEmails()
      .subscribe((emails) => {
        this.emails = emails;
      });
  }
}
