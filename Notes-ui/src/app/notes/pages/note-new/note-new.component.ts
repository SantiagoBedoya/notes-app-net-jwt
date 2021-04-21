import { Component, OnInit } from '@angular/core';
import { Note } from '../../interfaces/interface';
import { NoteService } from '../../service/note.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note-new',
  templateUrl: './note-new.component.html',
  styleUrls: ['./note-new.component.scss']
})
export class NoteNewComponent implements OnInit {

  constructor(
    private noteService: NoteService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  saveNote(data: Note){
    this.noteService.saveNote(data).subscribe(resp => {
      this.router.navigateByUrl('/notes');
    })
  }

}
