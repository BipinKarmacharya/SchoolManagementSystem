from django.contrib import admin
from django.urls import path, include
from schooldata.views import SchoolViewSet
from rest_framework import routers
from .views import SchoolDetailView

router = routers.DefaultRouter()
router.register('allschool', SchoolViewSet, basename='allschool')

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/school/', SchoolDetailView.as_view(), name='school-detail'),
]


