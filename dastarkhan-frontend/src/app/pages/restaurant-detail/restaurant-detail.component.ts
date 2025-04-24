import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RestaurantService } from '../../services/restaurant.service';
import * as L from 'leaflet';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-restaurant-detail',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.css']
})
export class RestaurantDetailComponent implements OnInit {
  restaurant: any;

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.restaurantService.getRestaurantById(id).subscribe({
      next: (res) => {
        this.restaurant = res;
        this.getCoordinatesFromAddress(this.restaurant.location)
          .then(coords => this.initMap(coords[0], coords[1]))
          .catch(err => console.error('Ошибка геокодинга:', err));
      },
      error: (err) => console.error('Ошибка загрузки ресторана:', err)
    });
  }

  getCoordinatesFromAddress(address: string): Promise<[number, number]> {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
    return fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
        } else {
          throw new Error('Координаты не найдены');
        }
      });
  }

  initMap(lat: number, lng: number): void {
    const map = L.map('map').setView([lat, lng], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    L.marker([lat, lng])
      .addTo(map)
      .bindPopup(this.restaurant.name)
      .openPopup();
  }
}