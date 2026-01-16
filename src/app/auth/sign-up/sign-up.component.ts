import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { matchPassword } from '../validators/match-password.validator';
import { uniqueUsername } from '../validators/unique-username.validator';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { InputComponent } from "../../Shared/input/input.component";

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, JsonPipe, InputComponent],
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
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/)
    ], [uniqueUsername()]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ]),
    passwordConfirmation: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ])
  }, { validators: [matchPassword]});

}
