from django.test import TestCase
from django.contrib.auth import get_user_model

from currencies.models import Currency
from financial_accounts.models import Bank, SavingsAccount

User = get_user_model()


class FinancialAccountsModelTests(TestCase):
    def setUp(self):
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
            account_name='Test Account Name',
            account_owner=self.test_user,
            currency=self.test_currency
        )

    def test_bank_fields(self):
        """Test the bank fields"""
        print("Test the bank fields")
        self.assertEqual(self.test_bank.bank_name, 'Test Bank')

    def test_bank_str(self):
        """Test the bank string representation"""
        print("Test the bank string representation")
        self.assertEqual(str(self.test_bank), self.test_bank.bank_name)

    def test_savings_account_fields(self):
        """Test the savings account fields"""
        print("Test the savings account fields")
        self.assertEqual(self.test_savings_account.bank.bank_name,
                         'Test Bank')
        self.assertEqual(self.test_savings_account.account_name,
                         'Test Account Name')

        self.assertEqual(self.test_savings_account.currency.currency_name,
                         'Test Currency')
        self.assertEqual(self.test_savings_account.account_balance,
                         0.00)
        self.assertEqual(self.test_savings_account.account_owner.username,
                         'testuser')

    def test_savings_account_str(self):
        """Test the savings account string representation"""
        print("Test the savings account string representation")

        self.assertEqual(str(self.test_savings_account), "{}: {} Account ({})".format(
                             self.test_savings_account.account_owner,
                             self.test_savings_account.bank,
                             self.test_savings_account.account_name)
                         )


