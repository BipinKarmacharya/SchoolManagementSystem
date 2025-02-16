# accounts/serializers.py
from rest_framework import serializers
from django.contrib.auth import authenticate
from auth_sys.models import CustomUser
from schooldata.models import School
from student.models import Student
from employee.models import Employee

# --- School Registration (already provided) ---
class SchoolRegisterSerializer(serializers.ModelSerializer):
    """
    Serializer for school admin registration.
    Expects: school_code, email, address, and password.
    """
    password = serializers.CharField(write_only=True)

    class Meta:
        model = School
        fields = ['name','school_code', 'email', 'address', 'password']

    def create(self, validated_data):
        # Create the School instance.
        school = School.objects.create(
            name=validated_data['name'],
            school_code=validated_data['school_code'],
            email=validated_data['email'],
            address=validated_data['address'],
        )
        # Create a CustomUser for the school admin.
        user = CustomUser.objects.create_user(
            username=validated_data['school_code'],  # using school_code as username
            email=validated_data['email'],
            password=validated_data['password'],
            role='school_admin'
        )
        # Link the user to the school record.
        school.admin_user = user
        school.save()
        return school

# --- Student Registration ---
class StudentRegisterSerializer(serializers.ModelSerializer):
    """
    Serializer for student registration.
    Expects: student_id, email, password, and school_id.
    """
    password = serializers.CharField(write_only=True)
    school_id = serializers.PrimaryKeyRelatedField(queryset=School.objects.all(), required=True)

    class Meta:
        model = Student
        fields = ['student_id', 'email', 'password', 'school_id']

    def create(self, validated_data):
        # Extract and remove school_id before creating a user
        school = validated_data.pop('school_id')

        # Create a CustomUser for the student.
        user = CustomUser.objects.create_user(
            username=validated_data['student_id'],
            email=validated_data['email'],
            password=validated_data['password'],
            role='student'
        )
        # Create the Student instance and link the user.
        student = Student.objects.create(
            user=user,
            student_id=validated_data['student_id'],
            school=school  # Assign school_id correctly
        )
        return student


# --- Employee Registration ---
class EmployeeRegisterSerializer(serializers.ModelSerializer):
    """
    Serializer for employee registration.
    Expects: employee_id, email, name, age, and password.
    """
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Employee
        fields = ['employee_id', 'name',  'email', 'password']

    def create(self, validated_data):
        # Create a CustomUser for the employee.
        # Using employee_id as username.
        user = CustomUser.objects.create_user(
            username=validated_data['employee_id'],
            email=validated_data['email'],
            password=validated_data['password'],
            role='employee'
        )
        # Create the Employee instance and link the user.
        employee = Employee.objects.create(
            user=user,
            employee_id=validated_data['employee_id'],
        
        )
        return employee

# --- Existing Login, Forgot Password, Change Password serializers remain unchanged ---
class LoginSerializer(serializers.Serializer):
    """
    Serializer for login.
    The 'identifier' field is:
      - school_code for school admins,
      - student_id for students, or
      - employee_id for employees.
    """
    identifier = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        identifier = data.get('identifier')
        email = data.get('email')
        password = data.get('password')
        
        # Here we assume that the identifier is stored as the username.
        user = authenticate(username=identifier, password=password)
        if not user:
            raise serializers.ValidationError("Invalid credentials.")
        if user.email != email:
            raise serializers.ValidationError("Email does not match the user.")
        data['user'] = user
        return data

class ForgotPasswordSerializer(serializers.Serializer):
    """
    Serializer for forgot password functionality.
    """
    email = serializers.EmailField(required=True)

    def validate_email(self, value):
        if not CustomUser.objects.filter(email=value).exists():
            raise serializers.ValidationError("User with this email does not exist.")
        return value

class ChangePasswordSerializer(serializers.Serializer):
    """
    Serializer for changing the password.
    Requires the current password and the new password.
    """
    current_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True)

    def validate_current_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError("Current password is incorrect.")
        return value
