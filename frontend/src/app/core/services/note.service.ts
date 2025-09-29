import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';

export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  folderId?: string;
  createdAt: Date;
  updatedAt: Date;
  isArchived: boolean;
  isFavorite: boolean;
  shareSettings?: {
    isPublic: boolean;
    sharedWith: string[];
  };
}

export interface NoteCreateRequest {
  title: string;
  content: string;
  tags?: string[];
  folderId?: string;
}

export interface NoteUpdateRequest {
  title?: string;
  content?: string;
  tags?: string[];
  folderId?: string;
  isArchived?: boolean;
  isFavorite?: boolean;
}

export interface NotesFilter {
  search?: string;
  tags?: string[];
  folderId?: string;
  isArchived?: boolean;
  isFavorite?: boolean;
  dateFrom?: Date;
  dateTo?: Date;
}

export interface NotesResponse {
  notes: Note[];
  total: number;
  page: number;
  limit: number;
}

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private readonly API_URL = '/api/notes';

  private notesSubject = new BehaviorSubject<Note[]>([]);
  public notes$ = this.notesSubject.asObservable();

  private currentNoteSubject = new BehaviorSubject<Note | null>(null);
  public currentNote$ = this.currentNoteSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Get all notes with filtering and pagination
   */
  getNotes(filter: NotesFilter = {}, page: number = 1, limit: number = 20): Observable<NotesResponse> {
    this.loadingSubject.next(true);

    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    // Add filters to params
    if (filter.search) {
      params = params.set('search', filter.search);
    }
    if (filter.tags && filter.tags.length > 0) {
      params = params.set('tags', filter.tags.join(','));
    }
    if (filter.folderId) {
      params = params.set('folderId', filter.folderId);
    }
    if (filter.isArchived !== undefined) {
      params = params.set('isArchived', filter.isArchived.toString());
    }
    if (filter.isFavorite !== undefined) {
      params = params.set('isFavorite', filter.isFavorite.toString());
    }
    if (filter.dateFrom) {
      params = params.set('dateFrom', filter.dateFrom.toISOString());
    }
    if (filter.dateTo) {
      params = params.set('dateTo', filter.dateTo.toISOString());
    }

    return this.http.get<NotesResponse>(this.API_URL, { params })
      .pipe(
        tap(response => {
          this.notesSubject.next(response.notes);
          this.loadingSubject.next(false);
        })
      );
  }

  /**
   * Get note by ID
   */
  getNote(id: string): Observable<Note> {
    return this.http.get<Note>(`${this.API_URL}/${id}`)
      .pipe(
        tap(note => {
          this.currentNoteSubject.next(note);
        })
      );
  }

  /**
   * Create new note
   */
  createNote(noteData: NoteCreateRequest): Observable<Note> {
    return this.http.post<Note>(this.API_URL, noteData)
      .pipe(
        tap(newNote => {
          const currentNotes = this.notesSubject.value;
          this.notesSubject.next([newNote, ...currentNotes]);
        })
      );
  }

  /**
   * Update existing note
   */
  updateNote(id: string, updates: NoteUpdateRequest): Observable<Note> {
    return this.http.patch<Note>(`${this.API_URL}/${id}`, updates)
      .pipe(
        tap(updatedNote => {
          const currentNotes = this.notesSubject.value;
          const index = currentNotes.findIndex(note => note.id === id);
          
          if (index !== -1) {
            const newNotes = [...currentNotes];
            newNotes[index] = updatedNote;
            this.notesSubject.next(newNotes);
          }

          if (this.currentNoteSubject.value?.id === id) {
            this.currentNoteSubject.next(updatedNote);
          }
        })
      );
  }

  /**
   * Delete note
   */
  deleteNote(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`)
      .pipe(
        tap(() => {
          const currentNotes = this.notesSubject.value;
          const filteredNotes = currentNotes.filter(note => note.id !== id);
          this.notesSubject.next(filteredNotes);

          if (this.currentNoteSubject.value?.id === id) {
            this.currentNoteSubject.next(null);
          }
        })
      );
  }

  /**
   * Archive/Unarchive note
   */
  toggleArchive(id: string): Observable<Note> {
    return this.getNote(id).pipe(
      switchMap(note => 
        this.updateNote(id, { isArchived: !note.isArchived })
      )
    );
  }

  /**
   * Add/Remove from favorites
   */
  toggleFavorite(id: string): Observable<Note> {
    return this.getNote(id).pipe(
      switchMap(note => 
        this.updateNote(id, { isFavorite: !note.isFavorite })
      )
    );
  }

  /**
   * Duplicate note
   */
  duplicateNote(id: string): Observable<Note> {
    return this.getNote(id).pipe(
      switchMap(note => 
        this.createNote({
          title: `${note.title} (Copia)`,
          content: note.content,
          tags: [...note.tags],
          folderId: note.folderId
        })
      )
    );
  }

  /**
   * Move note to folder
   */
  moveToFolder(noteId: string, folderId: string | null): Observable<Note> {
    return this.updateNote(noteId, { folderId: folderId ?? undefined });
  }

  /**
   * Add tags to note
   */
  addTags(noteId: string, newTags: string[]): Observable<Note> {
    return this.getNote(noteId).pipe(
      switchMap(note => {
        const uniqueTags = [...new Set([...note.tags, ...newTags])];
        return this.updateNote(noteId, { tags: uniqueTags });
      })
    );
  }

  /**
   * Remove tags from note
   */
  removeTags(noteId: string, tagsToRemove: string[]): Observable<Note> {
    return this.getNote(noteId).pipe(
      switchMap(note => {
        const filteredTags = note.tags.filter(tag => !tagsToRemove.includes(tag));
        return this.updateNote(noteId, { tags: filteredTags });
      })
    );
  }

  /**
   * Get all unique tags
   */
  getAllTags(): Observable<string[]> {
    return this.http.get<string[]>(`${this.API_URL}/tags`);
  }

  /**
   * Search notes
   */
  searchNotes(query: string): Observable<Note[]> {
    if (!query.trim()) {
      return of([]);
    }

    const params = new HttpParams().set('search', query);
    return this.http.get<NotesResponse>(this.API_URL, { params })
      .pipe(
        map(response => response.notes)
      );
  }

  /**
   * Export notes
   */
  exportNotes(format: 'json' | 'markdown' = 'json'): Observable<Blob> {
    const params = new HttpParams().set('format', format);
    return this.http.get(`${this.API_URL}/export`, { 
      params, 
      responseType: 'blob' 
    });
  }

  /**
   * Import notes
   */
  importNotes(file: File): Observable<{ imported: number; skipped: number }> {
    const formData = new FormData();
    formData.append('file', file);
    
    return this.http.post<{ imported: number; skipped: number }>(
      `${this.API_URL}/import`, 
      formData
    );
  }

  /**
   * Get note statistics
   */
  getStatistics(): Observable<{
    total: number;
    archived: number;
    favorites: number;
    byFolder: { [folderId: string]: number };
    byTag: { [tag: string]: number };
  }> {
    return this.http.get<any>(`${this.API_URL}/statistics`);
  }

  /**
   * Clear current note
   */
  clearCurrentNote(): void {
    this.currentNoteSubject.next(null);
  }

  /**
   * Refresh notes list
   */
  refreshNotes(filter?: NotesFilter): Observable<NotesResponse> {
    return this.getNotes(filter);
  }
}