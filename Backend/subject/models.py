from django.db import models
from classes.models import SchoolClass
from employee.models import Employee

class Subject(models.Model):
    name = models.CharField(max_length=100)
    school_class = models.ForeignKey(SchoolClass, related_name="subjects", on_delete=models.CASCADE)
    full_marks = models.IntegerField(default=100)
    pass_marks = models.IntegerField(default=40)
    
    subject_teacher = models.ForeignKey(Employee, on_delete=models.SET_NULL, null=True, blank=True)
    code = models.CharField(max_length=100, unique=True, blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.pk:
            super().save(*args, **kwargs)
        if not self.code:
            class_code = self.school_class.class_code
            subject_index = Subject.objects.filter(school_class=self.school_class).count()
            self.code = f"{class_code}-SUB{subject_index + 1}"
            return super().save(update_fields=["code"])
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} - {self.school_class.name}"

    class Meta:
        unique_together = ('school_class', 'name')
