from django.shortcuts import render,get_object_or_404
from rest_framework import viewsets,generics
from .serializers import ProfileSerializer,UserSerializer,RegisterSerializer,LoginSerializer,WeightSerializer
from rest_framework.response import Response
from knox.models import AuthToken
from .models import Profile,User,Weight
from rest_framework.decorators import api_view,permission_classes
from rest_framework import permissions
from datetime import datetime as dt,timedelta
# Create your views here.

@api_view(['GET','PUT'])
@permission_classes([permissions.IsAuthenticated,])
def profile_detail(request):
    profile = Profile.objects.get(id=request.user.profile.id)
    if request.method == 'GET':
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)
    
    if request.method == 'PUT':
        serializer = ProfileSerializer(profile,data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=profile.user)
        return Response(serializer.data)

class RegistrationAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self,request,*args,**kwargs):
        # all data is going to be in the request argument
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        _, token = AuthToken.objects.create(user)
        return Response({
            "user":UserSerializer(user,context=self.get_serializer_context()).data,
            "token":token
        })


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self,request,*args,**kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        _, token = AuthToken.objects.create(user)
        return Response({
            "user":UserSerializer(user,context=self.get_serializer_context()).data,
            "token":token
        })

class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


@api_view(['GET','POST'])
@permission_classes([permissions.IsAuthenticated,])
def get_user_weight(request):
    today = dt.today()
    profile = Profile.objects.get(id=request.user.profile.id)

    if request.method == "GET":
        try:
            user_weight = Weight.objects.get(user=request.user.profile.id,date_recorded=today)
            return Response({"weight":user_weight.number})
        except:
            return Response({"error":"Weight record does not exist for today","weight":0})
    

    if request.method == "POST":
        #check if object exists
    
        if Weight.objects.filter(user=request.user.profile.id,date_recorded=today).exists():
            user_weight = Weight.objects.get(user=request.user.profile.id,date_recorded=today)
            #update value
            serializer = WeightSerializer(user_weight,data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save(user=profile)
        else:
            serializer = WeightSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save(user=profile)
        return Response({"message":"Updated user weight","weight":serializer.data})

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated,])
def get_30_day_weight(request):
    today = dt.today()
    thirty_days_ago = today - timedelta(30)
    user_weight = Weight.objects.filter(user=request.user.profile.id,date_recorded__gte=thirty_days_ago)
    serializer=WeightSerializer(user_weight,many=True)
    return Response({
        "message":"Here's yo food",
        "data":serializer.data
    })
