from django.urls import path
from .views import SavingsAccountView, SavingsAccountListView

app_name = 'financial_accounts'

urlpatterns = [
    path('savings-accounts/', SavingsAccountListView.as_view(), name="savings-accounts"),
    path('savings-account/<int:id>/', SavingsAccountView.as_view(), name="savings-account")
]
