from django.shortcuts import render
from rest_framework import viewsets
from .models import Student
from .serializer import StudentSerializer
from django_filters.rest_framework import DjangoFilterBackend


class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['first_name', 'last_name', 'email','student_id','phone']


from rest_framework import generics, permissions
from .models import Student
# from .serializer import StudentupdateSerializer
from .permissions import IsAdminUser

class StudentUpdateView(generics.RetrieveUpdateAPIView):
    """
    API endpoint to update student details.
    Only authenticated admins can update.
    """
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = []

    def get_object(self):
        student_id = self.kwargs["pk"]  # Fetch student by ID from URL
        return Student.objects.get(id=student_id)



# student/views.py
from rest_framework import generics
from .models import Student
from .serializer import StudentSerializer

class StudentCreateView(generics.CreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class StudentDetailUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer



from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Student
from .serializer import StudentSerializer

class StudentListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = StudentSerializer

    def get_queryset(self):
        user = self.request.user
        school = user.school  # Assuming the user has a related school
        return Student.objects.filter(school=school)