from rest_framework import serializers
from .models import Employee

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'



from rest_framework import serializers
from .models import Employee
from auth_sys.serializers import CustomUserSerializer

class EmployeeSerializer(serializers.ModelSerializer):
    # The nested serializer is required by default (no 'required=False')
    user = CustomUserSerializer()

    class Meta:
        model = Employee
        fields = [
            'id',
            'school',
            'user',          # Nested user data is required.
            'employee_id',   # This field is auto-generated.
            'first_name',    # Employee-specific fields.
            'middle_name',
            'last_name',
            'address',
            'phone',
            'n_id',
            'email',         # This could be an employee-specific email.
            'profile_image',
            'blood_group',
            'document1',
            'document2',
            'document3',
            'date_of_enrollment',
            'department',
            'designation',
            'salary',
        
           
        ]
        read_only_fields = ['employee_id', 'id']

    def create(self, validated_data):
        # Since 'user' is required, pop it without a default value.
        user_data = validated_data.pop('user')
        # Create the CustomUser instance using the nested serializer's create method.
        user = CustomUserSerializer.create(CustomUserSerializer(), validated_data=user_data)
        # Create the Employee instance linked to the newly created user.
        employee = Employee.objects.create(user=user, **validated_data)
        return employee

    def update(self, instance, validated_data):
        # Handle nested user update if provided.
        user_data = validated_data.pop('user', None)
        if user_data:
            CustomUserSerializer.update(CustomUserSerializer(), instance.user, user_data)
        # Update the remaining employee-specific fields.
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance