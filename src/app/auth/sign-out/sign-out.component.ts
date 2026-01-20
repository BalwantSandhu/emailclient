import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-sign-out',
  imports: [],
  templateUrl: './sign-out.component.html',
  styleUrl: './sign-out.component.css'
})
export class SignOutComponent {
  constructor(private authService: AuthService, private router: Router){}

  ngOnInit(){
    this.authService.signout().subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }
}
