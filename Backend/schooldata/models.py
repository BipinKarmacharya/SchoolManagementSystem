from django.utils.timezone import now
from django.conf import settings
# Create your models here.
from django.db import models
# from auth_sys.models import CustomUser
##########  TABLE FOR SCHOOLS
class School(models.Model):
    school_code = models.CharField(max_length=4, unique=True)  
    name = models.CharField(max_length=255)
    address = models.TextField()
    telephone = models.CharField(max_length=15, blank=True, null=True)
    email = models.EmailField(unique=True)
    website = models.URLField(blank=True, null=True)
    logo = models.ImageField(upload_to='school_logos/', blank=True, null=True)
    established_date = models.DateField(blank=True, null=True)
    target_line = models.CharField(max_length=255, blank=True, null=True)
    total_students = models.PositiveIntegerField(default=0)
    total_teachers = models.PositiveIntegerField(default=0)
    admin = models.OneToOneField(
        settings.AUTH_USER_MODEL, 
        on_delete=models.SET_NULL,
        null=True, related_name='school_admin'
    )
    def __str__(self):
        return self.name
    

    