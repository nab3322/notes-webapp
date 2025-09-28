import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Component } from '@angular/core';

// Componenti temporanei per testare il routing (SENZA Material icons)
@Component({
  template: `
    <div style="padding: 2rem; text-align: center; background: white; border-radius: 12px; margin: 1rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
      <div style="font-size: 48px; margin-bottom: 1rem;">📊</div>
      <h1 style="color: #1e293b; margin-bottom: 1rem;">Dashboard</h1>
      <p style="color: #64748b; margin-bottom: 2rem;">Benvenuto nella tua dashboard! Qui puoi vedere un riepilogo delle tue attività.</p>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 2rem 0;">
        <div style="background: #f8fafc; padding: 1.5rem; border-radius: 8px; border: 1px solid #e2e8f0;">
          <h3 style="color: #2563eb; margin: 0 0 0.5rem 0;">📝 Note Totali</h3>
          <p style="font-size: 2rem; font-weight: bold; color: #1e293b; margin: 0;">24</p>
        </div>
        <div style="background: #f8fafc; padding: 1.5rem; border-radius: 8px; border: 1px solid #e2e8f0;">
          <h3 style="color: #059669; margin: 0 0 0.5rem 0;">📁 Cartelle</h3>
          <p style="font-size: 2rem; font-weight: bold; color: #1e293b; margin: 0;">5</p>
        </div>
        <div style="background: #f8fafc; padding: 1.5rem; border-radius: 8px; border: 1px solid #e2e8f0;">
          <h3 style="color: #dc2626; margin: 0 0 0.5rem 0;">🔗 Condivise</h3>
          <p style="font-size: 2rem; font-weight: bold; color: #1e293b; margin: 0;">8</p>
        </div>
      </div>
      
      <button onclick="history.back()" style="background: #2563eb; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 6px; cursor: pointer; margin-top: 1rem;">
        ← Torna Indietro
      </button>
    </div>
  `
})
export class DashboardTempComponent { }

@Component({
  template: `
    <div style="padding: 2rem; text-align: center; background: white; border-radius: 12px; margin: 1rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
      <div style="font-size: 48px; margin-bottom: 1rem;">📝</div>
      <h1 style="color: #1e293b; margin-bottom: 1rem;">Le Mie Note</h1>
      <p style="color: #64748b; margin-bottom: 2rem;">Gestisci e organizza tutte le tue note in un unico posto.</p>
      
      <div style="text-align: left; max-width: 600px; margin: 2rem auto;">
        <div style="background: #f8fafc; padding: 1rem; border-radius: 8px; margin-bottom: 1rem; border-left: 4px solid #059669;">
          <h4 style="margin: 0 0 0.5rem 0; color: #1e293b;">📋 Nota di esempio 1</h4>
          <p style="margin: 0; color: #64748b; font-size: 0.9rem;">Questa è una nota di esempio per mostrare come apparirebbero le tue note...</p>
        </div>
        <div style="background: #f8fafc; padding: 1rem; border-radius: 8px; margin-bottom: 1rem; border-left: 4px solid #2563eb;">
          <h4 style="margin: 0 0 0.5rem 0; color: #1e293b;">💡 Nota di esempio 2</h4>
          <p style="margin: 0; color: #64748b; font-size: 0.9rem;">Un'altra nota di esempio con contenuto interessante...</p>
        </div>
        <div style="background: #f8fafc; padding: 1rem; border-radius: 8px; margin-bottom: 1rem; border-left: 4px solid #dc2626;">
          <h4 style="margin: 0 0 0.5rem 0; color: #1e293b;">🚨 Nota urgente</h4>
          <p style="margin: 0; color: #64748b; font-size: 0.9rem;">Una nota importante che richiede attenzione...</p>
        </div>
      </div>
      
      <button onclick="history.back()" style="background: #2563eb; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 6px; cursor: pointer;">
        ← Torna Indietro
      </button>
    </div>
  `
})
export class NotesTempComponent { }

@Component({
  template: `
    <div style="padding: 2rem; text-align: center; background: white; border-radius: 12px; margin: 1rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
      <div style="font-size: 48px; margin-bottom: 1rem;">📁</div>
      <h1 style="color: #1e293b; margin-bottom: 1rem;">Cartelle</h1>
      <p style="color: #64748b; margin-bottom: 2rem;">Organizza le tue note in cartelle per una migliore gestione.</p>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin: 2rem 0;">
        <div style="background: #fef3c7; padding: 1.5rem; border-radius: 8px; cursor: pointer; transition: transform 0.2s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
          <div style="font-size: 32px; margin-bottom: 0.5rem;">💼</div>
          <h4 style="color: #92400e; margin: 0.5rem 0;">Lavoro</h4>
          <p style="color: #92400e; font-size: 0.9rem; margin: 0;">12 note</p>
        </div>
        <div style="background: #dbeafe; padding: 1.5rem; border-radius: 8px; cursor: pointer; transition: transform 0.2s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
          <div style="font-size: 32px; margin-bottom: 0.5rem;">🏠</div>
          <h4 style="color: #1d4ed8; margin: 0.5rem 0;">Personale</h4>
          <p style="color: #1d4ed8; font-size: 0.9rem; margin: 0;">8 note</p>
        </div>
        <div style="background: #dcfce7; padding: 1.5rem; border-radius: 8px; cursor: pointer; transition: transform 0.2s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
          <div style="font-size: 32px; margin-bottom: 0.5rem;">🚀</div>
          <h4 style="color: #047857; margin: 0.5rem 0;">Progetti</h4>
          <p style="color: #047857; font-size: 0.9rem; margin: 0;">4 note</p>
        </div>
      </div>
      
      <button onclick="history.back()" style="background: #2563eb; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 6px; cursor: pointer;">
        ← Torna Indietro
      </button>
    </div>
  `
})
export class FoldersTempComponent { }

@Component({
  template: `
    <div style="padding: 2rem; text-align: center; background: white; border-radius: 12px; margin: 1rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
      <div style="font-size: 48px; margin-bottom: 1rem;">🔍</div>
      <h1 style="color: #1e293b; margin-bottom: 1rem;">Ricerca</h1>
      <p style="color: #64748b; margin-bottom: 2rem;">Cerca rapidamente tra tutte le tue note e cartelle.</p>
      
      <div style="max-width: 400px; margin: 2rem auto;">
        <div style="background: #f8fafc; padding: 1rem; border-radius: 8px; border: 1px solid #e2e8f0;">
          <input type="text" placeholder="Cerca nelle tue note..." style="width: 100%; padding: 0.5rem; border: none; background: transparent; font-size: 1rem; outline: none;">
        </div>
      </div>
      
      <div style="text-align: left; max-width: 500px; margin: 2rem auto;">
        <h3 style="color: #64748b; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.05em;">Risultati di esempio:</h3>
        <div style="background: #f8fafc; padding: 1rem; border-radius: 8px; margin-bottom: 0.5rem;">
          <p style="margin: 0; color: #1e293b; font-weight: 500;">📋 Nota importante del progetto</p>
          <p style="margin: 0.25rem 0 0 0; color: #64748b; font-size: 0.9rem;">...contenuto che corrisponde alla ricerca...</p>
        </div>
        <div style="background: #f8fafc; padding: 1rem; border-radius: 8px; margin-bottom: 0.5rem;">
          <p style="margin: 0; color: #1e293b; font-weight: 500;">💼 Meeting notes</p>
          <p style="margin: 0.25rem 0 0 0; color: #64748b; font-size: 0.9rem;">...altro risultato della ricerca...</p>
        </div>
      </div>
      
      <button onclick="history.back()" style="background: #2563eb; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 6px; cursor: pointer;">
        ← Torna Indietro
      </button>
    </div>
  `
})
export class SearchTempComponent { }

@Component({
  template: `
    <div style="padding: 2rem; text-align: center; background: white; border-radius: 12px; margin: 1rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
      <div style="font-size: 48px; margin-bottom: 1rem;">⚙️</div>
      <h1 style="color: #1e293b; margin-bottom: 1rem;">Impostazioni</h1>
      <p style="color: #64748b; margin-bottom: 2rem;">Configura la tua app secondo le tue preferenze.</p>
      
      <div style="text-align: left; max-width: 500px; margin: 2rem auto;">
        <div style="background: #f8fafc; padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem;">
          <h4 style="margin: 0 0 1rem 0; color: #1e293b;">🎨 Aspetto</h4>
          <p style="margin: 0 0 0.5rem 0; color: #64748b;">Tema: Chiaro</p>
          <p style="margin: 0; color: #64748b;">Lingua: Italiano</p>
        </div>
        <div style="background: #f8fafc; padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem;">
          <h4 style="margin: 0 0 1rem 0; color: #1e293b;">🔔 Notifiche</h4>
          <p style="margin: 0 0 0.5rem 0; color: #64748b;">Email: Attive</p>
          <p style="margin: 0; color: #64748b;">Push: Attive</p>
        </div>
        <div style="background: #f8fafc; padding: 1.5rem; border-radius: 8px;">
          <h4 style="margin: 0 0 1rem 0; color: #1e293b;">🔒 Privacy</h4>
          <p style="margin: 0 0 0.5rem 0; color: #64748b;">Profilo: Privato</p>
          <p style="margin: 0; color: #64748b;">Condivisione: Limitata</p>
        </div>
      </div>
      
      <button onclick="history.back()" style="background: #2563eb; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 6px; cursor: pointer;">
        ← Torna Indietro
      </button>
    </div>
  `
})
export class SettingsTempComponent { }

@Component({
  template: `
    <div style="padding: 2rem; text-align: center; background: white; border-radius: 12px; margin: 1rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
      <div style="font-size: 48px; margin-bottom: 1rem;">🔐</div>
      <h1 style="color: #1e293b; margin-bottom: 1rem;">Accedi</h1>
      <p style="color: #64748b; margin-bottom: 2rem;">Entra nel tuo account per accedere alle tue note.</p>
      
      <div style="max-width: 300px; margin: 2rem auto; text-align: left;">
        <div style="margin-bottom: 1rem;">
          <label style="display: block; color: #374151; margin-bottom: 0.5rem;">📧 Email</label>
          <input type="email" placeholder="mario&#64;example.com" style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px; font-size: 1rem;">
        </div>
        <div style="margin-bottom: 1.5rem;">
          <label style="display: block; color: #374151; margin-bottom: 0.5rem;">🔑 Password</label>
          <input type="password" placeholder="••••••••" style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px; font-size: 1rem;">
        </div>
        <button style="width: 100%; background: #2563eb; color: white; padding: 0.75rem; border: none; border-radius: 6px; font-size: 1rem; cursor: pointer;">
          Accedi
        </button>
      </div>
      
      <button onclick="history.back()" style="background: #6b7280; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 6px; cursor: pointer; margin-top: 1rem;">
        ← Torna Indietro
      </button>
    </div>
  `
})
export class LoginTempComponent { }

@Component({
  template: `
    <div style="padding: 2rem; text-align: center; background: white; border-radius: 12px; margin: 1rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
      <div style="font-size: 48px; margin-bottom: 1rem;">👤</div>
      <h1 style="color: #1e293b; margin-bottom: 1rem;">Registrazione</h1>
      <p style="color: #64748b; margin-bottom: 2rem;">Crea un nuovo account per iniziare a usare Notes App.</p>
      
      <div style="max-width: 300px; margin: 2rem auto; text-align: left;">
        <div style="margin-bottom: 1rem;">
          <label style="display: block; color: #374151; margin-bottom: 0.5rem;">👤 Nome</label>
          <input type="text" placeholder="Mario" style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px; font-size: 1rem;">
        </div>
        <div style="margin-bottom: 1rem;">
          <label style="display: block; color: #374151; margin-bottom: 0.5rem;">📧 Email</label>
          <input type="email" placeholder="mario&#64;example.com" style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px; font-size: 1rem;">
        </div>
        <div style="margin-bottom: 1.5rem;">
          <label style="display: block; color: #374151; margin-bottom: 0.5rem;">🔑 Password</label>
          <input type="password" placeholder="••••••••" style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px; font-size: 1rem;">
        </div>
        <button style="width: 100%; background: #059669; color: white; padding: 0.75rem; border: none; border-radius: 6px; font-size: 1rem; cursor: pointer;">
          Registrati
        </button>
      </div>
      
      <button onclick="history.back()" style="background: #6b7280; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 6px; cursor: pointer; margin-top: 1rem;">
        ← Torna Indietro
      </button>
    </div>
  `
})
export class RegisterTempComponent { }

@Component({
  template: `
    <div style="padding: 2rem; text-align: center; background: white; border-radius: 12px; margin: 1rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
      <div style="font-size: 48px; margin-bottom: 1rem;">🔔</div>
      <h1 style="color: #1e293b; margin-bottom: 1rem;">Notifiche</h1>
      <p style="color: #64748b; margin-bottom: 2rem;">Resta aggiornato con le tue notifiche più recenti.</p>
      
      <div style="text-align: left; max-width: 500px; margin: 2rem auto;">
        <div style="background: #fef3c7; padding: 1rem; border-radius: 8px; margin-bottom: 1rem; border-left: 4px solid #f59e0b;">
          <p style="margin: 0 0 0.5rem 0; color: #92400e; font-weight: 500;">📝 Nuova nota condivisa</p>
          <p style="margin: 0; color: #92400e; font-size: 0.9rem;">Mario ha condiviso una nota con te - 2 ore fa</p>
        </div>
        <div style="background: #dbeafe; padding: 1rem; border-radius: 8px; margin-bottom: 1rem; border-left: 4px solid #2563eb;">
          <p style="margin: 0 0 0.5rem 0; color: #1d4ed8; font-weight: 500;">💾 Backup completato</p>
          <p style="margin: 0; color: #1d4ed8; font-size: 0.9rem;">Le tue note sono state salvate nel cloud - 1 giorno fa</p>
        </div>
        <div style="background: #dcfce7; padding: 1rem; border-radius: 8px; border-left: 4px solid #059669;">
          <p style="margin: 0 0 0.5rem 0; color: #047857; font-weight: 500;">🎉 Benvenuto!</p>
          <p style="margin: 0; color: #047857; font-size: 0.9rem;">Grazie per esserti registrato - 3 giorni fa</p>
        </div>
      </div>
      
      <button onclick="history.back()" style="background: #2563eb; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 6px; cursor: pointer;">
        ← Torna Indietro
      </button>
    </div>
  `
})
export class NotificationsTempComponent { }

@Component({
  template: `
    <div style="padding: 2rem; text-align: center; background: white; border-radius: 12px; margin: 1rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
      <div style="font-size: 48px; margin-bottom: 1rem;">👤</div>
      <h1 style="color: #1e293b; margin-bottom: 1rem;">Profilo Utente</h1>
      <p style="color: #64748b; margin-bottom: 2rem;">Gestisci le informazioni del tuo profilo.</p>
      
      <div style="max-width: 400px; margin: 2rem auto; text-align: left;">
        <div style="text-align: center; margin-bottom: 2rem;">
          <div style="width: 80px; height: 80px; background: #6366f1; border-radius: 50%; margin: 0 auto 1rem; display: flex; align-items: center; justify-content: center; font-size: 40px; color: white;">
            👤
          </div>
          <h3 style="margin: 0; color: #1e293b;">Mario Rossi</h3>
          <p style="margin: 0.5rem 0 0 0; color: #64748b;">mario.rossi&#64;example.com</p>
        </div>
        
        <div style="background: #f8fafc; padding: 1.5rem; border-radius: 8px;">
          <h4 style="margin: 0 0 1rem 0; color: #1e293b;">📊 Statistiche</h4>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div style="text-align: center;">
              <p style="margin: 0; font-size: 1.5rem; font-weight: bold; color: #2563eb;">24</p>
              <p style="margin: 0; color: #64748b; font-size: 0.9rem;">Note create</p>
            </div>
            <div style="text-align: center;">
              <p style="margin: 0; font-size: 1.5rem; font-weight: bold; color: #059669;">5</p>
              <p style="margin: 0; color: #64748b; font-size: 0.9rem;">Cartelle</p>
            </div>
          </div>
        </div>
      </div>
      
      <button onclick="history.back()" style="background: #2563eb; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 6px; cursor: pointer;">
        ← Torna Indietro
      </button>
    </div>
  `
})
export class ProfileTempComponent { }

@Component({
  template: `
    <div style="padding: 2rem; text-align: center; background: white; border-radius: 12px; margin: 1rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
      <div style="font-size: 48px; margin-bottom: 1rem;">➕</div>
      <h1 style="color: #1e293b; margin-bottom: 1rem;">Nuova Nota</h1>
      <p style="color: #64748b; margin-bottom: 2rem;">Crea una nuova nota per organizzare le tue idee.</p>
      
      <div style="max-width: 600px; margin: 2rem auto; text-align: left;">
        <div style="margin-bottom: 1rem;">
          <label style="display: block; color: #374151; margin-bottom: 0.5rem; font-weight: 500;">📝 Titolo</label>
          <input type="text" placeholder="Inserisci il titolo della nota..." style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px; font-size: 1rem;">
        </div>
        <div style="margin-bottom: 1.5rem;">
          <label style="display: block; color: #374151; margin-bottom: 0.5rem; font-weight: 500;">📄 Contenuto</label>
          <textarea placeholder="Scrivi qui il contenuto della tua nota..." style="width: 100%; height: 200px; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px; font-size: 1rem; resize: vertical; font-family: inherit;"></textarea>
        </div>
        <div style="display: flex; gap: 1rem;">
          <button style="flex: 1; background: #059669; color: white; padding: 0.75rem; border: none; border-radius: 6px; font-size: 1rem; cursor: pointer;">
            ✅ Salva Nota
          </button>
          <button style="flex: 1; background: #6b7280; color: white; padding: 0.75rem; border: none; border-radius: 6px; font-size: 1rem; cursor: pointer;" onclick="history.back()">
            ❌ Annulla
          </button>
        </div>
      </div>
    </div>
  `
})
export class NewNoteTempComponent { }

// Route con componenti temporanei funzionanti
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardTempComponent },
  { path: 'notes', component: NotesTempComponent },
  { path: 'notes/new', component: NewNoteTempComponent },
  { path: 'folders', component: FoldersTempComponent },
  { path: 'search', component: SearchTempComponent },
  { path: 'settings', component: SettingsTempComponent },
  { path: 'notifications', component: NotificationsTempComponent },
  { path: 'profile', component: ProfileTempComponent },
  { path: 'auth/login', component: LoginTempComponent },
  { path: 'auth/register', component: RegisterTempComponent },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  declarations: [
    DashboardTempComponent,
    NotesTempComponent,
    FoldersTempComponent,
    SearchTempComponent,
    SettingsTempComponent,
    LoginTempComponent,
    RegisterTempComponent,
    NotificationsTempComponent,
    ProfileTempComponent,
    NewNoteTempComponent
  ],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }