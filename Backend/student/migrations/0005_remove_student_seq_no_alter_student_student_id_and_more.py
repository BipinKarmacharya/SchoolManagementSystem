# Generated by Django 5.1.5 on 2025-02-06 15:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('student', '0004_alter_student_student_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='student',
            name='seq_no',
        ),
        migrations.AlterField(
            model_name='student',
            name='student_id',
            field=models.CharField(blank=True, max_length=20, unique=True),
        ),
        migrations.DeleteModel(
            name='StudentIDCounter',
        ),
    ]
