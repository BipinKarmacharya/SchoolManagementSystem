
from django.shortcuts import render
from django.shortcuts import get_object_or_404

from rest_framework import viewsets
from .models import School
from .serializer import SchoolSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated


class SchoolViewSet(viewsets.ModelViewSet):
    queryset = School.objects.all()
    serializer_class = SchoolSerializer




class SchoolDetailView(generics.RetrieveAPIView):
    queryset = School.objects.all()
    serializer_class = SchoolSerializer
    # permission_classes = [IsAuthenticated]

    def get_object(self):
        # Assuming the school ID is passed as a URL parameter
        school_id = self.kwargs['pk']
        return get_object_or_404(School, pk=school_id)


# class SchoolDetailView(generics.RetrieveUpdateAPIView):
#     # permission_classes = [IsAuthenticated]
#     serializer_class = SchoolSerializer

#     def get_object(self):
#         return self.request.user.school  # Assuming the user has a related school
    

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .serializer import SchoolSerializer

class SchoolUpdateView(generics.UpdateAPIView):
    queryset = School.objects.all()
    serializer_class = SchoolSerializer
    # permission_classes = [IsAuthenticated]

    def get_object(self):
        # Assuming the school ID is passed as a URL parameter
        school_id = self.kwargs['pk']
        return School.objects.get(pk=school_id)    