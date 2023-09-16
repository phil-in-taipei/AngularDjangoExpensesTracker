from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import BankViewSet, SavingsAccountEditAndDeleteView, SavingsAccountListView

app_name = 'financial_accounts'

router = DefaultRouter()
router.register(r'', BankViewSet)


urlpatterns = [
    path('banks/', include(router.urls)),
    path('savings-accounts/', SavingsAccountListView.as_view(),
         name="savings-accounts"),
    path('savings-account/<int:id>/',
         SavingsAccountEditAndDeleteView.as_view(), name="savings-account")
]
