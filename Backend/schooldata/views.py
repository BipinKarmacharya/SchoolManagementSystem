
from django.shortcuts import render
from rest_framework import viewsets
from .models import School
from .serializer import SchoolSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated


class SchoolViewSet(viewsets.ModelViewSet):
    queryset = School.objects.all()
    serializer_class = SchoolSerializer
    lookup_field = 'id'


