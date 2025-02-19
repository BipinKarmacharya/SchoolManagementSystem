from django.shortcuts import get_object_or_404
from rest_framework import viewsets, generics, permissions
from .models import Employee
from .serializer import EmployeeSerializer
from django_filters.rest_framework import DjangoFilterBackend


# class EmployeeViewSet(viewsets.ModelViewSet):
#     queryset = Employee.objects.all()
#     serializer_class = EmployeeSerializer

class EmployeeCreateView(generics.CreateAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

class EmployeeDetailUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    permission_classes = []

    def get_object(self):
        employee_id = self.kwargs["pk"]  # Fetch employee by ID from URL
        return get_object_or_404(id=employee_id)

class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['first_name', 'last_name', 'email','employee_id','phone']


from django.core.mail import send_mail
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class SendEmailView(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        subject = request.data.get('subject', 'Default Subject')
        message = request.data.get('message', 'Default Message')

        if email:
            send_mail(
                subject,
                message,
                'from@example.com',  # Replace with your "from" email address
                [email],
                fail_silently=False,
            )
            return Response({'message': 'Email sent successfully'}, status=status.HTTP_200_OK)
        return Response({'error': 'Email not provided'}, status=status.HTTP_400_BAD_REQUEST)