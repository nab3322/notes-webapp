import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthService } from './core/services/auth.service';
import { LoadingService } from './core/services/loading.service';
import { User } from './core/models/user.model';

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
  sidebarOpen = true;
  currentRoute = '';
  currentPageTitle = 'Dashboard';
  
  // Mobile Detection
  isMobile$: Observable<boolean>;
  
  // Mock data per sviluppo
  unreadNotifications$ = new BehaviorSubject<number>(3);
  showGlobalFab$ = new BehaviorSubject<boolean>(true);
  
  // FAB Configuration
  globalFabIcon = 'add';
  globalFabTooltip = 'Crea nuova nota';
  
  // Authentication state controller
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  
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

  // Getters per il template
  get isLoading$() {
    return this.loadingService.loading$;
  }
  
  get isLoggedIn$() {
    return this.isAuthenticatedSubject.asObservable();
  }

  get currentUser$() {
    // Mock user per sviluppo
    return new BehaviorSubject<User>({
      id: '1',
      username: 'mario.rossi',
      email: 'mario.rossi@example.com',
      name: 'Mario Rossi',
      createdAt: new Date(),
      isOnline: true
    }).asObservable();
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
    
    setTimeout(() => {
      this.loadingService.hide();
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

  // Helper methods
  getUserDisplayName(user: User | null): string {
    if (!user) return 'Utente';
    
    if (user.name && user.name.trim()) {
      return user.name.trim();
    }
    
    if (user.firstName || user.lastName) {
      const fullName = [user.firstName, user.lastName]
        .filter(name => name && name.trim())
        .join(' ');
      if (fullName) return fullName;
    }
    
    if (user.username && user.username.trim()) {
      return user.username.trim();
    }
    
    if (user.email && user.email.trim()) {
      return user.email.split('@')[0];
    }
    
    return 'Utente';
  }

  // Navigation methods
  navigateTo(route: string): void {
    console.log('Navigating to:', route);
    this.router.navigate([route]);
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
    console.log('Sidebar toggled:', this.sidebarOpen);
  }

  onSidebarToggle(opened: boolean): void {
    this.sidebarOpen = opened;
    console.log('Sidebar changed:', opened);
  }

  closeSidebar(): void {
    this.sidebarOpen = false;
    console.log('Sidebar closed');
  }

  // Header action methods
  openNotifications(): void {
    console.log('Notifications clicked');
    this.router.navigate(['/notifications']);
  }

  openProfile(): void {
    console.log('Profile clicked');
    this.router.navigate(['/profile']);
  }

  onLogout(): void {
    console.log('Logout clicked');
    
    if (confirm('Sei sicuro di voler effettuare il logout?')) {
      console.log('User logged out');
      this.isAuthenticatedSubject.next(false);
      this.router.navigate(['/auth/login']);
    }
  }

  // Quick action methods
  createNewNote(): void {
    console.log('Create new note clicked');
    this.router.navigate(['/notes/new']);
    
    this.isMobile$.pipe(takeUntil(this.destroy$)).subscribe(isMobile => {
      if (isMobile) {
        this.sidebarOpen = false;
      }
    });
  }

  createNewFolder(): void {
    console.log('Create new folder clicked');
    
    const folderName = prompt('Nome della nuova cartella:');
    if (folderName && folderName.trim()) {
      console.log('Creating folder:', folderName.trim());
    }
    
    this.isMobile$.pipe(takeUntil(this.destroy$)).subscribe(isMobile => {
      if (isMobile) {
        this.sidebarOpen = false;
      }
    });
  }

  onGlobalFabClick(): void {
    console.log('Global FAB clicked');
    this.createNewNote();
  }

  // Utility methods
  private updatePageTitle(): void {
    const routeSegments = this.currentRoute.split('/').filter(s => s);
    if (routeSegments.length > 0) {
      this.currentPageTitle = routeSegments[0].charAt(0).toUpperCase() + 
                             routeSegments[0].slice(1);
    } else {
      this.currentPageTitle = 'Dashboard';
    }
  }

  isActiveRoute(route: string): boolean {
    return this.currentRoute.includes(route);
  }

  // Layout switching methods for testing
  switchToAuthenticatedMode(): void {
    console.log('Switching to authenticated mode');
    this.isAuthenticatedSubject.next(true);
  }

  switchToGuestMode(): void {
    console.log('Switching to guest mode');
    this.isAuthenticatedSubject.next(false);
  }
}