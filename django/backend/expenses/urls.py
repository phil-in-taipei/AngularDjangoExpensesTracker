from django.urls import path

from .views import (ExpenseEditAndDeleteView, ExpensesListView,
                    SpendingRecordDeleteView, SpendingRecordListView)

app_name = 'expenses'


urlpatterns = [
    path('users-expenses/', ExpensesListView.as_view(),
         name="users-expenses"),
    path('expense/<int:id>/',
         ExpenseEditAndDeleteView.as_view(), name="expense"),
    path('spending-records/by-month-year/<int:month>/<int:year>/',
         SpendingRecordListView.as_view(),
         name='spending-records-by-month-year'),
    path('spending-record/<int:id>/',
         SpendingRecordDeleteView.as_view(), name="spending-record"),
]
