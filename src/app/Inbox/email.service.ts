import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

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

}
