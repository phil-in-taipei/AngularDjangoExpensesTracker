from django.urls import path, include

from .views import IncomeSourceEditAndDeleteView, IncomeSourceListView

app_name = 'income'

urlpatterns = [
    path('income-sources/', IncomeSourceListView.as_view(),
         name="income-sources"),
    path('income-source/<int:id>/',
         IncomeSourceEditAndDeleteView.as_view(), name="income-source")
]
