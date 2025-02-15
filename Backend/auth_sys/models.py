from django.db import models

# Create your models here.
# accounts/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    """
    Custom user model that extends AbstractUser.
    You can add additional fields (e.g., a role field) to distinguish between 
    school admins, students, and employees.
    """
    ROLE_CHOICES = (
        ('school_admin', 'School Admin'),
        ('student', 'Student'),
        ('employee', 'Employee'),
    )
    role = models.CharField(
        max_length=20, choices=ROLE_CHOICES, null=True, blank=True,
        help_text="Designates the type of user: school admin, student, or employee."
    )
    
    # You can add more fields here if necessary.

    def __str__(self):
        return self.username
