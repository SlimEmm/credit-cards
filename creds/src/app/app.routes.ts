import { Routes } from '@angular/router';

export const routes: Routes = [
    {
    path: 'home',
    pathMatch: 'full',
    loadComponent: () =>
      import('./home/home.component').then((d) => d.HomeComponent),
  },
  {
    path: 'about',
    pathMatch: 'full',
    loadComponent: () =>
      import('./about/about.component').then((d) => d.AboutComponent),
  },
  {
    path: 'contact',
    pathMatch: 'full',
    loadComponent: () =>
      import('./contact/contact.component').then((d) => d.ContactComponent),
  },
  {
    path: 'disclaimer',
    pathMatch: 'full',
    loadComponent: () =>
      import('./disclaimer/disclaimer.component').then(
        (d) => d.DisclaimerComponent
      ),
  },
  {
    path: 'privacy-policy',
    pathMatch: 'full',
    loadComponent: () =>
      import('./privacy-policy/privacy-policy.component').then(
        (d) => d.PrivacyPolicyComponent
      ),
  },
  {
    path: 'credit-cards',
    pathMatch: 'full',
    loadComponent: () =>
      import('./credit-cards/credit-cards.component').then((d) => d.CreditCardsComponent),
  },
  {
    path: 'credit-cards/:id',
    pathMatch: 'full',
    loadComponent: () =>
      import('./credit-cards/credit-cards.component').then((d) => d.CreditCardsComponent),
  },
  {
    path: 'hostings',
    pathMatch: 'full',
    loadComponent: () =>
      import('./hostings/hostings.component').then((d) => d.HostingsComponent),
  },
  {
    path: 'banks',
    pathMatch: 'full',
    loadComponent: () =>
      import('./banks/banks.component').then((d) => d.BanksComponent),
  },
   {
    path: 'banks/:id',
    pathMatch: 'full',
    loadComponent: () =>
      import('./banks/banks.component').then((d) => d.BanksComponent),
  },
  {
    path: '', // Default route (optional)
    redirectTo: 'home',
    pathMatch: 'full',
  },
  { path: '**', redirectTo: 'home' },
];
