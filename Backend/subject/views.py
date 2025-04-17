from rest_framework import viewsets
from .models import Subject
from .serializers import SubjectSerializer
from rest_framework.response import Response

class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.select_related("school_class", "subject_teacher").all()
    serializer_class = SubjectSerializer

    def list(self, request):
        class_wise_subjects = {}
        for subject in self.queryset:
            class_name = subject.school_class.name
            if class_name not in class_wise_subjects:
                class_wise_subjects[class_name] = []
            class_wise_subjects[class_name].append({
                "name": subject.name,
                "full_marks": subject.full_marks,
                "pass_marks": subject.pass_marks,
                "subject_teacher": f"{subject.subject_teacher.first_name} {subject.subject_teacher.last_name}" if subject.subject_teacher else "Not Assigned",
                "code": subject.code
            })
        return Response({"subjects_by_class": class_wise_subjects})
