import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private baseUrl = 'http://localhost:8000/api/reviews/';

  constructor(private http: HttpClient) {}

  getReviews(restaurantId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}${restaurantId}/`);
  }

  createReview(token: string, body: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.baseUrl, body, { headers });
  }
}