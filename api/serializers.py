from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User

class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = '__all__'

class TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = '__all__'

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        user.is_active = True  
        user.save()
        return user

class MenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
        fields = '__all__'

class FoodPreOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodPreOrder
        fields = '__all__'
