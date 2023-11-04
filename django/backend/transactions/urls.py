from django.urls import path, include

from rest_framework.routers import DefaultRouter
from .views import (
    AccountTransactionsByMonthAndYear,
    DepositsByMonthAndYearListView,
    DepositModelViewSet,
    WithdrawalsByMonthAndYearListView,
    WithdrawalModelViewSet
)

app_name = 'transactions'
router = DefaultRouter()
router.register(r'deposit', DepositModelViewSet)
router.register(r'withdrawal', WithdrawalModelViewSet)

urlpatterns = [
    path('submit/', include(router.urls)),
    path('account-transactions/by-month-year/<int:month>/<int:year>/<int:savings_account_id>/',
         AccountTransactionsByMonthAndYear.as_view(),
         name='account-transactions-by-month-year'),
    path('deposits/by-month-year/<int:month>/<int:year>/',
         DepositsByMonthAndYearListView.as_view(),
         name='deposits-by-month-year'),
    path('withdrawals/by-month-year/<int:month>/<int:year>/',
         WithdrawalsByMonthAndYearListView.as_view(),
         name='deposits-by-month-year'),
]
