import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { InputComponent } from "../../Shared/input/input.component";
import { AuthService } from '../auth.service';
import { NgIf } from "@angular/common";
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule, InputComponent, NgIf],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  authForm = new FormGroup({
    username: new FormControl('',{
      nonNullable: true,
      validators: [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/)
      ]
    }),
    password: new FormControl('',{
      nonNullable: true,
      validators: [Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
      ]
    })
  });

  authService = inject(AuthService);
  router = inject(Router);
  
  onSubmit(){
    if(this.authForm.invalid){
      return;
    }

    this.authService.signin(this.authForm.getRawValue()).subscribe({
      next: () => {
        this.router.navigateByUrl('/inbox');
      },
      error: ({error}) => {
        if(error.username || error.password){
          this.authForm.setErrors({credentials: true});
        }
      }
    })
  }
}
