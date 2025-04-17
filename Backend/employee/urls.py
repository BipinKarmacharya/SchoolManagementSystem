from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import EmployeeViewSet, SendEmailView

router = DefaultRouter()
router.register(r'', EmployeeViewSet, basename='employee')

urlpatterns = router.urls + [
    path('send-email/', SendEmailView.as_view(), name='send-email'),
]





# from django.urls import path, include
# from rest_framework.routers import DefaultRouter
# from .views import EmployeeViewSet, EmployeeCreateView, EmployeeDetailUpdateView

# router = DefaultRouter()
# router.register(r'', EmployeeViewSet, basename='employees')

# urlpatterns = router.urls +[
#     path('register/', EmployeeCreateView.as_view(), name='employee-register'),
#     path('<int:pk>/', EmployeeDetailUpdateView.as_view(), name='employee-detail-update'),
# ]