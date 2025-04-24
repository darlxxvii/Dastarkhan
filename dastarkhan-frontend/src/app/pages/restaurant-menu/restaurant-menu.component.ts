import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MenuService } from '../../services/menu.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-restaurant-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './restaurant-menu.component.html',
  styleUrls: ['./restaurant-menu.component.css']
})
export class RestaurantMenuComponent implements OnInit {
  restaurantId!: number;
  menuItems: any[] = [];

  constructor(private route: ActivatedRoute, private menuService: MenuService) {}

  ngOnInit(): void {
    const parentRoute = this.route.parent;
    if (parentRoute) {
      parentRoute.paramMap.subscribe(params => {
        const id = params.get('id');
        if (id) {
          this.restaurantId = Number(id);
          this.loadMenu();
        } else {
          console.error('restaurantId не найден в параметрах URL');
        }
      });
    } else {
      console.error('parent route not found');
    }
  }
  
  loadMenu() {
    const apiUrl = `http://localhost:8000/api/menu/?restaurant_id=${this.restaurantId}`;
    this.menuService.getMenu(apiUrl).subscribe({
      next: (data) => {
        this.menuItems = data;
      },
      error: (err) => {
        console.error('ошибка загрузки меню:', err);
      }
    });
  }
}
