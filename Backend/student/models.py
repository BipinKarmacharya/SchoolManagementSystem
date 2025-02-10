from django.utils.timezone import now
from django.db import models

from schooldata.models import School

from django.db.models.signals import post_save
from django.dispatch import receiver


class Student(models.Model):
    school = models.ForeignKey(School, on_delete=models.CASCADE)
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
    date_of_birth = models.DateField()
    date_of_enrollment = models.DateTimeField()     
    gender = models.CharField(max_length=5)
    
    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.student_id})"
    # def save(self, *args, **kwargs):
    #   if not self.student_id:
    #     super().save(*args, **kwargs)
        
    #     enrollment_year = self.date_of_enrollment.year if self.date_of_enrollment else now().year
        
    #     # Updated to use school_code from the School model
    #     school_code = self.school.school_code if self.school and hasattr(self.school, 'school_code') else 'SCH'
        
    #     self.student_id = f"{school_code}{enrollment_year}{self.pk:04d}"
        
    #     kwargs['force_update'] = True
    #     super().save(*args, **kwargs)
    #   else:
    #     super().save(*args, **kwargs)

from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.timezone import now

@receiver(post_save, sender=Student)
def generate_student_id(sender, instance, created, **kwargs):
    if created and not instance.student_id:
        enrollment_year = instance.date_of_enrollment.year if instance.date_of_enrollment else now().year
        school_code = instance.school.school_code if instance.school and hasattr(instance.school, 'school_code') else 'SCH'
        instance.student_id = f"{school_code}{enrollment_year}{instance.pk:04d}"
        instance.save(update_fields=['student_id'])