# accounts/views.py
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import update_session_auth_hash
from .serializers import (
    SchoolRegisterSerializer, 
    StudentRegisterSerializer,
    EmployeeRegisterSerializer,
    LoginSerializer, 
    ForgotPasswordSerializer, 
    ChangePasswordSerializer
)

# --- School Registration ---
class SchoolRegisterAPIView(generics.CreateAPIView):
    """
    API endpoint for registering a school admin.
    Expects: school_code, email, address, and password.
    """
    permission_classes = [AllowAny]
    serializer_class = SchoolRegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()  # creates School and linked CustomUser
        return Response(
            {"message": "School registered successfully."},
            status=status.HTTP_201_CREATED
        )

# --- Student Registration ---
class StudentRegisterAPIView(generics.CreateAPIView):
    """
    API endpoint for registering a student.
    Expects: student_id, email, name, age, and password.
    """
    permission_classes = [AllowAny]
    serializer_class = StudentRegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()  # creates Student and linked CustomUser
        return Response(
            {"message": "Student registered successfully."},
            status=status.HTTP_201_CREATED
        )

# --- Employee Registration ---
class EmployeeRegisterAPIView(generics.CreateAPIView):
    """
    API endpoint for registering an employee.
    Expects: employee_id, email, name, age, and password.
    """
    permission_classes = [AllowAny]
    serializer_class = EmployeeRegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()  # creates Employee and linked CustomUser
        return Response(
            {"message": "Employee registered successfully."},
            status=status.HTTP_201_CREATED
        )

# --- Login ---
class LoginAPIView(generics.GenericAPIView):
    """
    API endpoint for login.
    Expects: identifier, email, and password.
    """
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        # In a real-world scenario, return a token here (e.g., JWT).
        return Response(
            {
                "message": "Logged in successfully.",
                "role": user.role
            },
            status=status.HTTP_200_OK
        )

# --- Forgot Password ---
class ForgotPasswordAPIView(generics.GenericAPIView):
    """
    API endpoint for forgot password.
    Expects an email and returns a message.
    """
    permission_classes = [AllowAny]
    serializer_class = ForgotPasswordSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        # Add logic here to send reset instructions via email.
        return Response(
            {"message": "Password reset instructions have been sent to your email."},
            status=status.HTTP_200_OK
        )

# --- Change Password ---
class ChangePasswordAPIView(generics.UpdateAPIView):
    """
    API endpoint for changing password.
    Requires authentication.
    Expects: current_password and new_password.
    """
    permission_classes = [IsAuthenticated]
    serializer_class = ChangePasswordSerializer

    def get_object(self):
        # Return the current user.
        return self.request.user

    def update(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = self.get_object()
        user.set_password(serializer.validated_data['new_password'])
        user.save()
        update_session_auth_hash(request, user)
        return Response(
            {"message": "Password changed successfully."},
            status=status.HTTP_200_OK
        )
