import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

interface AuthResponse {
  accessToken: string;
}

const AUTH_API = 'http://localhost:5139/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthResponse | null> {
    return this.http.post<AuthResponse>(
      AUTH_API + 'login', {email, password,},
      httpOptions
    ).pipe(
      map(response => {
        localStorage.setItem('JWT_Token', response.accessToken);
        return response;
      }),
      catchError(error => {
        console.log(error);
        return of(null);
      })
    );
  }

  register(email: string, password: string): Observable<boolean> {
    return this.http.post<any>(
      AUTH_API + 'register', { email, password },
      { observe: 'response' }
      ).pipe(
      map(response => response.status === 200),
      catchError(() => of(false))
    );
  }

  logout(): void {
    localStorage.removeItem('JWT_Token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('JWT_Token');
  }
}
