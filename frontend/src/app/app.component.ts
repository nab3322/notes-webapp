import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Notes Sharing App';
  appName = environment.appName;
  appVersion = environment.version;
  currentYear = new Date().getFullYear();
  
  // Loading States
  private loadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.loadingSubject.asObservable();
  
  private pageLoadingSubject = new BehaviorSubject<boolean>(false);
  pageLoading$ = this.pageLoadingSubject.asObservable();
  
  // Authentication State (mock per ora)
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  
  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();
  
  // UI State
  sidebarOpen = false;
  currentRoute = '';
  currentPageTitle = 'Dashboard';
  
  // Mobile Detection
  isMobile$: Observable<boolean>;
  
  // Mock data per sviluppo
  unreadNotifications$ = new BehaviorSubject<number>(0);
  folderTree$ = new BehaviorSubject<any[]>([]);
  recentNotes$ = new BehaviorSubject<any[]>([]);
  breadcrumbs$ = new BehaviorSubject<any[]>([]);
  connectionStatus$ = new BehaviorSubject<any>(null);
  activeCollaborators$ = new BehaviorSubject<any[]>([]);
  updateAvailable$ = new BehaviorSubject<boolean>(false);
  isOffline$ = new BehaviorSubject<boolean>(false);
  showGlobalFab$ = new BehaviorSubject<boolean>(true);
  screenReaderMessage$ = new BehaviorSubject<string>('');
  isDarkTheme$ = new BehaviorSubject<boolean>(false);
  
  // FAB Configuration
  globalFabIcon = 'add';
  globalFabTooltip = 'Crea nuova nota';
  darkThemeEnabled = environment.features?.darkTheme || false;
  
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {
    // Setup mobile detection
    this.isMobile$ = this.breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.TabletPortrait
    ]);
    
    // Mock user login per sviluppo
    this.mockLogin();
  }

  ngOnInit(): void {
    this.setupRouterObserver();
    this.initializeApp();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Router Events
  private setupRouterObserver(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.urlAfterRedirects;
        this.updatePageTitle();
        this.updateBreadcrumbs();
        
        // Auto-close sidebar on mobile after navigation
        this.isMobile$.pipe(takeUntil(this.destroy$)).subscribe(isMobile => {
          if (isMobile) {
            this.sidebarOpen = false;
          }
        });
      });
  }

  private initializeApp(): void {
    this.loadingSubject.next(true);
    
    // Simulate app initialization
    setTimeout(() => {
      this.loadingSubject.next(false);
      console.log('✅ App initialized successfully');
    }, 1000);
  }

  // Mock Authentication (sostituire con veri servizi)
  private mockLogin(): void {
    // Simula un utente loggato per sviluppo
    setTimeout(() => {
      this.isLoggedInSubject.next(true);
      this.currentUserSubject.next({
        id: 1,
        username: 'developer',
        email: 'dev@notesapp.com'
      });
    }, 500);
  }

  // Navigation Methods
  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar(): void {
    this.sidebarOpen = false;
  }

  onSidebarToggle(opened: boolean): void {
    this.sidebarOpen = opened;
  }

  // Event Handlers
  onLogout(): void {
    console.log('Logout clicked');
    this.isLoggedInSubject.next(false);
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  onGlobalSearch(query: string): void {
    console.log('Global search:', query);
    this.router.navigate(['/search'], { queryParams: { q: query } });
  }

  onNavigationClick(route: string): void {
    console.log('Navigation to:', route);
    this.router.navigate([route]);
  }

  onFolderClick(folderId: number): void {
    console.log('Folder clicked:', folderId);
    this.router.navigate(['/notes'], { queryParams: { folder: folderId } });
  }

  createNewNote(): void {
    console.log('Create new note');
    this.router.navigate(['/notes/new']);
  }

  createNewFolder(): void {
    console.log('Create new folder');
    // Implementare dialog per creazione cartella
  }

  openProfile(): void {
    console.log('Profile clicked');
    this.router.navigate(['/settings/profile']);
  }

  openNotifications(): void {
    console.log('Notifications clicked');
    // Implementare panel notifiche
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  // Global FAB
  onGlobalFabClick(): void {
    console.log('Global FAB clicked');
    this.createNewNote();
  }

  // Theme Toggle
  toggleTheme(): void {
    const currentTheme = this.isDarkTheme$.value;
    this.isDarkTheme$.next(!currentTheme);
    console.log('Theme toggled to:', !currentTheme ? 'dark' : 'light');
  }

  // PWA Methods
  updateApp(): void {
    console.log('Update app clicked');
    // Implementare update PWA
  }

  dismissUpdate(): void {
    this.updateAvailable$.next(false);
  }

  retryConnection(): void {
    console.log('Retry connection');
    // Implementare retry connessione
  }

  // Utility Methods
  getConnectionIcon(type: string): string {
    switch (type) {
      case 'online': return 'wifi';
      case 'offline': return 'wifi_off';
      case 'error': return 'error';
      default: return 'info';
    }
  }

  private updatePageTitle(): void {
    const routeSegments = this.currentRoute.split('/').filter(s => s);
    if (routeSegments.length > 0) {
      this.currentPageTitle = routeSegments[0].charAt(0).toUpperCase() + 
                             routeSegments[0].slice(1);
    }
  }

  private updateBreadcrumbs(): void {
    const segments = this.currentRoute.split('/').filter(s => s);
    const breadcrumbs = segments.map((segment, index) => ({
      label: segment.charAt(0).toUpperCase() + segment.slice(1),
      route: '/' + segments.slice(0, index + 1).join('/'),
      icon: index === 0 ? this.getRouteIcon(segment) : undefined
    }));
    
    this.breadcrumbs$.next(breadcrumbs);
  }

  private getRouteIcon(route: string): string {
    const iconMap: { [key: string]: string } = {
      'dashboard': 'dashboard',
      'notes': 'note',
      'folders': 'folder',
      'search': 'search',
      'shared': 'share',
      'settings': 'settings'
    };
    return iconMap[route] || 'home';
  }
}

/*
=================================================================
📝 PROSSIMI PASSI per completare il component:
=================================================================

1. Sostituisci i mock con veri servizi:
   - AuthService per gestione autenticazione
   - LoadingService per stati di caricamento
   - NotificationService per notifiche

2. Aggiungi i servizi reali:
   constructor(
     private router: Router,
     private breakpointObserver: BreakpointObserver,
     private authService: AuthService,
     private loadingService: LoadingService,
     private notificationService: NotificationService,
     private websocketService: WebSocketService
   ) { ... }

3. Sostituisci gli observables mock:
   isLoading$ = this.loadingService.loading$;
   isLoggedIn$ = this.authService.currentUser$.pipe(map(user => !!user));
   currentUser$ = this.authService.currentUser$;

4. Implementa i metodi reali:
   onLogout(): void {
     this.authService.logout();
   }

=================================================================
*/