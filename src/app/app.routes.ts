import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'cards', 
    pathMatch: 'full' 
  },
  { 
    path: 'cards', 
    loadComponent: () => import('./components/card-list/card-list').then(c => c.CardListComponent)
  },
  { 
    path: 'cards/new', 
    loadComponent: () => import('./components/card-form/card-form').then(c => c.CardFormComponent)
  },
  { 
    path: 'cards/:id/edit', 
    loadComponent: () => import('./components/card-form/card-form').then(c => c.CardFormComponent)
  },
  { 
    path: '**', 
    redirectTo: 'cards' 
  }
];