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

class FoodPreOrderSerializerManual(serializers.Serializer):
    item_name = serializers.CharField(source='menu_item.name', read_only=True)
    quantity = serializers.IntegerField()
    table_id = serializers.IntegerField(source='table.id', read_only=True)
    preorder_time = serializers.DateTimeField()

    def create(self, validated_data):
        return FoodPreOrder.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.quantity = validated_data.get('quantity', instance.quantity)
        instance.preorder_time = validated_data.get('preorder_time', instance.preorder_time)
        instance.save()
        return instance

class BookingShortSerializer(serializers.Serializer):
    restaurant_name = serializers.CharField(source='restaurant.name', read_only=True)
    date = serializers.DateField()
    time = serializers.TimeField()

    def create(self, validated_data):
        return Booking.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.date = validated_data.get('date', instance.date)
        instance.time = validated_data.get('time', instance.time)
        instance.save()
        return instance

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'title', 'completed'] 