from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SubjectViewSet

router = DefaultRouter()
router.register(r'', SubjectViewSet)

urlpatterns = router.urls+[
    path('', include(router.urls)),
]
