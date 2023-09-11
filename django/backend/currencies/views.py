from django.shortcuts import render
from rest_framework import generics, status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Currency
from .serializers import CurrencySerializer


# This viewset is currently read only
# (admin can create currency objects in the admin panel)
class CurrencyViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = (
        IsAuthenticated,
    )
    queryset = Currency.objects.all()
    serializer_class = CurrencySerializer
    lookup_field = 'id'
    model = serializer_class.Meta.model
