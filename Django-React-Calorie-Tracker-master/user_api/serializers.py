from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile,Weight
from django.contrib.auth import authenticate

class WeightSerializer(serializers.ModelSerializer):
    class Meta:
        model = Weight
        fields = ['number','date_recorded']

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['daily_calories']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','profile']

# Register serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','password']
        extra_kwargs = {'password':{'write_only':True}}


    def create(self,validated_data):
        user = User.objects.create_user(username=validated_data['username'],password=validated_data['password'])
        return user


# Login serializer
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self,data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")

