from django.db import models
from django.contrib.auth.models import AbstractUser
from .manager import CustomUserManager


# Create your models here.
class CustomUser(AbstractUser):
    username=None
    name= models.CharField(max_length=100,null=True,blank=True)
    email=models.EmailField(max_length=100,unique=True)
    domain=models.CharField(max_length=50)
    branch=models.CharField(max_length=50)
    preferred_language=models.CharField(max_length=25)
    level_of_understanding_of_preferred_language=models.CharField(max_length=25)
    university=models.CharField(max_length=75)
    academic_year=models.CharField(max_length=60)

    objects=CustomUserManager()

    USERNAME_FIELD='email'
    REQUIRED_FIELDS=[] 

    def __str__(self):
        return self.name