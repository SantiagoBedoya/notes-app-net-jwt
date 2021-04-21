import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesRoutingModule } from './notes-routing.module';
import { NotesComponent } from './pages/notes/notes.component';
import { LayoutComponent } from './layout/layout.component';
import { MaterialModule } from '../material/material.module';
import { FlexModule } from '@angular/flex-layout';
import { NoteComponent } from './components/note/note.component';
import { NoteNewComponent } from './pages/note-new/note-new.component';
import { NoteFormComponent } from './components/note-form/note-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NoteEditComponent } from './pages/note-edit/note-edit.component';


@NgModule({
  declarations: [
    NotesComponent,
    LayoutComponent,
    NoteComponent,
    NoteNewComponent,
    NoteFormComponent,
    NoteEditComponent,
  ],
  imports: [
    CommonModule,
    NotesRoutingModule,
    MaterialModule,
    FlexModule,
    ReactiveFormsModule
  ]
})
export class NotesModule { }
