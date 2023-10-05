from rest_framework import serializers

from .models import IncomeSource


class IncomeSourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = IncomeSource
        fields = ('id', 'income_source_name')

