from rest_framework import serializers
from .models import Subject
from classes.models import SchoolClass

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = "__all__"
        extra_kwargs = {'code': {'required': False}}  # ✅ Make `code` optional

class SchoolClassWithSubjectsSerializer(serializers.ModelSerializer):
    subjects = SubjectSerializer(many=True, read_only=True)  # Fetch related subjects

    class Meta:
        model = SchoolClass
        fields = ["id", "name", "tuition_fee", "class_teacher", "subjects"]
