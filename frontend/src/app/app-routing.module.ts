import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { GuestGuard } from '@core/guards/guest.guard';

const routes: Routes = [
  // Root redirect
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },

  // Authentication routes (solo per utenti non autenticati)
  {
    path: 'auth',
    canActivate: [GuestGuard],
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
    data: { 
      title: 'Autenticazione',
      description: 'Login e registrazione utente'
    }
  },

  // Dashboard (richiede autenticazione)
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
    data: { 
      title: 'Dashboard',
      description: 'Panoramica note e statistiche',
      breadcrumb: 'Dashboard'
    }
  },

  // Gestione Note (richiede autenticazione)
  {
    path: 'notes',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/notes/notes.module').then(m => m.NotesModule),
    data: { 
      title: 'Note',
      description: 'Gestione delle note',
      breadcrumb: 'Note'
    }
  },

  // Cartelle (richiede autenticazione)
  {
    path: 'folders',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/folders/folders.module').then(m => m.FoldersModule),
    data: { 
      title: 'Cartelle',
      description: 'Organizzazione in cartelle',
      breadcrumb: 'Cartelle'
    }
  },

  // Ricerca (richiede autenticazione)
  {
    path: 'search',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/search/search.module').then(m => m.SearchModule),
    data: { 
      title: 'Ricerca',
      description: 'Ricerca note e contenuti',
      breadcrumb: 'Ricerca'
    }
  },

  // Collaborazione (richiede autenticazione)
  {
    path: 'collaboration',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/collaboration/collaboration.module').then(m => m.CollaborationModule),
    data: { 
      title: 'Collaborazione',
      description: 'Note condivise e collaborazioni',
      breadcrumb: 'Collaborazione'
    }
  },

  // Impostazioni profilo (richiede autenticazione)
  {
    path: 'settings',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/settings/settings.module').then(m => m.SettingsModule),
    data: { 
      title: 'Impostazioni',
      description: 'Configurazione account e preferenze',
      breadcrumb: 'Impostazioni'
    }
  },

  // Aiuto e documentazione (pubblico)
  {
    path: 'help',
    loadChildren: () => import('./features/help/help.module').then(m => m.HelpModule),
    data: { 
      title: 'Aiuto',
      description: 'Documentazione e supporto',
      breadcrumb: 'Aiuto'
    }
  },

  // Pagina di errore 404
  {
    path: '404',
    loadChildren: () => import('./features/error/error.module').then(m => m.ErrorModule),
    data: { 
      title: 'Pagina non trovata',
      description: 'La pagina richiesta non esiste'
    }
  },

  // Pagina di accesso negato
  {
    path: 'access-denied',
    loadChildren: () => import('./features/error/error.module').then(m => m.ErrorModule),
    data: { 
      title: 'Accesso negato',
      description: 'Non hai i permessi per accedere a questa risorsa'
    }
  },

  // Pagina di manutenzione
  {
    path: 'maintenance',
    loadChildren: () => import('./features/maintenance/maintenance.module').then(m => m.MaintenanceModule),
    data: { 
      title: 'Manutenzione',
      description: 'Il servizio è temporaneamente non disponibile'
    }
  },

  // Route di fallback - deve essere sempre l'ultima
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // Strategia di preload per migliorare le performance
      preloadingStrategy: PreloadAllModules,
      
      // Abilita il tracing per debug (disabilitare in produzione)
      enableTracing: false,
      
      // Configurazione scroll behavior
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      scrollOffset: [0, 64], // Offset per header fisso
      
      // Configurazione per il routing
      onSameUrlNavigation: 'reload',
      urlUpdateStrategy: 'eager',
      
      // Configurazione per Angular Universal (SSR) se necessario
      initialNavigation: 'enabledBlocking',
      
      // Configurazione per il router outlet
      relativeLinkResolution: 'legacy',
      
      // Configurazione per l'hash routing (se necessario)
      useHash: false,
      
      // Configurazione per il parsing delle query params
      paramsInheritanceStrategy: 'emptyOnly',
      
      // Configurazione per la gestione degli errori
      errorHandler: (error: any) => {
        console.error('Router Error:', error);
        // Puoi aggiungere qui logica per tracking errori
      },
      
      // Configurazione per il resolver dei dati
      resolverProviders: []
    })
  ],
  exports: [RouterModule],
  providers: [
    // Providers aggiuntivi per il routing se necessari
  ]
})
export class AppRoutingModule { 

  constructor() {
    // Log delle route configurate in development
    if (!environment.production) {
      console.log('Routes configured:', routes.length);
      routes.forEach(route => {
        if (route.path !== '**') {
          console.log(`Route: ${route.path} | Title: ${route.data?.['title'] || 'N/A'}`);
        }
      });
    }
  }