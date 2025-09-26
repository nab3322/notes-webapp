import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-note-editor',
  template: `
    <div class="editor-container">
      <h1>{{isEditing ? 'Modifica Nota' : 'Nuova Nota'}}</h1>

      <mat-card class="editor-card">
        <form [formGroup]="noteForm" (ngSubmit)="onSave()">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Titolo</mat-label>
            <input matInput formControlName="title" placeholder="Inserisci il titolo...">
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Contenuto</mat-label>
            <textarea matInput formControlName="content" rows="10" 
                      placeholder="Scrivi il contenuto..."></textarea>
          </mat-form-field>

          <div class="actions">
            <button mat-button type="button" (click)="onCancel()">Annulla</button>
            <button mat-raised-button color="primary" type="submit" 
                    [disabled]="!noteForm.valid">
              {{isEditing ? 'Aggiorna' : 'Salva'}}
            </button>
          </div>
        </form>
      </mat-card>
    </div>
  `,
  styles: [`
    .editor-container { padding: 20px; max-width: 800px; margin: 0 auto; }
    .full-width { width: 100%; margin-bottom: 20px; }
    .actions { display: flex; justify-content: flex-end; gap: 12px; margin-top: 20px; }
  `]
})
export class NoteEditorComponent implements OnInit {
  noteForm: FormGroup;
  isEditing = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.noteForm = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    const noteId = this.route.snapshot.paramMap.get('id');
    this.isEditing = !!noteId;
  }

  onSave(): void {
    if (this.noteForm.valid) {
      console.log('Saving note:', this.noteForm.value);
      this.router.navigate(['/notes']);
    }
  }

  onCancel(): void {
    this.router.navigate(['/notes']);
  }
}