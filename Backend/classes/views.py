from rest_framework import viewsets, permissions
from django.shortcuts import get_object_or_404
from .models import School, SchoolClass
from .serializers import SchoolClassSerializer

class SchoolClassViewSet(viewsets.ModelViewSet):
    queryset = SchoolClass.objects.all()
    serializer_class = SchoolClassSerializer
    permission_classes = [permissions.AllowAny]  # Replace later with proper permissions

    def perform_create(self, serializer):
        # For now, hardcoding the school
        school_code = "LEC"
        school = get_object_or_404(School, school_code=school_code)
        serializer.save(school=school)