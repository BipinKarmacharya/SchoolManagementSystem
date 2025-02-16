# accounts/urls.py
from django.urls import path
from .views import (
    SchoolRegisterAPIView,
    StudentRegisterAPIView,
    EmployeeRegisterAPIView,
    LoginAPIView,
    ForgotPasswordAPIView,
    ChangePasswordAPIView,
    
)
from auth_sys.views import send_student_email

urlpatterns = [
    path('school/register/', SchoolRegisterAPIView.as_view(), name='school-register'),
    path('student/register/', StudentRegisterAPIView.as_view(), name='student-register'),
    path('employee/register/', EmployeeRegisterAPIView.as_view(), name='employee-register'),
    path('login/', LoginAPIView.as_view(), name='login'),
    path('forgot-password/', ForgotPasswordAPIView.as_view(), name='forgot-password'),
    path('change-password/', ChangePasswordAPIView.as_view(), name='change-password'),
    path('send-student-email/', send_student_email, name='send_student_email'),
]
