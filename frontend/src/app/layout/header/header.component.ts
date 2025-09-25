import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@core/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() user: User | null = null;
  @Input() sidebarOpen = false;
  @Input() notifications = 0;
  
  @Output() menuToggle = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();
  @Output() profileClick = new EventEmitter<void>();
  @Output() notificationClick = new EventEmitter<void>();
  @Output() searchQuery = new EventEmitter<string>();

  constructor(private router: Router) { }

  ngOnInit(): void { }

  onMenuToggle(): void {
    this.menuToggle.emit();
  }

  onLogout(): void {
    this.logout.emit();
  }

  onProfileClick(): void {
    this.profileClick.emit();
  }

  onNotificationClick(): void {
    this.notificationClick.emit();
  }

  onSearch(query: string): void {
    this.searchQuery.emit(query);
  }
}