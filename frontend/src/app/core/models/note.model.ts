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
  folderName?: string;
  tags: string[];
  permissions?: Permission[];
  isShared: boolean;
  canEdit: boolean;
  canDelete: boolean;
  isCollaborating?: boolean;
  collaborators?: User[];
  lastEditBy?: string;
}

export interface NoteRequest {
  title: string;
  content: string;
  folderId?: number;
  tags?: string[];
  lastModified?: Date;
}

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

export interface NoteStats {
  totalCharacters: number;
  wordCount: number;
  readingTime: number; // in minutes
  collaborators: number;
  versions: number;
  shares: number;
}

export interface NoteDiff {
  additions: string[];
  deletions: string[];
  modifications: string[];
}

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

export interface NoteSortOptions {
  field: 'title' | 'createdAt' | 'modifiedAt' | 'owner' | 'collaborators';
  direction: 'asc' | 'desc';
}