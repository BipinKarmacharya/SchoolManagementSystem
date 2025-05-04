from rest_framework import viewsets, permissions
from .models import Student
from .serializer import StudentSerializer
from django_filters.rest_framework import DjangoFilterBackend
from schooldata.models import School  # import your School model correctly

# Student ViewSet for full CRUD and filtering
class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [permissions.AllowAny]  # Change to IsAuthenticated later
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['first_name', 'last_name', 'email', 'student_id']


    def perform_create(self, serializer):
        try:
            # Hardcoded for testing — fetch school with code "LEC"
            school = School.objects.get(school_code='LEC')
            serializer.save(school=school)
        except School.DoesNotExist:
            raise serializer.ValidationError({"school": "School with code 'LEC' does not exist."})
    
    def get_queryset(self):
        try:
            school = School.objects.get(school_code='LEC')
            return Student.objects.filter(school=school)
        except School.DoesNotExist:
            return Student.objects.none()