from django.db import models
from schooldata.models import School
from employee.models import Employee

class SchoolClass(models.Model):
    school = models.ForeignKey(School, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    tuition_fee = models.DecimalField(max_digits=10, decimal_places=2)
    class_code = models.CharField(max_length=200, unique=True)
    school = models.ForeignKey(School, on_delete=models.CASCADE, related_name='classes')
    class_teacher = models.ForeignKey(
        Employee,
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True
    )

    def save(self, *args, **kwargs):
        if not self.pk:
            super().save(*args, **kwargs)  # Save once to get ID
        if not self.class_code:
            school_code = self.school.school_code
            self.class_code = f"{school_code}-{self.name[:3].upper()}-{self.pk}"
            return super().save(update_fields=["class_code"])  # Save again with code
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    class Meta:
        unique_together = ('school', 'name')  # Ensure class names are unique per school
