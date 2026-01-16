import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { catchError, map, Observable, of } from "rxjs";
// Way to get a validator in old style
@Injectable({providedIn: 'root'})
export class UniqueUsername implements AsyncValidator{
    constructor(private http: HttpClient){}

    validate = ( control: AbstractControl ) : Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
        const value = control.value;

        return this.http.post<any>('https://api.angular-email.com/auth/username',{
            username: value
        }).pipe(
            map((value) => {
                //if(value.available){
                    return null;
                //}
            }),
            catchError((err) => {
                if(err.error.username){
                    return of({ nonUniqueUsername: true });
                } else{
                    return of({ noConnection: true });
                }
            })
        );
    }
}
