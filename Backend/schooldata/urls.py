from django.contrib import admin
from django.urls import path, include
from schooldata.views import SchoolView
# from rest_framework import routers
# from .views import SchoolDetailView
from schooldata.views import  SchoolUpdateView


# router = routers.DefaultRouter()
# router.register('allschool', SchoolView, basename='allschool')
urlpatterns = [
    # path('', include(router.urls)),
    path('me/', SchoolView.as_view(), name='school-detail'),
    path('update/<int:pk>/', SchoolUpdateView.as_view(), name='school-update'),
]



