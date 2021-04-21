import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Note } from '../../interfaces/interface';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss']
})
export class NoteFormComponent implements OnInit, OnChanges {

  @Input() note: Note | undefined;
  @Output() sendData = new EventEmitter();

  myForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]]
  });
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    const { note } = changes;
    if (note) {
      this.myForm.patchValue(note.currentValue);
    }
  }

  ngOnInit(): void {
  }

  submitForm() {
    this.sendData.emit(this.myForm.value);
  }

}
