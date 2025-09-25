import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material Modules (Solo quelli essenziali per iniziare)
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

// App Routing
import { AppRoutingModule } from './app-routing.module';

// Main App Component
import { AppComponent } from './app.component';

// Environment
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
    // NOTA: Non dichiarare altri componenti qui se usi lazy loading
    // I componenti verranno dichiarati nei loro rispettivi feature modules
  ],
  imports: [
    // Angular Core Modules
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    
    // Angular Material Modules (essenziali)
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatDialogModule,
    MatTabsModule,
    MatChipsModule,
    MatTooltipModule,
    MatBadgeModule,
    MatSlideToggleModule,
    
    // App Routing (DEVE essere ultimo nell'array imports)
    AppRoutingModule
  ],
  providers: [
    // API Configuration
    {
      provide: 'API_URL',
      useValue: environment.apiUrl
    },
    {
      provide: 'WS_URL', 
      useValue: environment.wsUrl
    }
    
    // NOTA: Services, Guards e Interceptors verranno aggiunti 
    // quando creerai i rispettivi file
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor() {
    if (!environment.production) {
      console.log('🚀 Notes Sharing App initialized');
      console.log('🌍 Environment:', environment.production ? 'production' : 'development');
      console.log('🔗 API URL:', environment.apiUrl);
    }
  }
}

/*
=================================================================
📋 STEP-BY-STEP: Come espandere questo module progressivamente
=================================================================

1. PRIMA crea i servizi base:
   ng generate service core/services/auth
   ng generate service core/services/note
   ng generate service core/services/loading
   ng generate service core/services/notification

2. Poi crea i guards:
   ng generate guard core/guards/auth
   ng generate guard core/guards/guest

3. Crea gli interceptors:
   ng generate interceptor core/interceptors/auth
   ng generate interceptor core/interceptors/error
   ng generate interceptor core/interceptors/loading

4. Crea i feature modules:
   ng generate module features/auth --routing
   ng generate module features/dashboard --routing
   ng generate module features/notes --routing

5. Crea i componenti layout:
   ng generate component layout/header
   ng generate component layout/sidebar  
   ng generate component layout/footer

6. POI aggiungi gradualmente al app.module.ts:

// Step 1: Aggiungi servizi
providers: [
  AuthService,
  LoadingService,
  NotificationService,
  // ... altri servizi
]

// Step 2: Aggiungi interceptors  
providers: [
  // ... servizi esistenti
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor, 
    multi: true
  }
]

// Step 3: Se non usi lazy loading, aggiungi i moduli
imports: [
  // ... imports esistenti
  AuthModule,
  DashboardModule,
  NotesModule
]

=================================================================
🎯 VERSIONE COMPLETA (da usare SOLO dopo aver creato tutti i file)
=================================================================

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { LayoutModule } from './layout/layout.module';

@NgModule({
  imports: [
    // ... existing imports
    CoreModule,       // Servizi singleton, guards, interceptors
    SharedModule,     // Componenti condivisi, pipes, direttive
    LayoutModule,     // Header, sidebar, footer
    AppRoutingModule  // SEMPRE ultimo
  ]
})

=================================================================
🔧 COMANDI UTILI per creare la struttura
=================================================================

# Crea la struttura base
mkdir -p src/app/core/{services,guards,interceptors,models}
mkdir -p src/app/shared/{components,pipes,directives}
mkdir -p src/app/features/{auth,dashboard,notes,search,settings}
mkdir -p src/app/layout

# Genera i file essenziali
ng generate service core/services/auth
ng generate service core/services/note
ng generate service core/services/loading
ng generate service core/services/notification
ng generate guard core/guards/auth
ng generate guard core/guards/guest

# Genera i moduli feature
ng generate module features/auth --routing
ng generate module features/dashboard --routing
ng generate module features/notes --routing

# Genera i componenti layout
ng generate component layout/header --skip-tests
ng generate component layout/sidebar --skip-tests
ng generate component layout/footer --skip-tests

=================================================================
*/