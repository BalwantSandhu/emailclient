import { AbstractControl, ValidationErrors, Validator } from "@angular/forms";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class MatchPassword implements Validator{
    validate(control: AbstractControl): ValidationErrors | null{//if we don't know which one to use formGroup or formControl we can use cotrol: AbstractControl
        const {password, passwordConfirmation} = control.value;
        if(password != passwordConfirmation){
            return { passwordDontMatch: true};
        } else {
            return null;
        }
    }
}
