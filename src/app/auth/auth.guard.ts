import { CanMatchFn, Router } from '@angular/router';
import { filter, Observable, skipWhile, take, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanMatchFn = () => {
  let authService = inject(AuthService);
  let router = inject(Router);
  
  return  authService.signedin$.pipe(
    filter((value): value is boolean => value !== null),
    take(1),
    tap((authenticated) => {
      if(!authenticated){
        router.navigateByUrl('/');
      }
    })
  );
};
