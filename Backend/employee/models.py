from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from schooldata.models import School
from django.contrib.auth.models import User
from auth_sys.models import CustomUser

class Employee(models.Model):
    school = models.ForeignKey(School, on_delete=models.CASCADE)
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    employee_id = models.CharField(max_length=20, unique=True, blank=True)
    first_name = models.CharField(max_length=50)
    middle_name = models.CharField(max_length=50, blank=True, null=True)
    last_name = models.CharField(max_length=50)
    address = models.TextField()
    phone = models.CharField(max_length=15)
    n_id = models.CharField(max_length=15)
    email = models.EmailField(unique=True, blank=True, null=True)
    profile_image = models.ImageField(upload_to='employee_photos/', blank=True, null=True)
    blood_group = models.CharField(max_length=3, blank=True, null=True)  
    document1 = models.FileField(upload_to='employee_docs/', blank=True, null=True)
    document2 = models.FileField(upload_to='employee_docs/', blank=True, null=True)
    document3 = models.FileField(upload_to='employee_docs/', blank=True, null=True)
    date_of_enrollment = models.DateTimeField()
    department = models.CharField(max_length=100)
    designation = models.CharField(max_length=100)  # Added designation field
    salary = models.DecimalField(max_digits=10, decimal_places=2)  # Added salary field

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.employee_id})"

@receiver(post_save, sender=Employee)
def generate_employee_id(sender, instance, created, **kwargs):
    if created and not instance.employee_id:
        school_code = instance.school.school_code if instance.school and hasattr(instance.school, 'school_code') else 'SCH'
        instance.employee_id = f"EMP{school_code}{instance.pk:02d}"
        instance.save(update_fields=['employee_id'])