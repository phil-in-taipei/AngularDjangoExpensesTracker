from rest_framework import serializers

from currencies.serializers import CurrencySerializer
from .models import Expense, SpendingRecord


class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = ('id', 'expense_name',)


class SpendingRecordSerializer(serializers.ModelSerializer):
    expense = ExpenseSerializer(read_only=True)
    currency = CurrencySerializer(read_only=True)

    class Meta:
        model = SpendingRecord
        fields = '__all__'
