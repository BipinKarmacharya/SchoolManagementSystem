from rest_framework import serializers
from .models import Student
from auth_sys.serializers import CustomUserSerializer  # Ensure `auth_sys` is a valid app
from classes.models import SchoolClass  # Ensure `classes` app and `SchoolClass` model exist
from schooldata.models import School  # Ensure `schooldata` app and `School` model exist

class StudentSerializer(serializers.ModelSerializer):
    enroll_class = serializers.PrimaryKeyRelatedField(queryset=SchoolClass.objects.all())

    class Meta:
        model = Student
        fields = '__all__'
        read_only_fields = ['student_id', 'id']

    def validate_enroll_class(self, value):
        """
        Ensure that the class the student is enrolled in belongs to the same school.
        """
        request = self.context.get('request')
        user = getattr(request, 'user', None)

        try:
            if user and user.is_authenticated and hasattr(user, 'school'):
                user_school = user.school
            else:
                # fallback for testing
                user_school = School.objects.get(school_code='LEC')
        except School.DoesNotExist:
            raise serializers.ValidationError("School with code 'LEC' does not exist.")

        if value.school != user_school:
            raise serializers.ValidationError("This class does not belong to the current school.")
        return value

    def create(self, validated_data):
        # Make sure to correctly handle `enroll_class` which expects a pk value, not a dict.
        user_data = validated_data.pop('user')
        user = CustomUserSerializer.create(CustomUserSerializer(), validated_data=user_data)
        enroll_class = validated_data.get('enroll_class')

        if isinstance(enroll_class, dict):  # Ensure it's a pk value
            validated_data['enroll_class'] = enroll_class.get('id', None)

        student = Student.objects.create(user=user, **validated_data)
        return student

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None)
        if user_data:
            CustomUserSerializer.update(CustomUserSerializer(), instance.user, user_data)
        enroll_class = validated_data.get('enroll_class')

        if isinstance(enroll_class, dict):  # Ensure it's a pk value
            validated_data['enroll_class'] = enroll_class.get('id', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
