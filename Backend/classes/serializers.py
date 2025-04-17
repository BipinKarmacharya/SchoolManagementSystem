from rest_framework import serializers
from .models import SchoolClass
from subject.models import Subject
from student.models import Student
from employee.models import Employee

class SchoolClassSerializer(serializers.ModelSerializer):
    class_code = serializers.CharField(read_only=True)
    subject_count = serializers.SerializerMethodField()
    total_students = serializers.SerializerMethodField()
    class_teacher = serializers.PrimaryKeyRelatedField(
        queryset=Employee.objects.all(), required=False
    )
    class_teacher_name = serializers.SerializerMethodField()

    class Meta:
        model = SchoolClass
        fields = [
            "id", "class_code", "name", "tuition_fee",
            "class_teacher", "class_teacher_name",
            "subject_count", "total_students"
        ]

    def get_subject_count(self, obj):
        return Subject.objects.filter(school_class=obj).count()

    def get_total_students(self, obj):
        return Student.objects.filter(enroll_class=obj).count()

    def get_class_teacher_name(self, obj):
        if obj.class_teacher:
            return f"{obj.class_teacher.first_name} {obj.class_teacher.last_name}"
        return "Not Assigned"