from django.db import models
from django.contrib.auth.models import AbstractUser
from .manager import CustomUserManager


# Create your models here.
class CustomUser(AbstractUser):
    username=None
    full_name= models.CharField(max_length=100,null=True,blank=True)
    email=models.EmailField(max_length=100,unique=True)
    domain=models.CharField(max_length=50,null=True,blank=True)
    branch=models.CharField(max_length=50,null=True,blank=True)
    preferred_language=models.CharField(max_length=25,null=True,blank=True)
    level_of_understanding_of_preferred_language=models.CharField(max_length=25,null=True,blank=True)
    university=models.CharField(max_length=75,null=True,blank=True)
    academic_year=models.CharField(max_length=60,null=True,blank=True)

    objects=CustomUserManager()

    USERNAME_FIELD='email'
    REQUIRED_FIELDS=['full_name','domain','branch','preferred_language','level_of_understanding_of_preferred_language','university','academic_year'] 

    def __str__(self):
        return self.email