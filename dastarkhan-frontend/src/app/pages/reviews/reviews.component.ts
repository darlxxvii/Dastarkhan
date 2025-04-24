import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  restaurantId!: number;
  reviews: any[] = [];

  rating = 0;
  comment = '';
  submitting = false;

  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(params => {
      this.restaurantId = Number(params.get('id'));
      this.loadReviews();
    });
  }

  loadReviews() {
    this.reviewService.getReviews(this.restaurantId).subscribe(data => this.reviews = data);
  }

  submitReview() {
    if (!this.rating || !this.comment) {
      alert('Пожалуйста, поставьте оценку и напишите комментарий');
      return;
    }

    const token = localStorage.getItem('access_token');
    if (!token) {
      alert('Вы должны войти в аккаунт');
      return;
    }

    const body = {
      restaurant_id: this.restaurantId,
      rating: this.rating,
      comment: this.comment
    };

    this.submitting = true;

    this.reviewService.createReview(token, body).subscribe({
      next: () => {
        alert('Спасибо за отзыв!');
        this.rating = 0;
        this.comment = '';
        this.submitting = false;
        this.loadReviews();
      },
      error: () => {
        alert('Ошибка при отправке отзыва');
        this.submitting = false;
      }
    });
  }
}