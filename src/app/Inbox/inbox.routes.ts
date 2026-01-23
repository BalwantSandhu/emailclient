import { Routes } from "@angular/router";

export const inboxRoutes: Routes = [
    {
        path: '',
        loadComponent: () => 
        import('./home/home.component')
        .then(c => c.HomeComponent)
    }
]