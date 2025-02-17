

from django.contrib import admin
from django.urls import path,include
from parent.views import ParentViewSet
from rest_framework import routers
route = routers.DefaultRouter()
route.register('parents',ParentViewSet,basename='parents')


urlpatterns = [
path('api/',include(route.urls)),
 
]
