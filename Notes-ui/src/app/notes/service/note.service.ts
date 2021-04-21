import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Note } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private _baseUrl: string = `${environment.apiUrl}/note`;

  constructor(
    private http: HttpClient
  ) { }

  getNotes(){
    return this.http.get<Note[]>(this._baseUrl)
  }

  getNote(noteId: string | number){
    const url = `${this._baseUrl}/${noteId}`;
    return this.http.get<Note>(url);
  }

  saveNote(note: Note){
    return this.http.post(this._baseUrl, note);
  }

  deleteNote(noteId: string | number){
    const url = `${this._baseUrl}/${noteId}`;
    return this.http.delete(url);
  }

  updateNote(noteId: string | number, note: Note){
    const url = `${this._baseUrl}/${noteId}`;
    return this.http.put(url, note);
  }
}
