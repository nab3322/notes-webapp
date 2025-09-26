import { Component } from '@angular/core';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styles: [`
    .notes-container { padding: 20px; max-width: 1200px; margin: 0 auto; }
    .notes-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
    .notes-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
    .note-preview { max-height: 60px; overflow: hidden; color: #666; }
  `]
})
export class NotesListComponent {
  notes = [
    {
      id: 1,
      title: 'Meeting Notes',
      content: 'Notes from today\'s meeting...',
      createdAt: new Date(),
      isShared: true
    },
    {
      id: 2,
      title: 'Project Ideas', 
      content: 'Some ideas for the next project...',
      createdAt: new Date(Date.now() - 86400000),
      isShared: false
    }
  ];
}