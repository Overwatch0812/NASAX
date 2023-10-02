from django.shortcuts import render
from rest_framework import generics
from account.models import CustomUser
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from recommend.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
from api.models import project
User = get_user_model()

# Create your views here.


class Recommend(generics.ListAPIView):
    permission_classes = (AllowAny,)

    def get(self, request, id, domain):
        AllProjects = project.objects.all()
        # User = CustomUser.objects.get(id=id)
        # serializer = UserCreateSerializer(User)
        # id = serializer.data
        add = [id, domain]
        return Response(add)
