import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface AuthResponse {
  access: string;
  refresh: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/token/`, {
      username, password
    });
  }

  register(username: string, password: string, email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/`, {
      username, password, email
    });
  }

  saveToken(token: AuthResponse) {
    localStorage.setItem('access_token', token.access);
    localStorage.setItem('refresh_token', token.refresh);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  logout() {
    localStorage.clear();
  }
}