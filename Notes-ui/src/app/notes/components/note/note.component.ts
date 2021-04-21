import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Note } from '../../interfaces/interface';
import { NoteService } from '../../service/note.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  @Output() refresh = new EventEmitter();
  @Input() note!: Note;
  constructor(
    private noteService: NoteService
  ) { }

  ngOnInit(): void {
  }

  deleteNote(){
    this.noteService.deleteNote(this.note.noteId).subscribe(resp => {
      this.refresh.emit(true);
    });
  }

}
