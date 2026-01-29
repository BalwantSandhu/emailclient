import { Routes } from "@angular/router";

export const inboxRoutes: Routes = [
    {
        path: '',
        loadComponent: () => 
        import('./home/home.component')
        .then(c => c.HomeComponent),
        children: [
            {
                path: ':id',
                loadComponent: () =>
                import('./email-show/email-show.component')
                .then(c => c.EmailShowComponent)
            },
            {
                path: '',
                loadComponent: () => 
                import('./placeholder/placeholder.component')
                .then(c => c.PlaceholderComponent)
            }
        ]
    }
]