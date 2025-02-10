from django.contrib import admin
from django.urls import path,include
from student.views import StudentViewSet
from rest_framework import routers
route = routers.DefaultRouter()
route.register('students',StudentViewSet,basename='students')


urlpatterns = [
path('api/',include(route.urls))
]