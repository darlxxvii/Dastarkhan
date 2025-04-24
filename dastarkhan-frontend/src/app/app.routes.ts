import { Routes } from '@angular/router';
import { RestaurantsComponent } from './pages/restaurants/restaurants.component';
import { RestaurantDetailComponent } from './pages/restaurant-detail/restaurant-detail.component';
import { RestaurantMenuComponent } from './pages/restaurant-menu/restaurant-menu.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { BookingFormComponent  } from './pages/booking-form/booking-form.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch:'full'},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationPageComponent },
  {
    path: 'restaurant/:id',
    component: RestaurantDetailComponent,
    children: [
      { path: 'menu', component: RestaurantMenuComponent },
      { path: 'reviews', component: ReviewsComponent },
      { path: 'booking', component: BookingFormComponent }
    ]
  }
  ,
  
  { path: 'restaurants', component: RestaurantsComponent }
];