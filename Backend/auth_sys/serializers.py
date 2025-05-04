# accounts/serializers.py

from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.conf import settings
from schooldata.models import School
from student.models import Student
from employee.models import Employee
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # Adjust fields based on your User model
        fields = ['id', 'username', 'email', 'role']

# --- Password Strength Validator ---


def validate_password_strength(password):
    if len(password) < 8:
        raise serializers.ValidationError(
            "Password must be at least 8 characters long.")
    if not any(c.isdigit() for c in password):
        raise serializers.ValidationError(
            "Password must contain at least one digit.")
    if not any(c.isupper() for c in password):
        raise serializers.ValidationError(
            "Password must contain at least one uppercase letter.")
    if not any(c in "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~" for c in password):
        raise serializers.ValidationError(
            "Password must contain at least one special character.")
    return password

# --- School Registration ---


class SchoolRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[
                                     validate_password_strength])

    class Meta:
        model = School
        fields = ['name', 'school_code', 'email', 'address', 'password']

    def create(self, validated_data):
        school = School.objects.create(
            name=validated_data['name'],
            school_code=validated_data['school_code'],
            email=validated_data['email'],
            address=validated_data['address'],
        )
        user = User.objects.create_user(
            username=validated_data['school_code'],
            email=validated_data['email'],
            password=validated_data['password'],
            role='School Admin'
        )
        school.admin_user = user
        school.save()
        return school

# --- Student Registration ---


class StudentRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[
                                     validate_password_strength])
    school_id = serializers.PrimaryKeyRelatedField(
        queryset=School.objects.all(), required=True)

    class Meta:
        model = Student
        fields = ['student_id', 'email', 'password', 'school_id']

    def create(self, validated_data):
        school = validated_data.pop('school_id')
        user = User.objects.create_user(
            username=validated_data['student_id'],
            email=validated_data['email'],
            password=validated_data['password'],
            role='student'
        )
        student = Student.objects.create(
            user=user,
            student_id=validated_data['student_id'],
            school=school
        )

        # Send email
        try:
            send_mail(
                subject="Welcome to School Management System",
                message=f"Dear Student,\n\nYour ID: {student.student_id}\nEmail: {user.email}\n\nRegards,\nSchool Team",
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[user.email],
                fail_silently=False
            )
        except Exception as e:
            # Log the error (replace with your logging mechanism)
            print(f"Error sending email: {e}")

        return student

# --- Employee Registration ---


class EmployeeRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[
                                     validate_password_strength])
    school_id = serializers.PrimaryKeyRelatedField(
        queryset=School.objects.all(), required=True)

    class Meta:
        model = Employee
        fields = ['employee_id', 'name', 'email', 'password', 'school_id']

    def create(self, validated_data):
        school = validated_data.pop('school_id')
        user = User.objects.create_user(
            username=validated_data['employee_id'],
            email=validated_data['email'],
            password=validated_data['password'],
            role='Teacher'
        )
        employee = Employee.objects.create(
            user=user,
            employee_id=validated_data['employee_id'],
            school=school
        )

        # Send email
        try:
            send_mail(
                subject="Welcome to School Management System",
                message=f"Dear Teacher,\n\nYour ID: {employee.employee_id}\nEmail: {user.email}\n\nRegards,\nSchool Team",
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[user.email],
                fail_silently=False
            )
        except Exception as e:
            # Log the error (replace with your logging mechanism)
            print(f"Error sending email: {e}")

        return employee

# --- Login ---
# class LoginSerializer(serializers.Serializer):
#     email = serializers.EmailField(required=True)
#     password = serializers.CharField(write_only=True)
#     role = serializers.ChoiceField(choices=[('School Admin', 'School Admin'), ('student', 'student'), ('Teacher', 'Teacher')], required=True)

#     def validate(self, data):
#         email = data.get('email')
#         password = data.get('password')
#         role = data.get('role')

#         try:
#             user = User.objects.get(email=email, role=role)
#         except User.DoesNotExist:
#             raise serializers.ValidationError("Invalid email or role.")

#         if not user.check_password(password):
#             raise serializers.ValidationError("Incorrect password.")

#         data['user'] = user
#         return data


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True)
    role = serializers.ChoiceField(
        choices=[('School Admin', 'School Admin'), ('student', 'student'), ('Teacher', 'Teacher')],
        required=True
    )

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')
        role = data.get('role')

        try:
            user = User.objects.get(email=email, role=role)
        except User.DoesNotExist:
            raise serializers.ValidationError("Invalid email or role.")

        if not user.check_password(password):
            raise serializers.ValidationError("Incorrect password.")

        if not user.is_active:
            raise serializers.ValidationError("User is not active.")

        # Return the actual user object (not a dict)
        return {"user": user}
# --- Forgot Password ---


class ForgotPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)

    def validate_email(self, value):
        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "User with this email does not exist.")
        return value

# --- Change Password ---


class ChangePasswordSerializer(serializers.Serializer):
    current_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True, validators=[
                                         validate_password_strength])

    def validate_current_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError("Current password is incorrect.")
        return value


# serializers.py (continued)

# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
# from rest_framework_simplejwt.exceptions import AuthenticationFailed

# class StudentTokenObtainPairSerializer(TokenObtainPairSerializer):
#     @classmethod
#     def get_token(cls, user):
#         token = super().get_token(user)
#         # Include role in token claims
#         token['role'] = user.role
#         return token

#     def validate(self, attrs):
#         data = super().validate(attrs)
#         # Enforce that only users with role 'student' can use this endpoint
#         if self.user.role != 'student':
#             raise AuthenticationFailed('No permission for student login')
#         data['role'] = self.user.role
#         return data

# class TeacherTokenObtainPairSerializer(TokenObtainPairSerializer):
#     @classmethod
#     def get_token(cls, user):
#         token = super().get_token(user)
#         token['role'] = user.role
#         return token

#     def validate(self, attrs):
#         data = super().validate(attrs)
#         if self.user.role != 'teacher':
#             raise AuthenticationFailed('No permission for teacher login')
#         data['role'] = self.user.role
#         return data

# class schoolTokenObtainPairSerializer(TokenObtainPairSerializer):
#     @classmethod
#     def get_token(cls, user):
#         token = super().get_token(user)
#         token['role'] = user.role
#         return token

#     def validate(self, attrs):
#         data = super().validate(attrs)
#         if self.user.role != 'admin':
#             raise AuthenticationFailed('No permission for admin login')
#         data['role'] = self.user.role
#         return data
