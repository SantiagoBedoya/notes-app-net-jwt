import { Component, OnDestroy, OnInit } from '@angular/core';
import { Note } from '../../interfaces/interface';
import { NoteService } from '../../service/note.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit, OnDestroy {

  notes: Note[] = [];

  constructor(
    private noteService: NoteService
  ) { }

  ngOnDestroy(): void {
    this.notes = [];
  }

  ngOnInit(): void {
    this.notes = [];
    this.getNotes();
  }

  getNotes(){
    this.noteService.getNotes().subscribe(notes => {
      this.notes = notes;
    })
  }

}
