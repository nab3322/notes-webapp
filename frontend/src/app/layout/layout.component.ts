import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '@core/models/user.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  @Input() user: User | null = null;
  @Input() sidebarOpen = false;
  
  @Output() sidebarToggle = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void { }

  onSidebarToggle(): void {
    this.sidebarToggle.emit();
  }

  onLogout(): void {
    this.logout.emit();
  }
}