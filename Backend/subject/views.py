from rest_framework import viewsets
from .models import Subject
from .serializers import SubjectSerializer
from rest_framework.response import Response

class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer

    # ✅ Override list method to return subjects class-wise
    def list(self, request):
        classes = {}
        subjects = Subject.objects.select_related("school_class").all()

        for subject in subjects:
            class_name = subject.school_class.name
            if class_name not in classes:
                classes[class_name] = []
            classes[class_name].append({
                "name": subject.name,
                "full_marks": subject.full_marks,
                "pass_marks": subject.pass_marks,
                "subject_teacher": subject.subject_teacher
            })

        # ✅ Use DRF's Response instead of JsonResponse
        return Response({"subjects_by_class": classes})
