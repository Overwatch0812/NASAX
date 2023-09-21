from .views import ProjectView
from django.urls import path,include

urlpatterns = [
    path('',ProjectView.as_view() ),
   
]