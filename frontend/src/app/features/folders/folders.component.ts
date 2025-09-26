import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-folders',
  template: `
    <div class="folders-container">
      <div class="folders-header">
        <h1>Le mie Cartelle</h1>
        <button mat-fab color="primary" (click)="createFolder()">
          <mat-icon>create_new_folder</mat-icon>
        </button>
      </div>

      <div class="folders-grid">
        <mat-card class="folder-card" *ngFor="let folder of folders">
          <mat-card-header>
            <mat-icon mat-card-avatar class="folder-icon">folder</mat-icon>
            <mat-card-title>{{folder.name}}</mat-card-title>
            <mat-card-subtitle>{{folder.notesCount}} note</mat-card-subtitle>
          </mat-card-header>
          
          <mat-card-content>
            <p class="folder-description" *ngIf="folder.description">
              {{folder.description}}
            </p>
            <div class="folder-stats">
              <span class="stat">
                <mat-icon>schedule</mat-icon>
                {{folder.createdAt | date:'short'}}
              </span>
              <span class="stat" *ngIf="folder.isShared">
                <mat-icon>share</mat-icon>
                Condivisa
              </span>
            </div>
          </mat-card-content>
          
          <mat-card-actions>
            <button mat-button (click)="openFolder(folder)">
              <mat-icon>folder_open</mat-icon>
              Apri
            </button>
            <button mat-icon-button [matMenuTriggerFor]="folderMenu">
              <mat-icon>more_vert</mat-icon>
            </button>
            
            <mat-menu #folderMenu="matMenu">
              <button mat-menu-item (click)="editFolder(folder)">
                <mat-icon>edit</mat-icon>
                Rinomina
              </button>
              <button mat-menu-item (click)="shareFolder(folder)">
                <mat-icon>share</mat-icon>
                Condividi
              </button>
              <button mat-menu-item (click)="deleteFolder(folder)" class="delete-action">
                <mat-icon>delete</mat-icon>
                Elimina
              </button>
            </mat-menu>
          </mat-card-actions>
        </mat-card>

        <!-- Empty state -->
        <div class="empty-state" *ngIf="folders.length === 0">
          <mat-icon class="empty-icon">folder_open</mat-icon>
          <h2>Nessuna cartella</h2>
          <p>Crea la tua prima cartella per organizzare le note</p>
          <button mat-raised-button color="primary" (click)="createFolder()">
            <mat-icon>add</mat-icon>
            Crea Cartella
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .folders-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .folders-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
    }

    .folders-header h1 {
      margin: 0;
      color: #333;
    }

    .folders-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }

    .folder-card {
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .folder-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.12);
    }

    .folder-icon {
      background-color: #1976d2;
      color: white;
    }

    .folder-description {
      color: #666;
      margin-bottom: 12px;
      font-size: 0.9rem;
    }

    .folder-stats {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .stat {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.875rem;
      color: #666;
    }

    .stat mat-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
    }

    .delete-action {
      color: #f44336;
    }

    .empty-state {
      grid-column: 1 / -1;
      text-align: center;
      padding: 60px 20px;
      color: #666;
    }

    .empty-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      color: #ccc;
      margin-bottom: 16px;
    }

    .empty-state h2 {
      margin: 16px 0 8px 0;
      color: #999;
    }

    .empty-state p {
      margin-bottom: 24px;
    }
  `]
})
export class FoldersComponent implements OnInit {
  folders = [
    {
      id: 1,
      name: 'Progetti di Lavoro',
      description: 'Note relative ai progetti in corso',
      notesCount: 15,
      createdAt: new Date(Date.now() - 7 * 86400000),
      isShared: true
    },
    {
      id: 2,
      name: 'Idee Personali',
      description: 'Raccolta di idee e ispirazioni',
      notesCount: 8,
      createdAt: new Date(Date.now() - 14 * 86400000),
      isShared: false
    },
    {
      id: 3,
      name: 'Meeting Notes',
      description: 'Appunti dai meeting settimanali',
      notesCount: 23,
      createdAt: new Date(Date.now() - 21 * 86400000),
      isShared: true
    }
  ];

  constructor() { }

  ngOnInit(): void {
    // Carica le cartelle dall'API
  }

  createFolder(): void {
    const folderName = prompt('Nome della nuova cartella:');
    if (folderName?.trim()) {
      const newFolder = {
        id: this.folders.length + 1,
        name: folderName.trim(),
        description: '',
        notesCount: 0,
        createdAt: new Date(),
        isShared: false
      };
      this.folders.push(newFolder);
    }
  }

  openFolder(folder: any): void {
    console.log('Opening folder:', folder.name);
  }

  editFolder(folder: any): void {
    const newName = prompt('Nuovo nome della cartella:', folder.name);
    if (newName?.trim() && newName !== folder.name) {
      folder.name = newName.trim();
    }
  }

  shareFolder(folder: any): void {
    console.log('Sharing folder:', folder.name);
  }

  deleteFolder(folder: any): void {
    if (confirm(`Sei sicuro di voler eliminare la cartella "${folder.name}"?`)) {
      this.folders = this.folders.filter(f => f.id !== folder.id);
    }
  }
}