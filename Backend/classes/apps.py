# from django.db import models  # Ensure this is imported

# class SchoolClass(models.Model):
#     name = models.CharField(max_length=100, unique=True)
#     tuition_fee = models.FloatField()
    
#     # Foreign key reference to Employee (teacher)
#     class_teacher = models.ForeignKey(
#         'classes.Employee',  # Direct reference to Employee model in the same app
#         on_delete=models.SET_NULL, 
#         null=True, 
#         blank=True
#     )

#     def get_class_teacher_name(self):
#         # Check if a class teacher is assigned
#         if self.class_teacher:
#             return f"{self.class_teacher.first_name} {self.class_teacher.last_name}"
#         return "Not Assigned"

#     def __str__(self):
#         return self.name


from django.apps import AppConfig

class ClassesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'classes'