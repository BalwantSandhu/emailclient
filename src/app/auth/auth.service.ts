import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

interface SignupCredentials {
  username: string,
  password: string;
  passwordConfirmation: string;
}

interface SignupResponse{
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //constructor(private http: HttpClient) { }
  http = inject(HttpClient);

  rootUrl = 'https://api.angular-email.com';

  usernameAvailable(username:string){
    return this.http.post<{ available: boolean }>(`${this.rootUrl}/auth/username`,{
      username: username
    });
  }

  signup( credentials: SignupCredentials ){
    return this.http.post<SignupResponse>(`${this.rootUrl}/auth/signup`,
      credentials
    );
  }
}
