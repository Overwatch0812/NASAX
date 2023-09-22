from django.shortcuts import render
from rest_framework import generics
from .models import project
from .serializers import ProjectSerializer
# Create your views here.

class ProjectView(generics.ListAPIView):
    queryset=project.objects.all()
    serializer_class=ProjectSerializer
