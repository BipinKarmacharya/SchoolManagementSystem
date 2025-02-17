from django.urls import path
from .views import SchoolClassListCreateView

urlpatterns = [
    path('api/classes/', SchoolClassListCreateView.as_view(), name='class-list-create'),
]
