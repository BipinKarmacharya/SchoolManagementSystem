from django.db import models

class SchoolClass(models.Model):
    name = models.CharField(max_length=100)
    tuition_fee = models.FloatField()
    class_teacher = models.CharField(max_length=100)

    def __str__(self):
        return self.name
