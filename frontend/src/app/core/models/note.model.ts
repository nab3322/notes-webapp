import { User } from './user.model';
import { Permission } from './permission.model';

// ---- Modello base compatibile ----
export interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  modifiedAt: Date;
  versionNumber: number;
  ownerUsername: string;
  ownerId: number;
  folderId?: number;
  folderName?: string;          // aggiunto dal tuo modello
  tags: string[];
  permissions?: Permission[];
  isShared: boolean;
  canEdit: boolean;
  canDelete: boolean;
  isCollaborating?: boolean;    // dal tuo modello
  collaborators?: User[];
  lastEditBy?: string;
}

// ---- Creazione / modifica note ----
export interface NoteRequest {
  title: string;
  content: string;
  folderId?: number;
  tags?: string[];
  lastModified?: Date;          // dal tuo modello
}

// ---- Versioning ----
export interface NoteVersion {
  id: number;
  noteId: number;
  title: string;
  content: string;
  versionNumber: number;
  createdAt: Date;
  createdBy: string;
  createdById: number;
  changes?: string[];
  isCurrent?: boolean;
}

// ---- Statistiche ----
export interface NoteStats {
  totalCharacters: number;
  wordCount: number;
  readingTime: number; // in minutes
  collaborators: number;
  versions: number;
  shares: number;
}

// ---- Diff tra versioni ----
export interface NoteDiff {
  additions: string[];
  deletions: string[];
  modifications: string[];
}

// ---- Filtri ----
export interface NoteFilter {
  search?: string;
  tags?: string[];
  author?: string;
  dateFrom?: Date;
  dateTo?: Date;
  folderId?: number;
  isShared?: boolean;
  hasCollaborators?: boolean;
}

// ---- Sorting ----
export interface NoteSortOptions {
  field: 'title' | 'createdAt' | 'modifiedAt' | 'owner' | 'collaborators';
  direction: 'asc' | 'desc';
}
