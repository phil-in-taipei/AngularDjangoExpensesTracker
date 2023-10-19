from django.contrib import admin
from .models import Expense, SpendingRecord

admin.site.register(Expense)
admin.site.register(SpendingRecord)
