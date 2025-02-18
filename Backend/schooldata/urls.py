from django.contrib import admin
from django.urls import path, include
from schooldata.views import SchoolViewSet
from rest_framework import routers
from .views import SchoolDetailView
from schooldata.views import  SchoolDetailView, SchoolUpdateView


router = routers.DefaultRouter()
router.register('allschool', SchoolViewSet, basename='allschool')

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/school/<int:pk>', SchoolDetailView.as_view(), name='school-detail'),
    path('api/school/update/<int:pk>/', SchoolUpdateView.as_view(), name='school-update'),
]



