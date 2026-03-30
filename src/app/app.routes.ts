import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'cards', 
    pathMatch: 'full' 
  },
  { 
    path: 'cards', 
    loadComponent: () => import('./components/card-list/card-list').then(c => c.CardList)
  },
  { 
    path: 'cards/new', 
    loadComponent: () => import('./components/card-form/card-form').then(c => c.CardForm)
  },
  { 
    path: 'cards/:id/edit', 
    loadComponent: () => import('./components/card-form/card-form').then(c => c.CardForm)
  },
  { 
    path: '**', 
    redirectTo: 'cards' 
  }
];