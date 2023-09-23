from django.shortcuts import render
from rest_framework import generics
from .models import project
from .serializers import ProjectSerializer

from rest_framework.permissions import AllowAny
# Create your views here.

class ProjectView(generics.ListAPIView):
    permission_classes = (AllowAny,)

    queryset=project.objects.all()
    serializer_class=ProjectSerializer
