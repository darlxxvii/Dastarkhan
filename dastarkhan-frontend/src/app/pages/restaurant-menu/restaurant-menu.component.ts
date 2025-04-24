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
        this.restaurantId = Number(params.get('id'));
        console.log('ID из parent:', this.restaurantId);
        this.loadMenu();
      });
    } else {
      console.error('parent route not found');
    }
  }
  
  loadMenu() {
    this.menuService.getMenu(this.restaurantId).subscribe({
      next: (data) => {
        console.log('меню:', data);
        this.menuItems = data;
      },
      error: (err) => {
        console.error('ошибка загрузки меню:', err);
      }
    });
  }
  
  
  
}