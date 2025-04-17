from rest_framework import serializers
from .models import Subject
from classes.models import SchoolClass
from employee.models import Employee

class SubjectSerializer(serializers.ModelSerializer):
    code = serializers.CharField(read_only=True)
    subject_teacher = serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all(), required=False)
    subject_teacher_name = serializers.SerializerMethodField()

    class Meta:
        model = Subject
        fields = [
            "id", "name", "school_class", "full_marks",
            "pass_marks", "subject_teacher", "subject_teacher_name", "code"
        ]

    def get_subject_teacher_name(self, obj):
        if obj.subject_teacher:
            return f"{obj.subject_teacher.first_name} {obj.subject_teacher.last_name}"
        return "Not Assigned"
