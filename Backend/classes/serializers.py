from rest_framework import serializers
from .models import SchoolClass
from subject.models import Subject
from student.models import Student  # ✅ Import Student model

class SchoolClassSerializer(serializers.ModelSerializer):
    subject_count = serializers.SerializerMethodField()  
    total_students = serializers.SerializerMethodField()  # ✅ Add student count

    class Meta:
        model = SchoolClass
        fields = ["id", "name", "tuition_fee", "class_teacher", "subject_count", "total_students"]  # ✅ Include total_students

    def get_subject_count(self, obj):
        return Subject.objects.filter(school_class=obj).count()  

    def get_total_students(self, obj):
        return Student.objects.filter(enroll_class=obj).count()  # ✅ Count students for each class
