import { AbstractControl, ValidationErrors } from "@angular/forms";

export function matchPassword(control: AbstractControl): ValidationErrors | null{
    const{ password, passwordConfirmation } = control.value;

    if( password != passwordConfirmation ){
        return {passwordDontMatch: true};
    } else {
        return null;
    }

}