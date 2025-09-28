import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'] // ✅ Cambiato da .css a .scss
})
export class HeaderComponent {
  @Input() sidebarOpen = false;
  @Input() user: User | null = null;
  @Input() notifications = 0;
  @Input() isDarkTheme = false; // ✅ Aggiunto

  @Output() menuToggle = new EventEmitter<void>();
  @Output() themeToggle = new EventEmitter<void>();

  // Router reso pubblico per il template
  constructor(public router: Router) {}

  /**
   * Gestisce il toggle del menu sidebar
   */
  onMenuToggle(): void {
    this.menuToggle.emit();
  }

  /**
   * Gestisce la ricerca
   */
  onSearch(searchTerm: string): void {
    if (searchTerm.trim()) {
      this.router.navigate(['/search'], { 
        queryParams: { q: searchTerm.trim() } 
      });
    }
  }

  /**
   * Gestisce il click sulle notifiche
   */
  onNotificationClick(): void {
    this.router.navigate(['/notifications']);
  }

  /**
   * Gestisce il click sul profilo
   */
  onProfileClick(): void {
    this.router.navigate(['/profile']);
  }

  /**
   * Gestisce il toggle del tema
   * ✅ Metodo aggiunto
   */
  onThemeToggle(): void {
    this.themeToggle.emit();
  }

  /**
   * Gestisce il logout
   */
  onLogout(): void {
    if (confirm('Sei sicuro di voler effettuare il logout?')) {
      this.router.navigate(['/login']);
    }
  }
}