from rest_framework import serializers
from .models import SchoolClass

class SchoolClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = SchoolClass
        fields = '__all__'
        extra_kwargs = {'school': {'read_only': True}}  # Prevent school from being manually set
