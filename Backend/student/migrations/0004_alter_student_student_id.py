# Generated by Django 5.1.5 on 2025-02-06 15:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('student', '0003_alter_student_date_of_enrollment'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='student_id',
            field=models.CharField(blank=True, default='DEF', max_length=20, unique=True),
        ),
    ]
