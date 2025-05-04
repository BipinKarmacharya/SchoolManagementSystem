from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view
from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth import update_session_auth_hash
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import (
    SchoolRegisterSerializer, 
    StudentRegisterSerializer,
    EmployeeRegisterSerializer,
    LoginSerializer, 
    ForgotPasswordSerializer, 
    ChangePasswordSerializer,
 
)

# --- School Registration ---
class SchoolRegisterAPIView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = SchoolRegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message": "School registered successfully."}, status=status.HTTP_201_CREATED)

# --- Student Registration ---
class StudentRegisterAPIView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = StudentRegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message": "Student registered successfully."}, status=status.HTTP_201_CREATED)

# --- Employee Registration ---
class EmployeeRegisterAPIView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = EmployeeRegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message": "Employee registered successfully."}, status=status.HTTP_201_CREATED)

# --- Login ---

class LoginAPIView(generics.GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']  # This is now the actual User object

        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "message": "Logged in successfully.",
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "user": {
                    "id": user.id,
                    "email": user.email,
                    "role": user.role,
                
                }
            },
            status=status.HTTP_200_OK
        )
# --- Forgot Password ---
class ForgotPasswordAPIView(generics.GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = ForgotPasswordSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        # You can implement password reset email logic here
        return Response(
            {"message": "Password reset instructions have been sent to your email."},
            status=status.HTTP_200_OK
        )

# --- Change Password ---
class ChangePasswordAPIView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ChangePasswordSerializer

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = self.get_object()
        user.set_password(serializer.validated_data['new_password'])
        user.save()
        update_session_auth_hash(request, user)
        return Response({"message": "Password changed successfully."}, status=status.HTTP_200_OK)

# --- Send Email to Student ---
@api_view(['POST'])
def send_student_email(request):
    student_id = request.data.get('student_id')
    email = request.data.get('email')
    password = request.data.get('password')

    if not all([student_id, email, password]):
        return Response({"error": "Missing required fields."}, status=400)

    subject = "Your School Management System Login Details"
    message = (
        f"Dear Student,\n\n"
        f"Here are your login details:\n"
        f"Student ID: {student_id}\n"
        f"Email: {email}\n"
        f"Password: {password}\n\n"
        f"Regards,\nSchool Management Team"
    )
    try:
        send_mail(subject, message, settings.EMAIL_HOST_USER, [email])
        return Response({"message": "Email sent successfully."}, status=200)
    except Exception as e:
        return Response({"error": str(e)}, status=500)

# --- Send Email to Employee ---
@api_view(['POST'])
def send_employee_email(request):
    employee_id = request.data.get('employee_id')
    email = request.data.get('email')
    password = request.data.get('password')

    if not all([employee_id, email, password]):
        return Response({"error": "Missing required fields."}, status=400)

    subject = "Your School Management System Login Details"
    message = (
        f"Dear Teacher,\n\n"
        f"Here are your login details:\n"
        f"Teacher ID: {employee_id}\n"
        f"Email: {email}\n"
        f"Password: {password}\n\n"
        f"Regards,\nSchool Management Team"
    )
    try:
        send_mail(subject, message, settings.EMAIL_HOST_USER, [email])
        return Response({"message": "Email sent successfully."}, status=200)
    except Exception as e:
        return Response({"error": str(e)}, status=500)




# views.py (continued)

from rest_framework_simplejwt.views import TokenObtainPairView

# class StudentLoginAPIView(TokenObtainPairView):
#     serializer_class = StudentTokenObtainPairSerializer

# class TeacherLoginAPIView(TokenObtainPairView):
#     serializer_class = TeacherTokenObtainPairSerializer

# class AdminLoginAPIView(TokenObtainPairView):
#     serializer_class = schoolTokenObtainPairSerializer
