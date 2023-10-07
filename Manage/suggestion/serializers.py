from rest_framework import serializers
from django.contrib.auth import get_user_model
User=get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=('id','full_name','email','domain','branch','preferred_language','level_of_understanding_of_preferred_language','university','academic_year')