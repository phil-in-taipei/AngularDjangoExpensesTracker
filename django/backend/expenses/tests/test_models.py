from django.test import TestCase
import datetime
from django.contrib.auth import get_user_model

from currencies.models import Currency
from expenses.models import Expense, SpendingRecord

User = get_user_model()


class ExpenseModelTests(TestCase):
    """Test the Expense Model"""

    def setUp(self):
        self.test_user = User.objects.create_user(
            'testuser',
            'testpassword'
        )
        self.test_expense = Expense.objects.create(
            user=self.test_user,
            expense_name="Test Expense 1"
        )

    def test_expense_fields(self):
        """Test the expense fields"""
        print("Test the expense fields")
        self.assertEqual(self.test_expense.expense_name,
                         'Test Expense 1')

    def test_expense_str(self):
        """Test the expense string representation"""
        print("Test the expense string representation")
        self.assertEqual(str(self.test_expense),
                         "{}: {}".format(
                             self.test_expense.user,
                             self.test_expense.expense_name
                         ).title()
        )


class SpendingRecordModelTests(TestCase):
    """Test the Spending Record Model"""

    def setUp(self):
        self.test_date=datetime.date.today
        self.test_user = User.objects.create_user(
            'testuser',
            'testpassword'
        )
        self.test_currency = Currency.objects.create(
            currency_name='Test Currency',
            currency_code="TCO"
        )
        self.test_expense = Expense.objects.create(
            user=self.test_user,
            expense_name="Test Expense 1"
        )
        self.test_spending_record = SpendingRecord.objects.create(
            amount=2000.00,
            currency=self.test_currency,
            date=self.test_date,
            user=self.test_user
        )
