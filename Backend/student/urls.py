from django.contrib import admin
from django.urls import path,include
from student.views import StudentViewSet
from rest_framework import routers
route = routers.DefaultRouter()
route.register('students',StudentViewSet,basename='students')
from .views import StudentUpdateView
from .views import StudentCreateView
from .views import StudentDetailUpdateView
from .views import StudentListView
urlpatterns = [
path('api/',include(route.urls)),
path('students/<int:pk>/update/', StudentUpdateView.as_view(), name='update-student'),
path('api/studentregister/', StudentCreateView.as_view(), name='student-create'),
path('api/studentregister/<int:pk>/', StudentDetailUpdateView.as_view(), name='student-detail-update'),
path('api/school-students/', StudentListView.as_view(), name='student-list'),
]


