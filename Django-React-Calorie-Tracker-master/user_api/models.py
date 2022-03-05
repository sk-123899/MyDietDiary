from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
# Create your models here.

class Profile(models.Model):
    daily_calories = models.IntegerField(null=True)
    goal_weight = models.FloatField(null=True)
    user = models.OneToOneField(User,on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username

def post_save_user_model_receiver(sender,instance,created,*args,**kwargs):
    if created:
        Profile.objects.create(user=instance)
    else:
        pass

class Weight(models.Model):
    user = models.ForeignKey(Profile,on_delete=models.CASCADE)
    number = models.FloatField()
    date_recorded = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} - {self.number} - {self.date_recorded}"


post_save.connect(post_save_user_model_receiver,sender=User)
