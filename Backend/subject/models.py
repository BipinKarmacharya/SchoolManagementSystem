from django.db import models
from classes.models import SchoolClass  # ✅ Import SchoolClass correctly

class Subject(models.Model):
    name = models.CharField(max_length=100)
    school_class = models.ForeignKey(
        SchoolClass, related_name="subjects", on_delete=models.CASCADE
    )  # ✅ Ensure ForeignKey exists
    full_marks = models.IntegerField(default=100)
    pass_marks = models.IntegerField(default=40)
    subject_teacher = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.name} - {self.school_class.name}"
