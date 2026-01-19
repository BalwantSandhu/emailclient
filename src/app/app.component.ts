import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { NgIf } from "@angular/common";
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLinkWithHref, RouterLinkActive, NgIf, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  signedin$: BehaviorSubject<boolean>;

  constructor(private authService: AuthService){
    this.signedin$ = this.authService.signedin$;
  }

  ngOnInit(){
    this.authService.checkAuth().subscribe(() => {});
  }

  // ngOnInit(){
  //   this.authService.signedin$.subscribe((signedin) => {
  //     this.signedin = signedin;
  //   })
  // }
}
