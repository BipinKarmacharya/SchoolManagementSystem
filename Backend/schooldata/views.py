
from django.shortcuts import render
from django.shortcuts import get_object_or_404

from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView



# from rest_framework import viewsets
from .models import School
from .serializer import SchoolSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet


# class SchoolViewSet(viewsets.ModelViewSet):
#     queryset = School.objects.all()
#     serializer_class = SchoolSerializer


# class SchoolDetailView(generics.RetrieveUpdateAPIView):
#     permission_classes = [AllowAny]
#     serializer_class = SchoolSerializer
#     # permission_classes = [IsAuthenticated]

#     def get_object(self):
#         # Assuming the school ID is passed as a URL parameter
#         school_id = self.kwargs['pk']
#         return get_object_or_404(School, pk=school_id)


# class SchoolDetailView(generics.RetrieveUpdateAPIView):
#     # permission_classes = [IsAuthenticated]
#     serializer_class = SchoolSerializer

#     def get_object(self):
#         return self.request.user.school  # Assuming the user has a related school
class SchoolView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        school = request.user.school
        serializer = SchoolSerializer(school)
        return Response(serializer.data)

    def put(self, request):
        school = request.user.school
        serializer = SchoolSerializer(school, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)


class SchoolUpdateView(generics.UpdateAPIView):
    queryset = School.objects.all()
    serializer_class = SchoolSerializer
    # permission_classes = [IsAuthenticated]

    def get_object(self):
        # Assuming the school ID is passed as a URL parameter
        school_id = self.kwargs['pk']
        return School.objects.get(pk=school_id)    