import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesComponent } from './pages/notes/notes.component';
import { LayoutComponent } from './layout/layout.component';
import { NoteNewComponent } from './pages/note-new/note-new.component';
import { NoteEditComponent } from './pages/note-edit/note-edit.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: NotesComponent
      },
      {
        path: 'new',
        component: NoteNewComponent
      },
      {
        path: ':noteId/edit',
        component: NoteEditComponent
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule { }
