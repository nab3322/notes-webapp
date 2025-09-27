import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthService } from './core/services/auth.service';
import { LoadingService } from './core/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Notes Sharing App';
  appName = 'Notes Sharing App';
  currentYear = new Date().getFullYear();
  
  // UI State
  sidebarOpen = false;
  currentRoute = '';
  currentPageTitle = 'Dashboard';
  
  // Mobile Detection
  isMobile$: Observable<boolean>;
  
  // Mock data per sviluppo (sostituirai con servizi reali)
  unreadNotifications$ = new BehaviorSubject<number>(3);
  showGlobalFab$ = new BehaviorSubject<boolean>(true);
  
  // FAB Configuration
  globalFabIcon = 'add';
  globalFabTooltip = 'Crea nuova nota';
  
  private destroy$ = new Subject<void>();

  constructor(
    public router: Router,
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private loadingService: LoadingService
  ) {
    // Setup mobile detection
    this.isMobile$ = this.breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.TabletPortrait
    ]).pipe(
      map(result => result.matches)
    );
  }

  // Getters per mantenere compatibilità con template
  get isLoading$() {
    return this.loadingService.loading$;
  }
  
  get isLoggedIn$() {
    return this.authService.currentUser$.pipe(
      map(user => !!user)
    );
  }

  get currentUser$() {
    return this.authService.currentUser$;
  }

  ngOnInit(): void {
    this.initializeApp();
    this.setupRouterLogging();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeApp(): void {
    this.loadingService.show();
    
    // Simula inizializzazione app
    setTimeout(() => {
      this.loadingService.hide();
      
      // Redirect se non autenticato
      if (!this.authService.isLoggedIn()) {
        this.router.navigate(['/auth/login']);
      }
    }, 1000);
  }

  private setupRouterLogging(): void {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.urlAfterRedirects;
        this.updatePageTitle();
        console.log('Navigated to:', event.urlAfterRedirects);
        
        // Auto-chiudi sidebar su mobile dopo navigazione
        this.isMobile$.pipe(takeUntil(this.destroy$)).subscribe(isMobile => {
          if (isMobile) {
            this.sidebarOpen = false;
          }
        });
      });
  }

  // Navigation Methods
  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  onSidebarToggle(opened: boolean): void {
    this.sidebarOpen = opened;
  }

  closeSidebar(): void {
    this.sidebarOpen = false;
  }

  // Event Handlers
  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  openProfile(): void {
    this.router.navigate(['/settings/profile']);
  }

  openNotifications(): void {
    console.log('Notifications clicked');
    // Implementare panel notifiche
  }

  createNewNote(): void {
    this.router.navigate(['/notes/new']);
  }

  createNewFolder(): void {
    console.log('Create new folder');
    // Implementare dialog per creazione cartella
  }

  onGlobalFabClick(): void {
    this.createNewNote();
  }

  // Utility Methods
  private updatePageTitle(): void {
    const routeSegments = this.currentRoute.split('/').filter(s => s);
    if (routeSegments.length > 0) {
      this.currentPageTitle = routeSegments[0].charAt(0).toUpperCase() + 
                             routeSegments[0].slice(1);
    } else {
      this.currentPageTitle = 'Dashboard';
    }
  }

  // Navigation helpers per template
  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  isActiveRoute(route: string): boolean {
    return this.currentRoute.includes(route);
  }
}