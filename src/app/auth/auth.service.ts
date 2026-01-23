import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

interface SignupCredentials {
  username: string,
  password: string;
  passwordConfirmation: string;
}

interface SignupResponse{
  username: string;
}

interface SignedinResponse{
  authenticated: boolean;
  username: string;
}

interface SigninCredentials{
  username: string,
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //constructor(private http: HttpClient) { }
  http = inject(HttpClient);

  rootUrl = 'https://api.angular-email.com';
  signedin$ = new BehaviorSubject(false); 

  usernameAvailable(username:string){
    return this.http.post<{ available: boolean }>(`${this.rootUrl}/auth/username`,{
      username: username
    });
  }

  signup( credentials: SignupCredentials ){
    return this.http.post<SignupResponse>(`${this.rootUrl}/auth/signup`,
      credentials
    ).pipe(
      tap(() => {
        this.signedin$.next(true);
      })
    );
  }

  checkAuth(){
    return this.http.get<SignedinResponse>(`${this.rootUrl}/auth/signedin`).pipe(
      tap(({authenticated}) => {
        this.signedin$.next(authenticated);
      })
    );
  }

  signin(credentials: SigninCredentials) {
    return this.http.post(`${this.rootUrl}/auth/signin`, credentials).pipe(
      tap(() => {
        this.signedin$.next(true);
      })
    )
  }

  signout(){
    return this.http.post(`${this.rootUrl}/auth/signout`,{}).pipe(
      tap(() => {
        this.signedin$.next(false);
      })
    )
  }
}
