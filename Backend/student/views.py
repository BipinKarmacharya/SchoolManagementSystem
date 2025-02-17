from django.shortcuts import render
from rest_framework import viewsets
from .models import Student
from .serializer import StudentSerializer

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

from rest_framework import generics, permissions
from .models import Student
from .serializer import StudentupdateSerializer
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
