// Modello base utente (compatibile con AuthService e Note)
export interface User {
  id: string;                  // nel PDF era string
  username: string;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
  createdAt?: Date;
  isActive?: boolean;
  isOnline?: boolean;          // dal tuo codice
  lastSeen?: Date;             // dal tuo codice
  avatar?: string;             // aggiunta dal tuo UserProfile
  preferences?: UserPreferences; // aggiunta dal tuo UserProfile
}

// Richiesta di registrazione (compatibile col PDF + tuo modello)
export interface UserRequest {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

// ---- Estensioni per autenticazione ----
export interface AuthResponse {
  token: string;
  username: string;
  userId: string;             // unificato: string (prima era number)
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
  email?: string;             // aggiunto per coerenza col PDF
  confirmPassword?: string;
}

// ---- Profilo utente esteso ----
export interface UserProfile extends User {
  // email, firstName, lastName, avatar, preferences
  // sono già inclusi nel modello base
}

// ---- Preferenze utente ----
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
