from django.urls import path, include

from rest_framework.routers import DefaultRouter
from .views import (DepositsByMonthAndYearListView, DepositModelViewSet,
                    WithdrawalsByMonthAndYearListView, WithdrawalModelViewSet)

app_name = 'transactions'
router = DefaultRouter()
router.register(r'deposit', DepositModelViewSet)
router.register(r'withdrawal', WithdrawalModelViewSet)

urlpatterns = [
    path('submit/', include(router.urls)),
    path('deposits/by-month-year/<int:month>/<int:year>/',
         DepositsByMonthAndYearListView.as_view(),
         name='deposits-by-month-year'),
    path('withdrawals/by-month-year/<int:month>/<int:year>/',
         WithdrawalsByMonthAndYearListView.as_view(),
         name='deposits-by-month-year'),
]
