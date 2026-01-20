import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'signup',
        loadComponent: () =>
        import('./auth/sign-up/sign-up.component')
        .then(c => c.SignUpComponent)
    },
    {
        path: 'signout',
        loadComponent: () => 
        import('./auth/sign-out/sign-out.component')
        .then(c => c.SignOutComponent)
    },
    {
        path: '',
        loadComponent: () => 
        import('./auth/sign-in/sign-in.component')
        .then(c => c.SignInComponent)
    }
    
];
