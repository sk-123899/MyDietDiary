from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from knox import views as knox_views



urlpatterns = [
    path('api/auth',include('knox.urls')),
    path('api/auth/register',views.RegistrationAPI.as_view()),
    path('api/auth/login',views.LoginAPI.as_view()),
    path('api/auth/user',views.UserAPI.as_view()),
    path('api/profile', views.profile_detail),
    path('api/auth/logout',knox_views.LogoutView.as_view(),name="knox-logout"),
    path('api/user/weight',views.get_user_weight),
    path('api/user/30-day-weight',views.get_30_day_weight),

]