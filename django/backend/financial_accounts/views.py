from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import SavingsAccount
from .serializers import SavingsAccountSerializer


class SavingsAccountView(APIView):
    permission_classes = (
        IsAuthenticated,
    )

    def get(self, request, *args, **kwargs):
        users_savings_accounts = SavingsAccount.objects.filter(account_owner=request.user)
        serializer = SavingsAccountSerializer(users_savings_accounts, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = SavingsAccountSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(bank_id=request.data['bank']['id'],
                            currency_id=request.data['currency']['id'],
                            account_owner_id=request.user.id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
