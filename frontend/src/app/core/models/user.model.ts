export interface User {
  id: number;
  username: string;
  createdAt: Date;
  isOnline?: boolean;
  lastSeen?: Date;
}

export interface AuthResponse {
  token: string;
  username: string;
  userId: number;
  expiresAt?: Date;
}

export interface LoginRequest {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  username: string;
  password: string;
  confirmPassword?: string;
}

export interface UserProfile extends User {
  email?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    mentions: boolean;
    collaborations: boolean;
  };
  editor: {
    fontSize: number;
    fontFamily: string;
    autoSave: boolean;
    autoSaveInterval: number;
  };
}