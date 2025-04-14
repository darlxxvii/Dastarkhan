from django.contrib import admin
from .models import *

admin.site.register(Restaurant)
admin.site.register(Table)
admin.site.register(Booking)
@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('user', 'restaurant', 'comment','rating')
admin.site.register(MenuItem)
admin.site.register(FoodPreOrder)
