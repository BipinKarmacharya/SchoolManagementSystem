from django.db import models
from student.models import Student
# Create your models here.
class Parent(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    phone = models.CharField(max_length=15)
    email = models.EmailField(unique=True)
    pdocument = models.FileField(upload_to='parents_documents/', blank=True, null=True)
    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.student.student_id})"