from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'api/food-log',views.FoodLogViewSet,basename='food-log')



urlpatterns = [
    path('api/user/total-calories',views.total_user_calories),

    # react component URLS
    path('api/breakfast',views.breakfast_list),
    path('api/lunch',views.lunch_list),
    path('api/dinner',views.dinner_list), 
    path('api/snacks',views.snack_list),   
    path('api/cheat',views.cheat_list), 

    path('api/30-day-calories',views.get_30_days_calories),
]

urlpatterns += router.urls