from django.shortcuts import render

# Create your views here.


# from django.contrib.auth.models import User
# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from .models import School

# @api_view(["POST"])
# def register_school(request):
#     school_name = request.data.get("schoolName")
#     email = request.data.get("email")
#     password = request.data.get("password")

#     if User.objects.filter(username=email).exists():
#         return Response({"error": "School already registered"}, status=400)

#     admin_user = User.objects.create_user(username=email, email=email, password=password)
#     School.objects.create(name=school_name, admin=admin_user)

#     return Response({"message": "School registered successfully"}, status=201)
