from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import *
from .serializers import *
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

class RestaurantViewSet(viewsets.ModelViewSet):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)
    
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

class TableViewSet(viewsets.ModelViewSet):
    queryset = Table.objects.all()
    serializer_class = TableSerializer

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class MenuItemViewSet(viewsets.ModelViewSet):
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer

    def get_queryset(self):
        restaurant_id = self.request.query_params.get('restaurant_id')
        if restaurant_id:
            return self.queryset.filter(restaurant_id=restaurant_id)
        return self.queryset.none()
    
class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

@api_view(['GET'])
def restaurant_tables(request, restaurant_id):
    try:
        tables = Table.objects.filter(restaurant_id=restaurant_id, is_available=True)
        serializer = TableSerializer(tables, many=True)
        return Response(serializer.data)
    except Restaurant.DoesNotExist:
        return Response({'error': 'Restaurant not found'}, status=404)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_preorder(request):
    user = request.user
    restaurant_id = request.data.get('restaurant_id')
    item_ids = request.data.get('item_ids', [])
    note = request.data.get('note', '')

    try:
        restaurant = Restaurant.objects.get(id=restaurant_id)
        preorder = FoodPreOrder.objects.create(user=user, restaurant=restaurant, note=note)
        preorder.items.set(MenuItem.objects.filter(id__in=item_ids))
        preorder.save()

        serializer = FoodPreOrderSerializer(preorder)
        return Response(serializer.data, status=201)
    except Exception as e:
        return Response({'error': str(e)}, status=400)

@api_view(['POST'])
def register_user(request):
    if request.method == 'POST':
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')

        if User.objects.filter(username=username).exists():
            return Response({'detail': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, email=email, password=password)
        user.is_active = True  
        user.save()

        return Response({'detail': 'User created successfully'}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_booking(request):
    user = request.user
    restaurant_id = request.data.get('restaurant_id')
    table_id = request.data.get('table_id')
    date = request.data.get('date')
    time = request.data.get('time')

    try:
        restaurant = Restaurant.objects.get(id=restaurant_id)
        table = Table.objects.get(id=table_id)
    except (Restaurant.DoesNotExist, Table.DoesNotExist):
        return Response({'detail': 'Restaurant or Table not found'}, status=status.HTTP_404_NOT_FOUND)
        
    exists = Booking.objects.filter(
        table=table,
        date=date,
        time=time
    ).exists()

    if exists:
        return Response({'error': 'This table is already booked at that time'}, status=400)

    booking = Booking.objects.create(
        user=user,
        restaurant=restaurant,
        table=table,
        date=date,
        time=time
    )

    return Response({'detail': 'Booking created successfully'}, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def restaurant_reviews(request, restaurant_id):
    try:
        reviews = Review.objects.filter(restaurant_id=restaurant_id)
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)
    except:
        return Response({'error': 'Ошибка при получении столов'}, status=400)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_review(request):
    user = request.user
    restaurant_id = request.data.get('restaurant_id')
    rating = request.data.get('rating')
    comment = request.data.get('comment')

    try:
        restaurant = Restaurant.objects.get(id=restaurant_id)
    except Restaurant.DoesNotExist:
        return Response({'detail': 'Restaurant not found'}, status=status.HTTP_404_NOT_FOUND)

    review = Review.objects.create(
        user=user,
        restaurant=restaurant,
        rating=rating,
        comment=comment
    )

    restaurant.update_average_rating()

    serializer = ReviewSerializer(review)
    return Response(serializer.data, status=201)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    try:
        refresh_token = request.data["refresh"]
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response({"message": "Logged out successfully"}, status=205)
    except Exception as e:
        return Response({"error": str(e)}, status=400)