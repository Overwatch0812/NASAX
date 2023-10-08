from django.urls import path
from .views import Suggest

urlpatterns = [
    path('<int:id>/',Suggest.as_view())
]
