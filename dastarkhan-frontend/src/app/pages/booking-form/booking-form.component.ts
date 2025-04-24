import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent implements OnInit {
  restaurantId!: number;

  selectedDate = '';
  selectedTime = '';
  tables: any[] = [];
  selectedTableId: number | null = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const parent = this.route.parent;
    parent?.paramMap.subscribe(params => {
      this.restaurantId = Number(params.get('id'));
    });
  }

  getAvailableTables() {
    if (!this.selectedDate || !this.selectedTime) {
      alert('Выберите дату и время');
      return;
    }

    const body = {
      date: this.selectedDate,
      time: this.selectedTime
    };

    this.http.post<any[]>(`http://localhost:8000/api/restaurants/${this.restaurantId}/available_tables/`, body)
      .subscribe({
        next: (data) => {
          this.tables = data;
          this.selectedTableId = null;
        },
        error: () => alert('Ошибка загрузки доступных столов')
      });
  }

  onSelectTable(tableId: number) {
    this.selectedTableId = tableId;
  }

  onBook() {
    if (!this.selectedTableId || !this.selectedDate || !this.selectedTime) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const body = {
      restaurant_id: this.restaurantId,
      table_id: this.selectedTableId,
      date: this.selectedDate,
      time: this.selectedTime
    };

    this.http.post('http://localhost:8000/api/create_booking/', body, { headers }).subscribe({
      next: () => alert('Бронирование успешно!'),
      error: (err) => {
        console.error(err);
        alert('Ошибка при бронировании');
      }
    });
  }
}