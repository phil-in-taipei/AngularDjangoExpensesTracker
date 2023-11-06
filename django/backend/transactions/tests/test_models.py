import datetime
from django.test import TestCase
from django.contrib.auth import get_user_model

from currencies.models import Currency
from financial_accounts.models import Bank, SavingsAccount
from income.models import IncomeSource
from transactions.models import Deposit, Withdrawal

User = get_user_model()


class DepositModelTests(TestCase):
    def setUp(self):
        self.date_today=datetime.date.today()
        self.test_bank = Bank.objects.create(bank_name='Test Bank')
        self.test_user = User.objects.create_user(
            'testuser',
            'testpassword'
        )
        self.test_currency = Currency.objects.create(
            currency_name='Test Currency',
            currency_code="TCO"
        )
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

    def test_deposit_fields(self):
        """Test the deposit fields"""
        print("Test the deposit fields")
        self.assertEqual(self.test_deposit.savings_account.account_name,
                         'Test Account Name')

        self.assertEqual(self.test_deposit.date,
                         self.date_today)
        self.assertEqual(self.test_deposit.amount,
                         100.00)
        self.assertEqual(self.test_deposit.income_source.income_source_name,
                         'Test Income Source 1')

    def test_custom_save_method(self):
        """Test that deposit custom save method modifies related account balance"""
        print("Test that deposit custom save method modifies related account balance")
        # the original balance was 200 with 100 added via the deposit amount
        self.assertEqual(self.test_deposit.savings_account.account_balance,
                         300.00)

    def test_deposit_str(self):
        """Test the deposit string representation"""
        print("Test the deposit string representation")

        self.assertEqual(str(self.test_deposit), "{} | {} | Amount: {}".format(
            self.test_deposit.date,
            str(self.test_deposit.savings_account),
            self.test_deposit.amount,
        ).title())


class WithdrawalModelTests(TestCase):
    def setUp(self):
        self.date_today=datetime.date.today()
        self.test_bank = Bank.objects.create(bank_name='Test Bank')
        self.test_user = User.objects.create_user(
            'testuser',
            'testpassword'
        )
        self.test_currency = Currency.objects.create(
            currency_name='Test Currency',
            currency_code="TCO"
        )
        self.test_savings_account = SavingsAccount.objects.create(
            bank=self.test_bank,
            account_balance=200.00,
            account_name='Test Account Name',
            account_owner=self.test_user,
            currency=self.test_currency
        )
        self.test_withdrawal = Withdrawal.objects.create(
            amount=100.00,
            date=self.date_today,
            savings_account=self.test_savings_account
        )

    def test_withdrawal_fields(self):
        """Test the withdrawal fields"""
        print("Test the withdrawal fields")
        self.assertEqual(self.test_withdrawal.savings_account.account_name,
                         'Test Account Name')

        self.assertEqual(self.test_withdrawal.date,
                         self.date_today)
        self.assertEqual(self.test_withdrawal.amount,
                         100.00)

    def test_custom_save_method(self):
        """Test that withdrawal custom save method modifies related account balance"""
        print("Test that withdrawal custom save method modifies related account balance")
        # the original balance was 200 with 100 subtracted via the withdrawal amount
        self.assertEqual(self.test_withdrawal.savings_account.account_balance,
                         100.00)

    def test_withdrawal_str(self):
        """Test the withdrawal string representation"""
        print("Test the withdrawal string representation")

        self.assertEqual(str(self.test_withdrawal), "{} | {} | Amount: {}".format(
            self.test_withdrawal.date,
            str(self.test_withdrawal.savings_account),
            self.test_withdrawal.amount,
        ).title())


class SignalPreDeletionTests(TestCase):
    def setUp(self):
        self.date_today=datetime.date.today()
        self.test_bank = Bank.objects.create(bank_name='Test Bank')
        self.test_user = User.objects.create_user(
            'testuser',
            'testpassword'
        )
        self.test_currency = Currency.objects.create(
            currency_name='Test Currency',
            currency_code="TCO"
        )
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

    def test_deposit_deletion_signal(self):
        """Test that deposit pre-deletion signal modifies related account balance"""
        print("Test that deposit pre-deletion signal modifies related account balance")
        test_deposit = Deposit.objects.create(
            amount=100.00,
            date=self.date_today,
            income_source=self.test_income_source,
            savings_account=self.test_savings_account
        )
        test_deposit.delete()
        # the original balance was 200 with 100 added on via the deposit amount
        # after deletion, the account balance should once again be 200
        self.assertEqual(self.test_savings_account.account_balance,
                         200.00)

    def test_withdrawal_deletion_signal(self):
        """Test that withdrawal pre-deletion signal modifies related account balance"""
        print("Test that withdrawal pre-deletion signal modifies related account balance")
        test_withdrawal = Withdrawal.objects.create(
            amount=100.00,
            date=self.date_today,
            savings_account=self.test_savings_account
        )
        test_withdrawal.delete()
        # the original balance was 200 with 100 subtracted via the withdrawal amount
        # after deletion, the account balance should once again be 200
        self.assertEqual(self.test_savings_account.account_balance,
                         200.00)
        