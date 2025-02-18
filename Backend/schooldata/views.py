
from django.shortcuts import render
from rest_framework import viewsets
from .models import School
from .serializer import SchoolSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny


class SchoolViewSet(viewsets.ModelViewSet):
    queryset = School.objects.all()
    serializer_class = SchoolSerializer


class SchoolDetailView(generics.RetrieveUpdateAPIView):
    permission_classes = [AllowAny]
    serializer_class = SchoolSerializer

    def get_object(self):
        return self.request.user.school  # Assuming the user has a related school