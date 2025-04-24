from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework.authtoken.views import obtain_auth_token


router = DefaultRouter()
router.register(r'restaurants', RestaurantViewSet)
router.register(r'tables', TableViewSet)
router.register(r'bookings', BookingViewSet)
router.register(r'menu', MenuItemViewSet)


urlpatterns = [
    # ViewSets (CRUD)
    path('', include(router.urls)),

    # Token Authentication
    path('login/', obtain_auth_token),
    path('logout/', logout_view,name='logout'),

    path('register/', register_user, name='register'),

    # JWT
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    path('create_booking/', create_booking, name='create_booking'),
    path('reviews/', create_review, name='create_review'),
    path('restaurants/<int:restaurant_id>/tables/', restaurant_tables, name='restaurant-tables'),
    path('reviews/<int:restaurant_id>/', restaurant_reviews, name='restaurant-reviews'),
    path('preorder/', create_preorder, name='create_preorder'),

]
