from django.urls import path
from .views import SavingsAccountView

app_name = 'financial_accounts'

urlpatterns = [
    path('savings-accounts/', SavingsAccountView.as_view(), name="savings-accounts"),
]
