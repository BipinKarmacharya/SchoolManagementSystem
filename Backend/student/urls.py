from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.urls import path
from .views import StudentViewSet

router = DefaultRouter()
router.register(r'', StudentViewSet, basename='student')

urlpatterns = router.urls

# Add authentication endpoints
urlpatterns += [
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]