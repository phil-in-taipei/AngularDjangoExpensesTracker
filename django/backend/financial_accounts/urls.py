from django.urls import path
from .views import SavingsAccountEditAndDeleteView, SavingsAccountListView

app_name = 'financial_accounts'

urlpatterns = [
    path('savings-accounts/', SavingsAccountListView.as_view(),
         name="savings-accounts"),
    path('savings-account/<int:id>/',
         SavingsAccountEditAndDeleteView.as_view(), name="savings-account")
]
