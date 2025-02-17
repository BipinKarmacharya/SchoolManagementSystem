# from rest_framework import generics, permissions
# from .models import SchoolClass
# from .serializers import SchoolClassSerializer

# class SchoolClassListCreateView(generics.ListCreateAPIView):
#     serializer_class = SchoolClassSerializer
#     permission_classes = [permissions.IsAuthenticated]  # Only logged-in users can access

#     def get_queryset(self):
#         return SchoolClass.objects.filter(school=self.request.user.school)

#     def perform_create(self, serializer):
#         serializer.save(school=self.request.user.school)  # Assign the class to the admin's school



from rest_framework import generics, permissions
from .models import SchoolClass
from .serializers import SchoolClassSerializer

class SchoolClassListCreateView(generics.ListCreateAPIView):
    queryset = SchoolClass.objects.all()
    serializer_class = SchoolClassSerializer
    permission_classes = [permissions.AllowAny]  # ✅ No authentication required
