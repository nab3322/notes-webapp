export enum PermissionType {
  PRIVATE = 'PRIVATE',
  READ_ONLY = 'READ_ONLY',
  READ_WRITE = 'READ_WRITE'
}

export interface Permission {
  id: number;
  noteId: number;
  userId: number;
  username: string;
  type: PermissionType;
  grantedAt: Date;
  grantedBy: string;
  grantedById: number;
  expiresAt?: Date;
  isActive: boolean;
}

export interface ShareNoteRequest {
  username: string;
  permissionType: PermissionType;
  expiresAt?: Date;
  message?: string;
}

export interface ShareNoteResponse {
  success: boolean;
  message: string;
  permission?: Permission;
}

export interface PermissionUpdate {
  permissionId: number;
  type: PermissionType;
  expiresAt?: Date;
}

export const PERMISSION_LABELS = {
  [PermissionType.PRIVATE]: 'Solo io',
  [PermissionType.READ_ONLY]: 'Solo lettura',
  [PermissionType.READ_WRITE]: 'Lettura e scrittura'
};

export const PERMISSION_DESCRIPTIONS = {
  [PermissionType.PRIVATE]: 'Solo tu puoi vedere questa nota',
  [PermissionType.READ_ONLY]: 'Gli altri possono leggere ma non modificare',
  [PermissionType.READ_WRITE]: 'Gli altri possono leggere e modificare'
};

export const PERMISSION_ICONS = {
  [PermissionType.PRIVATE]: 'lock',
  [PermissionType.READ_ONLY]: 'visibility',
  [PermissionType.READ_WRITE]: 'edit'
};