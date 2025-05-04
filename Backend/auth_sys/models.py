from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from schooldata.models import School

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, role=None, **extra_fields):
        """
        Creates and saves a User with the given email, password, and role.
        """
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, role=role, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """
        Creates and saves a superuser with the given email and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)
    

from django.conf import settings

class TimeStampedModel(models.Model):
    """Abstract base class with created/updated timestamps."""
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class CustomUser(AbstractUser):
    """
    Custom user model that extends AbstractUser.
    You can add additional fields (e.g., a role field) to distinguish between 
    school admins, students, and employees.
    """
    ROLE_CHOICES = (
        ('school_admin', 'School Admin'),
        ('student', 'Student'),
        ('Teacher', 'Teacher'),
    )
    role = models.CharField(
        max_length=20, choices=ROLE_CHOICES, null=True, blank=True,
        help_text="Designates the type of user: school admin, student, or employee."
    
    )

    # Use email as the unique identifier for authentication instead of username
    email = models.EmailField(unique=True)  # Ensure email is unique
    EMAIL_FIELD = 'email'
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    school = models.ForeignKey(School, on_delete=models.CASCADE, null=True, blank=True, related_name='users')

    objects = CustomUserManager()

    def save(self, *args, **kwargs):
        if not self.username:
            if self.role == 'student':
                # Fetch the related student instance
                student = getattr(self, 'student_profile', None)
                if student:
                    self.username = student.student_id
            else:
                self.username = self.email.split('@')[0]
        super().save(*args, **kwargs)

    def __str__(self):
        return self.email if self.email else 'No Email'