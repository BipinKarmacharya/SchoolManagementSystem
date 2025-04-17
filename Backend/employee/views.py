from django.shortcuts import get_object_or_404
from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.mail import send_mail
from django_filters.rest_framework import DjangoFilterBackend

from .models import Employee
from .serializer import EmployeeSerializer

# Full CRUD ViewSet with filtering
class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['first_name', 'last_name', 'email', 'employee_id', 'phone']

# Email API
class SendEmailView(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        subject = request.data.get('subject', 'Default Subject')
        message = request.data.get('message', 'Default Message')

        if email:
            send_mail(
                subject,
                message,
                'from@example.com',  # Replace with a valid sender address
                [email],
                fail_silently=False,
            )
            return Response({'message': 'Email sent successfully'}, status=status.HTTP_200_OK)

        return Response({'error': 'Email not provided'}, status=status.HTTP_400_BAD_REQUEST)






# from django.shortcuts import get_object_or_404
# from rest_framework import viewsets, generics, permissions, status
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from django.core.mail import send_mail
# from django_filters.rest_framework import DjangoFilterBackend

# from .models import Employee
# from .serializer import EmployeeSerializer


# # View to create a new Employee (handles POST)
# class EmployeeCreateView(generics.CreateAPIView):
#     queryset = Employee.objects.all()
#     serializer_class = EmployeeSerializer


# # View to retrieve and update Employee by ID (handles GET, PUT, PATCH)
# class EmployeeDetailUpdateView(generics.RetrieveUpdateAPIView):
#     queryset = Employee.objects.all()
#     serializer_class = EmployeeSerializer
#     permission_classes = [permissions.AllowAny]

#     def get_object(self):
#         return get_object_or_404(Employee, id=self.kwargs["pk"])


# # ViewSet for full CRUD and filtering
# class EmployeeViewSet(viewsets.ModelViewSet):
#     queryset = Employee.objects.all()
#     serializer_class = EmployeeSerializer
#     filter_backends = [DjangoFilterBackend]
#     filterset_fields = ['first_name', 'last_name', 'email', 'employee_id', 'phone']


# # API to send email
# class SendEmailView(APIView):
#     def post(self, request, *args, **kwargs):
#         email = request.data.get('email')
#         subject = request.data.get('subject', 'Default Subject')
#         message = request.data.get('message', 'Default Message')

#         if email:
#             send_mail(
#                 subject,
#                 message,
#                 'from@example.com',  # Replace with your actual "from" address
#                 [email],
#                 fail_silently=False,
#             )
#             return Response({'message': 'Email sent successfully'}, status=status.HTTP_200_OK)
        
#         return Response({'error': 'Email not provided'}, status=status.HTTP_400_BAD_REQUEST)
