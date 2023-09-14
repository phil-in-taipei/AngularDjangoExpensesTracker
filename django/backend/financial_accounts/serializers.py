from rest_framework import serializers
from django.contrib.auth import get_user_model

from user_profiles.serializers import UserSerializer
from currencies.serializers import CurrencySerializer
from .models import Bank, SavingsAccount

User = get_user_model()


class BankSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bank
        fields = '__all__'


class SavingsAccountSerializer(serializers.ModelSerializer):
    account_owner = UserSerializer(read_only=True)
    bank = BankSerializer(read_only=True)
    currency = CurrencySerializer(read_only=True)

    class Meta:
        model = SavingsAccount
        fields = '__all__'

