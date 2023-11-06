import datetime
from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APIClient

from currencies.models import Currency
from income.models import IncomeSource
from financial_accounts.models import Bank, SavingsAccount
from transactions.models import Deposit, Withdrawal

DEPOSITS_MONTHLY_LIST_URL = '/api/transactions/deposits/by-month-year/'
DEPOSIT_SUBMIT_URL = '/api/transactions/submit/deposit/'
TRANSACTIONS_MONTHLY_LIST_URL = '/api/transactions/account-transactions/by-month-year/'
WITHDRAWALS_MONTHLY_LIST_URL = '/api/transactions/withdrawals/by-month-year/'
WITHDRAWAL_SUBMIT_URL = '/api/transactions/submit/withdrawal/'

User = get_user_model()


def get_test_bank():
    return Bank.objects.create(bank_name='Test Bank')


def get_test_currency():
    return Currency.objects.create(
            currency_name='Test Currency',
            currency_code="TCO"
        )


def get_test_user():
    return User.objects.create_user(
        'testuser',
        'testpassword'
    )


class TransactionsPublicApiTests(TestCase):
    """Test the publicly available transactions API"""

    def setUp(self):
        self.client = APIClient()
        self.date_today=datetime.date.today()
        self.test_bank = get_test_bank()
        self.test_user = get_test_user()
        self.test_currency = get_test_currency()
        self.test_income_source = IncomeSource.objects.create(
            income_source_name="Test Income Source 1",
            user=self.test_user
        )
        self.test_savings_account = SavingsAccount.objects.create(
            bank=self.test_bank,
            account_balance=200.00,
            account_name='Test Account Name',
            account_owner=self.test_user,
            currency=self.test_currency
        )
        self.test_deposit = Deposit.objects.create(
            amount=100.00,
            date=self.date_today,
            income_source=self.test_income_source,
            savings_account=self.test_savings_account
        )
        self.test_withdrawal = Withdrawal.objects.create(
            amount=100.00,
            date=self.date_today,
            savings_account=self.test_savings_account
        )

    def test_login_required_for_monthly_deposits_list(self):
        """Test that login required for retrieving monthly deposits"""
        print("Test that login required for retrieving monthly deposits")
        res = self.client.get(DEPOSITS_MONTHLY_LIST_URL +
                              str(self.date_today.month) + '/'
                              + str(self.date_today.year) + '/')
        self.assertTrue(res.status_code == status.HTTP_401_UNAUTHORIZED
                        or res.status_code == status.HTTP_404_NOT_FOUND)

    def test_login_required_for_monthly_transactions_list(self):
        """Test that login required for retrieving monthly transactions"""
        print("Test that login required for retrieving monthly transactions")
        res = self.client.get(TRANSACTIONS_MONTHLY_LIST_URL +
                              str(self.date_today.month) + '/'
                              + str(self.date_today.year) + '/'
                              + str(self.test_savings_account.id) + '/')
        self.assertTrue(res.status_code == status.HTTP_401_UNAUTHORIZED
                        or res.status_code == status.HTTP_404_NOT_FOUND)

    def test_login_required_for_monthly_withdrawals_list(self):
        """Test that login required for retrieving monthly withdrawals"""
        print("Test that login required for retrieving monthly withdrawals")
        res = self.client.get(WITHDRAWALS_MONTHLY_LIST_URL +
                              str(self.date_today.month) + '/'
                              + str(self.date_today.year) + '/')
        self.assertTrue(res.status_code == status.HTTP_401_UNAUTHORIZED
                        or res.status_code == status.HTTP_404_NOT_FOUND)

    def test_login_required_for_deleting_deposit(self):
        """Test that login required for deleting deposits"""
        print("Test that login required for deleting deposits")
        id_url = DEPOSIT_SUBMIT_URL + str(self.test_deposit.id) + '/'
        res = self.client.delete(id_url)
        self.assertTrue(
            res.status_code == status.HTTP_401_UNAUTHORIZED
            or res.status_code == status.HTTP_404_NOT_FOUND
        )
        
    def test_login_required_for_deleting_withdrawal(self):
        """Test that login required for deleting withdrawals"""
        print("Test that login required for deleting withdrawals")
        id_url = WITHDRAWAL_SUBMIT_URL + str(self.test_withdrawal.id) + '/'
        res = self.client.delete(id_url)
        self.assertTrue(
            res.status_code == status.HTTP_401_UNAUTHORIZED
            or res.status_code == status.HTTP_404_NOT_FOUND
        )
