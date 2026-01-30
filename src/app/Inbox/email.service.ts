import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { from } from 'rxjs';
import { Email } from './email';

interface EmailSummary{
  id: string
  subject: string
  from: string
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  rootUrl = 'https://api.angular-email.com'
  constructor() { }

  http = inject(HttpClient);

  getEmails(){
    return this.http.get<EmailSummary[]>(`${this.rootUrl}/emails`);
  }

  getEmail(id: string){
    return this.http.get<Email>(`${this.rootUrl}/emails/${id}`)
  }

}
