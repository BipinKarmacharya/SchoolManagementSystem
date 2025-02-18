from django.contrib import admin
from django.urls import path, include
from schooldata.views import SchoolViewSet
from rest_framework import routers
# from .views import SchoolDetailView

router = routers.DefaultRouter()
router.register('allschool/<int:id>', SchoolViewSet, basename='allschool')

urlpatterns = [
    path('api/', include(router.urls)),
    # path('api/school/<int:id>', SchoolDetailView.as_view(), name='school-detail'),
]


