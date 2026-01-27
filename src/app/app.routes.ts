import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

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
        path: 'inbox',
        canLoad: [authGuard],
        loadChildren: () =>
        import('./Inbox/inbox.routes')
        .then(c => c.inboxRoutes)
    },
    {
        path: '',
        loadComponent: () => 
        import('./auth/sign-in/sign-in.component')
        .then(c => c.SignInComponent)
    }
    
];
