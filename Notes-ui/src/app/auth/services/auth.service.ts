import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../interfaces/inteface';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseUrl: string = `${environment.apiUrl}/auth`;

  constructor(
    private http: HttpClient
  ) { }

  login(email: string, password: string) {
    const url = `${this._baseUrl}/login`;
    return this.http.post<LoginResponse>(url, { email, password }).pipe(
      tap(resp => {
        localStorage.setItem('token', resp.token);
      }),
      map(resp => resp),
      catchError(err => of(err.error))
    )
  }

  renew(){
    const url = `${this._baseUrl}/renew`;
    return this.http.get<LoginResponse>(url).pipe(
      map(resp => {
        localStorage.setItem('token', resp.token);
        return resp.success;
      }),
      catchError(err => of(err.error))
    );
  }
}
