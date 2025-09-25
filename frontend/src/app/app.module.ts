import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material Modules
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
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

// App Routing
import { AppRoutingModule } from './app-routing.module';

// Main App Component
import { AppComponent } from './app.component';

// Core Module (Services, Guards, Interceptors)
import { CoreModule } from './core/core.module';

// Shared Module (Common Components, Pipes, Directives)
import { SharedModule } from './shared/shared.module';

// Layout Module (Header, Sidebar, Footer)
import { LayoutModule } from './layout/layout.module';

// Core Services
import { AuthService } from './core/services/auth.service';
import { NoteService } from './core/services/note.service';
import { ConflictService } from './core/services/conflict.service';
import { SearchService } from './core/services/search.service';
import { WebSocketService } from './core/services/websocket.service';
import { LoadingService } from './core/services/loading.service';
import { NotificationService } from './core/services/notification.service';
import { VersionService } from './core/services/version.service';
import { FolderService } from './core/services/folder.service';

// Guards
import { AuthGuard } from './core/guards/auth.guard';
import { GuestGuard } from './core/guards/guest.guard';

// Interceptors
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';

// Feature Components (se non lazy-loaded)
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    // Note: Feature components will be declared in their respective modules
    // if using lazy loading. Include here only if not using lazy loading.
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    // Angular Core Modules
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    
    // Angular Material Modules
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
    MatAutocompleteModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatBadgeModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    
    // App Modules
    AppRoutingModule, // Must be last in imports array
    CoreModule,       // Singleton services and providers
    SharedModule,     // Shared components, pipes, directives
    LayoutModule      // Layout components
  ],
  providers: [
    // Core Services (if not provided in CoreModule)
    AuthService,
    NoteService,
    ConflictService,
    SearchService,
    WebSocketService,
    LoadingService,
    NotificationService,
    VersionService,
    FolderService,
    
    // Guards
    AuthGuard,
    GuestGuard,
    
    // HTTP Interceptors
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    },
    
    // Additional Providers
    {
      provide: 'API_URL',
      useValue: 'http://localhost:8080/api'
    },
    {
      provide: 'WS_URL', 
      useValue: 'ws://localhost:8080'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor() {
    console.log('Notes Sharing App initialized');
  }
}