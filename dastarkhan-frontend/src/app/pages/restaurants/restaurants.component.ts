import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantService } from '../../services/restaurant.service';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MapComponent } from '../map/map.component';
@Component({
  selector: 'app-restaurants',
  standalone: true,
  imports: [CommonModule, RouterModule, MapComponent],
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {
  restaurants: any[] = [];
  filteredRestaurants: any[] = [];
  search: string = '';
  loading: boolean = true;

  constructor(private restaurantService: RestaurantService, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.restaurantService.getRestaurants().subscribe({
      next: (data) => {
        this.restaurants = data;
        this.filteredRestaurants = data;
        this.loading = false;
      },
      error: () => {alert('Ошибка загрузки ресторанов');
          this.loading = false;}

    });
  }
  onSearchChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.search = input.value;

    if (this.search) {
      this.filteredRestaurants = this.restaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(this.search.toLowerCase()) ||
        restaurant.location.toLowerCase().includes(this.search.toLowerCase())
      );
    } else {
      this.filteredRestaurants = this.restaurants;
    }
  }

  logout() {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    this.router.navigate(['/login']);
  }

  
}

