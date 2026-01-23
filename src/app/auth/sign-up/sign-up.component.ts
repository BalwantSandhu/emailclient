import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe, NgIf } from '@angular/common';
import { matchPassword } from '../validators/match-password.validator';
import { uniqueUsername } from '../validators/unique-username.validator';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { InputComponent } from "../../Shared/input/input.component";
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, JsonPipe, InputComponent, NgIf],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  // Version 1 with DI for http client
  // authForm: FormGroup;

  // constructor(private http: HttpClient){
  //   this.authForm = new FormGroup({
  //   username: new FormControl('', [
  //     Validators.required,
  //     Validators.minLength(3),
  //     Validators.maxLength(20),
  //     Validators.pattern(/^[a-z0-9]+$/)
  //   ], [uniqueUsername(this.http)]),
  //   password: new FormControl('', [
  //     Validators.required,
  //     Validators.minLength(4),
  //     Validators.maxLength(20)
  //   ]),
  //   passwordConfirmation: new FormControl('', [
  //     Validators.required,
  //     Validators.minLength(4),
  //     Validators.maxLength(20)
  //   ])
  // }, { validators: [matchPassword]});
  // }

  // Version 2 without DI
  authForm = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/)
      ], 
      asyncValidators: [uniqueUsername()]}),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ]}),
    passwordConfirmation: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ]})
  }, { validators: [matchPassword]});

  authService = inject(AuthService);
  router = inject(Router);

  onSubmit(){
    if(this.authForm.invalid){
      return;
    }

    this.authService.signup(this.authForm.getRawValue())
      .subscribe({
        next: (response) => {
          // Navigate to other route
          this.router.navigateByUrl('/inbox');
          //console.log(response);
        },
        error: (err) => {
          if(!err.status){
            this.authForm.setErrors({noConnection: true});
          } else{
            this.authForm.setErrors({unknownError: true});
          }
        }
      });

  }

}
