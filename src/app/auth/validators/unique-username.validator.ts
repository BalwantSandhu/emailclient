import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, FormControl, ValidationErrors } from "@angular/forms";
import { catchError, map, Observable, of } from "rxjs";
import { AuthService } from "../auth.service";

// Version one with DI
// export function uniqueUsername(http: HttpClient): (control: AbstractControl) => Observable<ValidationErrors | null>{
//     //return http.post<any>('https://api.angular-email.com/auth/username', {username: value} )
//     return (control: AbstractControl) => {
//         const value = control.value;

//         if(!value){
//             return of(null);
//         }

//         return http.post<any>(
//             'https://api.angular-email.com/auth/username',
//              {username: value}).pipe(
//                 map(() => {
//                     return null;
//                 }),
//                 catchError((err) => {
//                     if(err.error.username){
//                         return of({ nonUniqueUsername: true});
//                     }
//                     return of({ noConnection: true });
//                 })
//              )
//     } 
// }

// Version 2 without DI
export function uniqueUsername(): AsyncValidatorFn {
  const http = inject(HttpClient);
  const authservice = inject(AuthService);

  return (control: AbstractControl) => {
    const value = control.value;

    if (!value) {
      return of(null);
    }

    return authservice.usernameAvailable(value)
      .pipe(
        map(() => {
            return null;
        }),
        catchError((err) => {
            if(err.error.username){
                return of({ nonUniqueUsername: true});
            }
            return of({ noConnection: true });
        })
      );
  };
}