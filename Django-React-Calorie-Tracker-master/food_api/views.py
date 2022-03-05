from django.shortcuts import render
from rest_framework import viewsets,permissions
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from .serializers import FoodSerializer
from .models import Food
from user_api.models import Profile
from user_api.serializers import UserSerializer,ProfileSerializer
from django.utils import timezone
from datetime import datetime as dt,timedelta
from django.db.models import Sum

# Create your views here.

class FoodLogViewSet(viewsets.ModelViewSet):
    serializer_class = FoodSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        today = dt.today()
        tomorrow = today + timedelta(1)
        return Food.objects.filter(user=self.request.user.profile.id,date_eaten__range=[today,tomorrow])
    
    def perform_create(self,serializer):
        serializer.save(user=self.request.user.profile)

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated,])
def breakfast_list(request):
    #query breakfast foods for that day
    #check how this filter chain works
    today = dt.today()
    tomorrow = today + timedelta(1)
    try:
        breakfast = Food.objects.filter(user=request.user.profile.id,category="B",date_eaten__range=[today,tomorrow])
        print(breakfast)
        serializer = FoodSerializer(breakfast,many=True)
        return Response({"message":"here's yo food","data":serializer.data})
    except:
        return Response({"message":"No breakfast found"})
    

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated,])
def lunch_list(request):
    #query lunch foods for that day
    #check how this filter chain works
    today = dt.today()
    tomorrow = today + timedelta(1)
    try:
        lunch = Food.objects.filter(user=request.user.profile.id,category="L",date_eaten__range=[today,tomorrow])
        serializer = FoodSerializer(lunch,many=True)
        return Response({"message":"here's yo food","data":serializer.data})
    except:
        return Response({"message":"No lunch found"})
 
@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated,])
def dinner_list(request):
    # query dinner foods for that day
    #check how this filter chain works
    today = dt.today()
    tomorrow = today + timedelta(1)
    try:
        dinner = Food.objects.filter(user=request.user.profile.id,category="D",date_eaten__range=[today,tomorrow])
        serializer = FoodSerializer(dinner,many=True)
        return Response({"message":"here's yo food","data":serializer.data})
    except:
        return Response({"message":"No dinner found"})
 
@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated,])
def snack_list(request):
    # query snack foods for that day
     #check how this filter chain works
    today = dt.today()
    tomorrow = today + timedelta(1)
    try:
        snack = Food.objects.filter(user=request.user.profile.id,category="S",date_eaten__range=[today,tomorrow])
        serializer = FoodSerializer(snack,many=True)
        return Response({"message":"here's yo food","data":serializer.data})
    except:
        return Response({"message":"No snacks found"})
 
@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated,])
def cheat_list(request):
    # query cheat foods for that day
     #check how this filter chain works
    today = dt.today()
    tomorrow = today + timedelta(1)
    try:
        cheat = Food.objects.filter(user=request.user.profile.id,category="C",date_eaten__range=[today,tomorrow])
        serializer = FoodSerializer(cheat,many=True)
        return Response({"message":"here's yo food","data":serializer.data})
    except:
        return Response({"message":"No cheat meals found"})


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated,])
def total_user_calories(request):
    # food for today
    today = dt.today()
    tomorrow = today + timedelta(1)
    user_food = Food.objects.filter(user=request.user.profile.id,date_eaten__range=[today,tomorrow])
    total = user_food.aggregate(Sum('total_calories'),Sum('fat'),Sum('protein'),Sum('carbs'))
    totalCalories = total["total_calories__sum"]
    fatCalories = total["fat__sum"]
    proteinCalories = total["protein__sum"]
    carbsCalories = total["carbs__sum"]

    return Response({"message":"here's you food data","data":{"date":today,"totalCalories":totalCalories,"fatCalories":fatCalories,"proteinCalories":proteinCalories,"carbsCalories":carbsCalories}})


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_30_days_calories(request):
    today = dt.today()
    thirty_days_ago = today - timedelta(30)
    user_food = Food.objects.filter(user=request.user.profile.id,date_eaten__gte=thirty_days_ago)
    filtered_food = user_food.values('date_eaten').annotate(totalCalories=Sum('total_calories'))
    return Response({
        "message":"Here's yo food",
        "data":filtered_food
    })
