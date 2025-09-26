import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { NotesListComponent } from './notes-list.component';
import { NoteEditorComponent } from './note-editor.component';

const routes: Routes = [
  { path: '', component: NotesListComponent },
  { path: 'new', component: NoteEditorComponent },
  { path: ':id/edit', component: NoteEditorComponent }
];

@NgModule({
  declarations: [
    NotesListComponent,
    NoteEditorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule.forChild(routes)
  ]
})
export class NotesModule { }