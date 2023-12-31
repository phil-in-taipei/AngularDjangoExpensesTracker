import datetime
from dateutil.relativedelta import relativedelta
from django.db import models
from django.db.models.signals import pre_delete
from django.utils.translation import gettext as _

from financial_accounts.models import SavingsAccount
from income.models import IncomeSource


class DepositManager(models.Manager):

    def account_deposits_for_queried_month_and_year(self, savings_account_id, month, year):
        first_day_of_queried_month = datetime.date(year, month, 1)
        first_day_of_the_following_month = first_day_of_queried_month + relativedelta(months=1)
        last_day_of_the_queried_month = first_day_of_the_following_month - relativedelta(days=1)
        deposits = self.get_queryset().filter(
            savings_account__id=savings_account_id,
            date__gte=first_day_of_queried_month,
            date__lte=last_day_of_the_queried_month
        )
        return deposits

    def users_deposits_for_current_month(self, user):
        today = datetime.date.today()
        first_day_of_this_month = datetime.date(today.year, today.month, 1)
        first_day_of_next_month = first_day_of_this_month + relativedelta(months=1)
        last_day_of_this_month = first_day_of_next_month - relativedelta(days=1)
        deposits = self.get_queryset().filter(
            savings_account__account_owner=user,
            date__gte=first_day_of_this_month,
            date__lte=last_day_of_this_month
        )
        return deposits

    def users_deposits_for_queried_month_and_year(self, user, month, year):
        first_day_of_queried_month = datetime.date(year, month, 1)
        first_day_of_the_following_month = first_day_of_queried_month + relativedelta(months=1)
        last_day_of_the_queried_month = first_day_of_the_following_month - relativedelta(days=1)
        deposits = self.get_queryset().filter(
            savings_account__account_owner=user,
            date__gte=first_day_of_queried_month,
            date__lte=last_day_of_the_queried_month
        )
        return deposits


class Deposit(models.Model):
    custom_query = DepositManager()
    objects = models.Manager()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField(_("Date"), default=datetime.date.today)
    income_source = models.ForeignKey(IncomeSource, on_delete=models.CASCADE,
                                      null=True, blank=True)
    savings_account = models.ForeignKey(SavingsAccount, on_delete=models.CASCADE,
                                        null=True, blank=True)

    class Meta:
        ordering = ('savings_account', 'date')

    def __str__(self):
        return "{} | {} | Amount: {}".format(
            self.date,
            str(self.savings_account),
            self.amount,
        ).title()

    @property
    def transaction(self):
        return "Deposit"

    def save(self, *args, **kwargs):
        super(Deposit, self).save(*args, **kwargs)
        # updates the account balance in the foreign key field
        self.savings_account.account_balance += self.amount
        self.savings_account.save()


class WithdrawalManager(models.Manager):

    def account_withdrawals_for_queried_month_and_year(self, savings_account_id, month, year):
        first_day_of_queried_month = datetime.date(year, month, 1)
        first_day_of_the_following_month = first_day_of_queried_month + relativedelta(months=1)
        last_day_of_the_queried_month = first_day_of_the_following_month - relativedelta(days=1)
        withdrawals = self.get_queryset().filter(
            savings_account__id=savings_account_id,
            date__gte=first_day_of_queried_month,
            date__lte=last_day_of_the_queried_month
        )
        return withdrawals

    def users_withdrawals_for_current_month(self, user):
        today = datetime.date.today()
        first_day_of_this_month = datetime.date(today.year, today.month, 1)
        first_day_of_next_month = first_day_of_this_month + relativedelta(months=1)
        last_day_of_this_month = first_day_of_next_month - relativedelta(days=1)
        withdrawals = self.get_queryset().filter(
            savings_account__account_owner=user,
            date__gte=first_day_of_this_month,
            date__lte=last_day_of_this_month
        )
        return withdrawals

    def users_withdrawals_for_queried_month_and_year(self, user, month, year):
        first_day_of_queried_month = datetime.date(year, month, 1)
        first_day_of_the_following_month = first_day_of_queried_month + relativedelta(months=1)
        last_day_of_the_queried_month = first_day_of_the_following_month - relativedelta(days=1)
        withdrawals = self.get_queryset().filter(
            savings_account__account_owner=user,
            date__gte=first_day_of_queried_month,
            date__lte=last_day_of_the_queried_month
        )
        return withdrawals


class Withdrawal(models.Model):
    custom_query = WithdrawalManager()
    objects = models.Manager()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField(_("Date"), default=datetime.date.today)
    savings_account = models.ForeignKey(SavingsAccount, on_delete=models.CASCADE,
                                        null=True, blank=True)

    class Meta:
        ordering = ('savings_account', 'date')

    def __str__(self):
        return "{} | {} | Amount: {}".format(
            self.date,
            str(self.savings_account),
            self.amount,
        ).title()

    @property
    def transaction(self):
        return "Withdrawal"

    def save(self, *args, **kwargs):
        super(Withdrawal, self).save(*args, **kwargs)
        # updates the account balance in the foreign key field
        self.savings_account.account_balance -=  self.amount
        self.savings_account.save()


def add_amount_back_on_account_balance(sender, instance, **kwargs):
    # adding amount back on account balance after deleting
    # withdrawal object
    savings_account = instance.savings_account
    amount = instance.amount
    savings_account.account_balance += amount
    savings_account.save()


def subtract_amount_back_from_account_balance(sender, instance, **kwargs):
    # subtracts amount back from account balance
    # after deleting deposit object
    savings_account = instance.savings_account
    amount = instance.amount
    savings_account.account_balance -= amount
    savings_account.save()


pre_delete.connect(add_amount_back_on_account_balance, sender=Withdrawal)
pre_delete.connect(subtract_amount_back_from_account_balance, sender=Deposit)
