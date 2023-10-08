from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from django.http import HttpResponse
from .models import project
import json
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


class UpdateApiView(APIView):
    permission_classes = (AllowAny,)
    def post(self,request,format=None):
        serializer=ProjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return HttpResponse("Default Response")

class UserWithProject(APIView):
    permission_classes = (AllowAny,)
    def get(self, request, id, format=None):
        try:
            project_instance = project.objects.filter(email=id)
            serializer = ProjectSerializer(project_instance,many=True)
            data=json.dumps(serializer.data)
            return HttpResponse(data)
        except project.DoesNotExist:
            return HttpResponse({"error": "Project not found"}, status=status.HTTP_404_NOT_FOUND)
    

    