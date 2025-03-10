from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EmployeeViewSet
from .views import EmployeeCreateView, EmployeeDetailUpdateView



router = DefaultRouter()
router.register(r'employees', EmployeeViewSet, basename='employees')

urlpatterns = [
    path('api/', include(router.urls)),
    
    path('api/employee/register/', EmployeeCreateView.as_view(), name='employee-register'),
    path('api/employee/<int:pk>/', EmployeeDetailUpdateView.as_view(), name='employee-detail-update'),
]



