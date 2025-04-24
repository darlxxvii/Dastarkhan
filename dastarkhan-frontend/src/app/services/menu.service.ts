import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MenuService {
  private baseUrl = 'http://localhost:8000/api/restaurants/';

  constructor(private http: HttpClient) {}

  // Получить меню по restaurantId
  getMenu(restaurantId: number): Observable<any[]> {
    const url = `${this.baseUrl}${restaurantId}/menu/`;
    return this.http.get<any[]>(url);
  }
}