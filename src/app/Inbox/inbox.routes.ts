import { Routes } from "@angular/router";
import { EmailResolverService } from "./email-resolver.service";

export const inboxRoutes: Routes = [
    {
        path: '',
        loadComponent: () => 
        import('./home/home.component')
        .then(c => c.HomeComponent),
        children: [
            {
                path: 'not-found',
                loadComponent: () =>
                import('./not-found/not-found.component')
                .then(c => c.NotFoundComponent)
            },
            {
                path: ':id',
                loadComponent: () =>
                import('./email-show/email-show.component')
                .then(c => c.EmailShowComponent),
                resolve: {
                    email: EmailResolverService
                }
            },
            {
                path: '',
                loadComponent: () => 
                import('./placeholder/placeholder.component')
                .then(c => c.PlaceholderComponent)
            },
        ]
    }
]