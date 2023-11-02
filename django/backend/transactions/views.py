import datetime
from rest_framework import generics, status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Deposit, Withdrawal
from .serializers import DepositSerializer, WithdrawalSerializer


class DepositModelViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated, )
    queryset = Deposit.objects.all()
    serializer_class = DepositSerializer
    lookup_field = 'id'


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
