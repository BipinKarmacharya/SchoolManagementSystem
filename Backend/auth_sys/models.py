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
    
    # Make username nullable
    username = models.CharField(max_length=150, unique=True, null=True, blank=True)
    
    # Use email as the unique identifier for authentication instead of username
    email = models.EmailField(unique=True)  # Ensure email is unique
    EMAIL_FIELD = 'email'
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def save(self, *args, **kwargs):
        # Automatically generate a username if not provided
        if not self.username and self.role == 'student':
            # Fetch the related student instance
            student = getattr(self, 'student_profile', None)
            if student:
                self.username = student.student_id
        super().save(*args, **kwargs)

    def __str__(self):
        return self.email if self.email else 'No Email'

# Ensure to run the following commands to apply the changes to the database:
# python manage.py makemigrations
# python manage.py migrate