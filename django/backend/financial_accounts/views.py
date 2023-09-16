from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics, status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Bank, SavingsAccount
from .serializers import BankSerializer, SavingsAccountSerializer


# This viewset is currently read only
# (admin can create bank objects in the admin panel)
class BankViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = (
        IsAuthenticated,
    )
    queryset = Bank.objects.all()
    serializer_class = BankSerializer
    lookup_field = 'id'
    model = serializer_class.Meta.model



class SavingsAccountEditAndDeleteView(
        generics.RetrieveUpdateDestroyAPIView
        ):
    permission_classes = (
        IsAuthenticated,
    )
    lookup_field = 'id'
    serializer_class = SavingsAccountSerializer
    model = serializer_class.Meta.model
    http_method_names = ['patch', 'delete']
    queryset = SavingsAccount.objects.all()

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(data={"message": "Account successfully deleted!"},
                        status=status.HTTP_204_NO_CONTENT)

    def patch(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)


class SavingsAccountListView(APIView):
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

