from rest_framework import serializers

#from financial_accounts.serializers import SavingsAccountTransactionFieldSerializer
#from income.serializers import IncomeSourceSerializer
from .models import Deposit, Withdrawal


class DepositSerializer(serializers.ModelSerializer):
    #income_source = IncomeSourceSerializer(read_only=True)
    #savings_account = SavingsAccountTransactionFieldSerializer(read_only=True)
    transaction = serializers.ReadOnlyField()

    class Meta:
        model = Deposit
        fields = '__all__'


class WithdrawalSerializer(serializers.ModelSerializer):
    #savings_account = SavingsAccountTransactionFieldSerializer(read_only=True)
    transaction = serializers.ReadOnlyField()

    class Meta:
        model = Withdrawal
        fields = '__all__'
