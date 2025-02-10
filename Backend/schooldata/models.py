
from django.utils.timezone import now
# Create your models here.
from django.db import models
##########  TABLE FOR SCHOOLS
class School(models.Model):
    school_code = models.CharField(max_length=4, unique=True)  
    name = models.CharField(max_length=255, unique=True)
    address = models.TextField()
    telephone = models.CharField(max_length=15, blank=True, null=True)
    email = models.EmailField(unique=True)
    website = models.URLField(blank=True, null=True)
    logo = models.ImageField(upload_to='school_logos/', blank=True, null=True)
    established_date = models.DateField(blank=True, null=True)
    principal_name = models.CharField(max_length=255, blank=True, null=True)
    total_students = models.PositiveIntegerField(default=0)
    total_teachers = models.PositiveIntegerField(default=0)
  

    def __str__(self):
        return self.name
    

    