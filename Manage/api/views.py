from django.shortcuts import render
from rest_framework import generics
from .models import project
from .serializers import ProjectSerializer

from rest_framework.permissions import AllowAny
# Create your views here.

class CreateProjectView(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    queryset=project.objects.all()
    serializer_class=ProjectSerializer


class ProjectView(generics.RetrieveAPIView):
    permission_classes = (AllowAny,)
    queryset=project.objects.all()
    serializer_class=ProjectSerializer
    lookup_field='pk'


class AllProjectView(generics.ListAPIView):
    permission_classes = (AllowAny,)
    queryset=project.objects.all()
    serializer_class=ProjectSerializer

class DeleteApiView(generics.DestroyAPIView):
    permission_classes = (AllowAny,)
    queryset=project.objects.all()
    serializer_class=ProjectSerializer
    lookup_field='pk'

    def perform_destroy(self,instance):
        super().perform_destroy(instance)


class UpdateApiView(generics.UpdateAPIView):
    permission_classes = (AllowAny,)
    queryset=project.objects.all()
    serializer_class=ProjectSerializer
    lookup_field='pk'
    
    
    def perform_update(self,serializer):
        instance=serializer.save()

