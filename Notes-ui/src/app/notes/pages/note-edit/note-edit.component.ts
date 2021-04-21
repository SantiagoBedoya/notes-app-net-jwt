import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from '../../service/note.service';
import { Note } from '../../interfaces/interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.scss']
})
export class NoteEditComponent implements OnInit {

  noteId!: string;
  note!: Note;

  constructor(
    private noteService: NoteService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.noteId = this.activatedRoute.snapshot.paramMap.get('noteId')!;
    this.noteService.getNote(this.noteId).subscribe(resp => {
      this.note = resp;
    });
  }

  updateNote(data: Note){
    this.noteService.updateNote(this.noteId, data).subscribe(resp => {
      this.snackbar.open('Nota actualizada', 'Ok', {
        duration: 2000, 
      });
      this.router.navigateByUrl('/notes');
    })
  }

}
