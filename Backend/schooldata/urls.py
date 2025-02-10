from django.contrib import admin
from django.urls import path, include
from schooldata.views import SchoolViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register('school', SchoolViewSet, basename='school')

urlpatterns = [
    path('api/', include(router.urls)),
]