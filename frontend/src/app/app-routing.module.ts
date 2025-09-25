import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { GuestGuard } from '@core/guards/guest.guard';
import { environment } from '../environments/environment';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },

  {
    path: 'auth',
    canActivate: [GuestGuard],
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
    data: { title: 'Autenticazione' }
  },

  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
    data: { title: 'Dashboard' }
  },

  {
    path: 'notes',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/notes/notes.module').then(m => m.NotesModule),
    data: { title: 'Note' }
  },

  {
    path: 'folders',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/folders/folders.module').then(m => m.FoldersModule),
    data: { title: 'Cartelle' }
  },

  {
    path: 'search',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/search/search.module').then(m => m.SearchModule),
    data: { title: 'Ricerca' }
  },

  {
    path: 'settings',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/settings/settings.module').then(m => m.SettingsModule),
    data: { title: 'Impostazioni' }
  },

  {
    path: '**',
    redirectTo: '/dashboard'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      enableTracing: false,
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      onSameUrlNavigation: 'reload'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor() {
    if (!environment.production) {
      console.log('Routes configured:', routes.length);
    }
  }
}