from rest_framework import serializers
from .models import project
from account.models import CustomUser



class ProjectSerializer(serializers.ModelSerializer):
    author=serializers.SlugRelatedField(
        queryset=CustomUser.objects.all(), slug_field='email'
    )
    class Meta:
        model=project
        fields='__all__'
        depth = 1