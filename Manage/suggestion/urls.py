from django.urls import path
from .views import Suggest

urlpatterns = [
    path('',Suggest.as_view())
]
