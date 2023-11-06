import json
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Deposit, Withdrawal
from .serializers import DepositSerializer, WithdrawalSerializer


class AccountTransactionsByMonthAndYear(APIView):
    permission_classes = (
        IsAuthenticated,
    )

    def get(self, *args, **kwargs):
        query_list = []
        transactions = []
        savings_account_id = self.kwargs.get("savings_account_id")
        month = self.kwargs.get("month")
        year = self.kwargs.get("year")

        deposits = Deposit.custom_query \
            .account_deposits_for_queried_month_and_year(
                savings_account_id=savings_account_id,
                month=month, year=year
        )

        for i in range(len(deposits)):
            transactions.append(deposits[i])

        withdrawals = Withdrawal.custom_query \
            .account_withdrawals_for_queried_month_and_year(
                savings_account_id=savings_account_id,
                month=month, year=year
        )
        for i in range(len(withdrawals)):
            transactions.append(withdrawals[i])

        for transaction in transactions:
            # the transaction will have an additional field for the
            # income source if it is a deposit -- the type will
            # be optional in the frontend Typescript interface
            if transaction.transaction == "Deposit":
                query_list.append({
                    "id": transaction.id,
                    "transaction": transaction.transaction,
                    "amount": str(transaction.amount),
                    "date": str(transaction.date),
                    "income_source": transaction.income_source.id,
                    "savings_account": transaction.savings_account.id,
                })
            else:
                query_list.append({
                    "id": transaction.id,
                    "transaction": transaction.transaction,
                    "amount": str(transaction.amount),
                    "date": str(transaction.date),
                    "savings_account": transaction.savings_account.id,
                })
        return Response(query_list)


class DepositModelViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated, )
    queryset = Deposit.objects.all()
    serializer_class = DepositSerializer
    lookup_field = 'id'

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        id = instance.id
        self.perform_destroy(instance)
        return Response(data={"id": id,
                        "message": "Deposit successfully deleted!"})


class DepositsByMonthAndYearListView(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request, *args, **kwargs):
        month = self.kwargs.get("month")
        year = self.kwargs.get("year")
        deposits = Deposit.custom_query.users_deposits_for_queried_month_and_year(
            user=self.request.user,
            month=month, year=year
        )
        serializer = DepositSerializer(deposits, many=True)
        return Response(serializer.data)


class WithdrawalModelViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = Withdrawal.objects.all()
    serializer_class = WithdrawalSerializer
    lookup_field = 'id'

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        id = instance.id
        self.perform_destroy(instance)
        return Response(data={"id": id,
                        "message": "Withdrawal successfully deleted!"})


class WithdrawalsByMonthAndYearListView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        month = self.kwargs.get("month")
        year = self.kwargs.get("year")
        withdrawals = Withdrawal.custom_query.users_withdrawals_for_queried_month_and_year(
            user=self.request.user,
            month=month, year=year
        )
        serializer = WithdrawalSerializer(withdrawals, many=True)
        return Response(serializer.data)
