from django.urls import path
from .views import Recommend

urlpatterns = [
    path(r'<int:id>/<str:domain>/', Recommend.as_view())
]
