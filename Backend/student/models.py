from django.utils.timezone import now
from django.db import models
from django.contrib.auth.models import User
from auth_sys.models import CustomUser
from schooldata.models import School

from django.db.models.signals import post_save
from django.dispatch import receiver


class Student(models.Model):
    school = models.ForeignKey(School, on_delete=models.CASCADE)
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='student_profile',null=True)
    student_id = models.CharField(max_length=20, unique=True, blank=True)
    first_name = models.CharField(max_length=50)
    middle_name = models.CharField(max_length=50, blank=True, null=True)
    last_name = models.CharField(max_length=50)
    address = models.TextField()
    enroll_class = models.IntegerField(null=True, blank=True)
    phone = models.CharField(max_length=15)
    email = models.EmailField(unique=True, blank=True, null=True)
    profile_image = models.ImageField(upload_to='profile_picture/', blank=True, null=True)
    blood_group = models.CharField(max_length=3, blank=True, null=True)
    religion = models.CharField(max_length=50, blank=True, null=True)
    document1 = models.FileField(upload_to='documents/', blank=True, null=True)
    document2 = models.FileField(upload_to='documents/', blank=True, null=True)
    document3 = models.FileField(upload_to='documents/', blank=True, null=True)
    date_of_birth = models.DateField(null=True, blank=True)  # Set null=True and blank=True
    date_of_enrollment = models.DateTimeField(null=True, blank=True)  # Set null=True and blank=True
    gender = models.CharField(max_length=10)
    
    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.student_id})"
    

from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.timezone import now

@receiver(post_save, sender=Student)
def generate_student_id(sender, instance, created, **kwargs):
    if created and not instance.student_id:
        enrollment_year = instance.date_of_enrollment.year if instance.date_of_enrollment else now().year
        school_code = instance.school.school_code if instance.school and hasattr(instance.school, 'school_code') else 'SCH'
        instance.student_id = f"{school_code}{enrollment_year}{instance.pk:02d}"
        instance.save(update_fields=['student_id'])