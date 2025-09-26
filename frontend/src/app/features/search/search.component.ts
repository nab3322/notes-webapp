import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search',
  template: `
    <div class="search-container">
      <div class="search-header">
        <h1>Ricerca Note</h1>
      </div>

      <!-- Search Form -->
      <mat-card class="search-form-card">
        <mat-card-content>
          <form [formGroup]="searchForm">
            <div class="search-row">
              <mat-form-field appearance="outline" class="search-field">
                <mat-label>Cerca per titolo o contenuto</mat-label>
                <input matInput formControlName="query" 
                       placeholder="Inserisci i termini di ricerca..."
                       (keyup.enter)="onSearch()">
                <mat-icon matSuffix>search</mat-icon>
              </mat-form-field>
              
              <button mat-raised-button color="primary" 
                      (click)="onSearch()" class="search-btn">
                <mat-icon>search</mat-icon>
                Cerca
              </button>
            </div>

            <!-- Filters -->
            <div class="filters-section">
              <h3>Filtri</h3>
              
              <div class="filter-row">
                <mat-form-field appearance="outline">
                  <mat-label>Tag</mat-label>
                  <input matInput formControlName="tags" 
                         placeholder="es: lavoro, importante">
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Autore</mat-label>
                  <input matInput formControlName="author" 
                         placeholder="Nome autore">
                </mat-form-field>
              </div>

              <div class="filter-checkboxes">
                <mat-checkbox formControlName="includeShared">
                  Includi note condivise
                </mat-checkbox>
                <mat-checkbox formControlName="includeArchived">
                  Includi note archiviate
                </mat-checkbox>
              </div>
            </div>
          </form>
        </mat-card-content>
      </mat-card>

      <!-- Search Results -->
      <div class="search-results" *ngIf="hasSearched">
        <div class="results-header">
          <h2>Risultati ({{searchResults.length}})</h2>
          <div class="search-stats" *ngIf="searchResults.length > 0">
            Ricerca completata in {{searchTime}}ms
          </div>
        </div>

        <!-- Results List -->
        <div class="results-list" *ngIf="searchResults.length > 0">
          <mat-card class="result-card" *ngFor="let result of searchResults">
            <mat-card-header>
              <mat-icon mat-card-avatar [class]="result.isShared ? 'shared-icon' : 'note-icon'">
                {{result.isShared ? 'share' : 'note'}}
              </mat-icon>
              <mat-card-title>
                <span [innerHTML]="highlightSearchTerm(result.title)"></span>
              </mat-card-title>
              <mat-card-subtitle>
                {{result.createdAt | date:'medium'}} • {{result.author}}
              </mat-card-subtitle>
            </mat-card-header>

            <mat-card-content>
              <p class="result-snippet" 
                 [innerHTML]="highlightSearchTerm(result.snippet)">
              </p>
              
              <div class="result-tags" *ngIf="result.tags.length > 0">
                <mat-chip-set>
                  <mat-chip *ngFor="let tag of result.tags">{{tag}}</mat-chip>
                </mat-chip-set>
              </div>
            </mat-card-content>

            <mat-card-actions>
              <button mat-button (click)="openNote(result)">
                <mat-icon>open_in_new</mat-icon>
                Apri
              </button>
              <button mat-button (click)="editNote(result)">
                <mat-icon>edit</mat-icon>
                Modifica
              </button>
            </mat-card-actions>
          </mat-card>
        </div>

        <!-- Empty State -->
        <div class="no-results" *ngIf="searchResults.length === 0">
          <mat-icon class="no-results-icon">search_off</mat-icon>
          <h2>Nessun risultato trovato</h2>
          <p>Prova a modificare i termini di ricerca o i filtri</p>
        </div>
      </div>

      <!-- Recent Searches -->
      <div class="recent-searches" *ngIf="recentSearches.length > 0 && !hasSearched">
        <h2>Ricerche recenti</h2>
        <mat-chip-set>
          <mat-chip *ngFor="let search of recentSearches" 
                    (click)="useRecentSearch(search)">
            {{search}}
          </mat-chip>
        </mat-chip-set>
      </div>
    </div>
  `,
  styles: [`
    .search-container {
      padding: 20px;
      max-width: 1000px;
      margin: 0 auto;
    }

    .search-header h1 {
      margin: 0 0 30px 0;
      color: #333;
    }

    .search-form-card {
      margin-bottom: 30px;
    }

    .search-row {
      display: flex;
      gap: 16px;
      align-items: flex-start;
      margin-bottom: 20px;
    }

    .search-field {
      flex: 1;
    }

    .search-btn {
      height: 56px;
    }

    .filters-section {
      border-top: 1px solid #eee;
      padding-top: 20px;
    }

    .filters-section h3 {
      margin: 0 0 16px 0;
      color: #666;
      font-size: 1rem;
    }

    .filter-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 16px;
    }

    .filter-checkboxes {
      display: flex;
      gap: 24px;
    }

    .results-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .results-header h2 {
      margin: 0;
      color: #333;
    }

    .search-stats {
      color: #666;
      font-size: 0.875rem;
    }

    .results-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .result-card {
      transition: transform 0.2s ease;
    }

    .result-card:hover {
      transform: translateY(-2px);
    }

    .shared-icon {
      background-color: #4caf50;
      color: white;
    }

    .note-icon {
      background-color: #1976d2;
      color: white;
    }

    .result-snippet {
      color: #666;
      line-height: 1.6;
      margin-bottom: 12px;
    }

    .result-tags {
      margin-top: 12px;
    }

    .no-results {
      text-align: center;
      padding: 60px 20px;
      color: #666;
    }

    .no-results-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      color: #ccc;
      margin-bottom: 16px;
    }

    .no-results h2 {
      margin: 16px 0 8px 0;
      color: #999;
    }

    .recent-searches {
      margin-top: 30px;
    }

    .recent-searches h2 {
      margin-bottom: 16px;
      color: #333;
      font-size: 1.2rem;
    }

    .highlight {
      background-color: #fff59d;
      font-weight: bold;
    }
  `]
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  hasSearched = false;
  searchResults: any[] = [];
  searchTime = 0;
  recentSearches = ['progetti angular', 'meeting notes', 'todo lista'];

  // Dati mock per i risultati di ricerca
  mockResults = [
    {
      id: 1,
      title: 'Progetto Angular Notes App',
      snippet: 'Sviluppo di un\'applicazione per la gestione delle note con Angular e Material Design...',
      author: 'Mario Rossi',
      createdAt: new Date(Date.now() - 2 * 86400000),
      tags: ['angular', 'sviluppo', 'progetto'],
      isShared: true
    },
    {
      id: 2,
      title: 'Meeting settimanale team',
      snippet: 'Discussione sui progressi del progetto e pianificazione delle prossime attività...',
      author: 'Luigi Verdi',
      createdAt: new Date(Date.now() - 5 * 86400000),
      tags: ['meeting', 'team', 'lavoro'],
      isShared: false
    }
  ];

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      query: [''],
      tags: [''],
      author: [''],
      includeShared: [true],
      includeArchived: [false]
    });
  }

  ngOnInit(): void {}

  onSearch(): void {
    const startTime = Date.now();
    const query = this.searchForm.get('query')?.value?.toLowerCase() || '';
    
    // Simula ricerca
    this.searchResults = this.mockResults.filter(result => 
      result.title.toLowerCase().includes(query) ||
      result.snippet.toLowerCase().includes(query) ||
      result.tags.some(tag => tag.toLowerCase().includes(query))
    );

    this.searchTime = Date.now() - startTime;
    this.hasSearched = true;

    // Aggiungi alla cronologia se non vuoto
    if (query.trim() && !this.recentSearches.includes(query)) {
      this.recentSearches.unshift(query);
      this.recentSearches = this.recentSearches.slice(0, 5);
    }
  }

  highlightSearchTerm(text: string): string {
    const query = this.searchForm.get('query')?.value;
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
  }

  useRecentSearch(search: string): void {
    this.searchForm.patchValue({ query: search });
    this.onSearch();
  }

  openNote(result: any): void {
    console.log('Opening note:', result.id);
  }

  editNote(result: any): void {
    console.log('Editing note:', result.id);
  }
}