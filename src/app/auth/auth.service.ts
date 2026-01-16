import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //constructor(private http: HttpClient) { }
  http = inject(HttpClient);

  usernameAvailable(username:string){
    return this.http.post<{ available: boolean }>('https://api.angular-email.com/auth/username',{
      username: username
    });
  }
}
