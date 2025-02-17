from rest_framework import serializers
from .models import Student

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

from rest_framework import serializers
from .models import Student

class StudentupdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = [
            'school', 'user', 'student_id', 'first_name', 'middle_name', 'last_name',
            'address', 'enroll_class', 'phone', 'email', 'profile_image', 'blood_group',
            'religion', 'document1', 'document2', 'document3', 'date_of_birth', 'date_of_enrollment', 'gender'
        ]
        read_only_fields = ['student_id', 'user']  # Prevent these from being modified

    def update(self, instance, validated_data):
        """
        Custom update logic for Student model
        """
        for attr, value in validated_data.items():
            setattr(instance, attr, value)  # Dynamically update fields
        instance.save()
        return instance



# student/serializers.py
# from rest_framework import serializers
# from .models import Student
# from auth_sys.serializers import CustomUserSerializer

# class StudentSerializer(serializers.ModelSerializer):
#     # Nest the CustomUserSerializer to handle user data
#     user = CustomUserSerializer()

#     class Meta:
#         model = Student
#         fields = [
#             'id',
#             'school',
#             'user',          # CustomUser data: first_name, last_name, email, password
#             'student_id',    # Read-only or generated elsewhere
#             'first_name',    # Student-specific fields (optional duplication)
#             'middle_name',
#             'last_name',
#             'address',
#             'enroll_class',
#             'phone',
#             'email',         # If you need a student-specific email
#             'profile_image',
#             'blood_group',
#             'religion',
#             'document1',
#             'document2',
#             'document3',
#             'date_of_birth',
#             'date_of_enrollment',
#             'gender'
#         ]
#         read_only_fields = ['student_id', 'id']

#     def create(self, validated_data):
#         # Separate the nested user data from the student data
#         user_data = validated_data.pop('user')
#         # Create the CustomUser record
#         user = CustomUserSerializer.create(CustomUserSerializer(), validated_data=user_data)
#         # Create the Student record and link it to the newly created user
#         student = Student.objects.create(user=user, **validated_data)
#         return student

#     def update(self, instance, validated_data):
#         # Update nested user data if present
#         user_data = validated_data.pop('user', None)
#         if user_data:
#             CustomUserSerializer.update(CustomUserSerializer(), instance.user, user_data)
#         # Update the remaining student fields
#         for attr, value in validated_data.items():
#             setattr(instance, attr, value)
#         instance.save()
#         return instance



# student/serializers.py
from rest_framework import serializers
from .models import Student
from auth_sys.serializers import CustomUserSerializer

class StudentSerializer(serializers.ModelSerializer):
    # The nested serializer is required by default (no 'required=False')
    user = CustomUserSerializer()

    class Meta:
        model = Student
        fields = [
            'id',
            'school',
            'user',          # Nested user data is required.
            'student_id',    # This field is auto-generated.
            'first_name',    # Student-specific fields (if you want to duplicate, or use these for additional info).
            'middle_name',
            'last_name',
            'address',
            'enroll_class',
            'phone',
            'email',         # This could be a student-specific email.
            'profile_image',
            'blood_group',
            'religion',
            'document1',
            'document2',
            'document3',
            'date_of_birth',
            'date_of_enrollment',
            'gender'
        ]
        read_only_fields = ['student_id', 'id']

    def create(self, validated_data):
        # Since 'user' is required, pop it without a default value.
        user_data = validated_data.pop('user')
        # Create the CustomUser instance using the nested serializer's create method.
        user = CustomUserSerializer.create(CustomUserSerializer(), validated_data=user_data)
        # Create the Student instance linked to the newly created user.
        student = Student.objects.create(user=user, **validated_data)
        return student

    def update(self, instance, validated_data):
        # Handle nested user update if provided.
        user_data = validated_data.pop('user', None)
        if user_data:
            CustomUserSerializer.update(CustomUserSerializer(), instance.user, user_data)
        # Update the remaining student-specific fields.
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
