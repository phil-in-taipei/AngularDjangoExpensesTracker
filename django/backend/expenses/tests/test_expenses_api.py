import datetime
from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APIClient

from currencies.models import Currency
from expenses.models import Expense, SpendingRecord

EXPENSES_LIST_URL = '/api/expenses/users-expenses/'
EXPENSE_URL = '/api/expenses/expense/'
SPENDING_RECORD_LIST_URL = '/api/expenses/spending-records/by-month-year/'
SPENDING_RECORD_URL = '/api/expenses/spending-record/'

EDIT_EXPENSE_PAYLOAD = {
        'expense_name': 'Edited expense',
}

User = get_user_model()


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


class ExpensesPublicApiTests(TestCase):
    """Test the publicly available expenses API"""

    def setUp(self):
        self.client = APIClient()
        self.test_user = get_test_user()
        self.test_currency = get_test_currency()
        self.test_expense = Expense.objects.create(
            expense_name='Test Expense 1',
            user=self.test_user,
        )
        self.test_spending_record = SpendingRecord.objects.create(
            amount=100.00,
            currency=self.test_currency,
            expense=self.test_expense
        )

        self.today = datetime.date.today()

    def test_login_required_for_expenses_list(self):
        """Test that login required for retrieving expenses"""
        print("Test that login required for retrieving expenses")
        res = self.client.get(EXPENSES_LIST_URL)
        self.assertTrue(res.status_code == status.HTTP_401_UNAUTHORIZED
                        or res.status_code == status.HTTP_404_NOT_FOUND)

    def test_login_required_for_editing_expense(self):
        """Test that login required for editing expense"""
        print("Test that login required for editing expense")
        id_url = EXPENSE_URL + str(self.test_expense.id) + '/'
        res = self.client.patch(id_url, EDIT_EXPENSE_PAYLOAD)
        self.assertTrue(
            res.status_code == status.HTTP_401_UNAUTHORIZED
            or res.status_code == status.HTTP_404_NOT_FOUND
        )

    def test_login_required_for_deleting_expense(self):
        """Test that login required for deleting expense"""
        print("Test that login required for deleting expense")
        id_url = EXPENSE_URL + str(self.test_expense.id) + '/'
        res = self.client.delete(id_url)
        self.assertTrue(
            res.status_code == status.HTTP_401_UNAUTHORIZED
            or res.status_code == status.HTTP_404_NOT_FOUND
        )

    def test_login_required_for_monthly_spending_records_list(self):
        """Test that login required for retrieving spending_records"""
        print("Test that login required for retrieving spending_records")
        month_date_url_str = (SPENDING_RECORD_LIST_URL + str(self.today.month)
                              + '/' + str(self.today.year) + '/')
        res = self.client.get(month_date_url_str)
        self.assertTrue(res.status_code == status.HTTP_401_UNAUTHORIZED
                        or res.status_code == status.HTTP_404_NOT_FOUND)

    def test_login_required_for_deleting_spending_record(self):
        """Test that login required for deleting spending record"""
        print("Test that login required for deleting spending record")
        id_url = SPENDING_RECORD_URL + str(self.test_spending_record.id) + '/'
        res = self.client.delete(id_url)
        self.assertTrue(
            res.status_code == status.HTTP_401_UNAUTHORIZED
            or res.status_code == status.HTTP_404_NOT_FOUND
        )


class ExpensesPrivateApiTests(TestCase):
    """Test the privately available expenses API"""

    def setUp(self):
        self.client = APIClient()
        self.test_user = get_test_user()
        self.client.force_authenticate(self.test_user)
        self.test_currency = get_test_currency()
        self.test_expense_1 = Expense.objects.create(
            expense_name='Test Expense 1',
            user=self.test_user,
        )
        self.test_expense_2 = Expense.objects.create(
            expense_name='Test Expense 2',
            user=self.test_user,
        )
        self.test_spending_record_1 = SpendingRecord.objects.create(
            amount=100.00,
            currency=self.test_currency,
            expense=self.test_expense_1
        )
        self.test_spending_record_2 = SpendingRecord.objects.create(
            amount=200.00,
            currency=self.test_currency,
            expense=self.test_expense_2
        )

        self.today = datetime.date.today()

    def test_user_can_retrieve_expenses_list(self):
        """Test that authenticated users can retrieve expenses list"""
        print("Test that authenticated users can retrieve expenses list")
        res = self.client.get(EXPENSES_LIST_URL)
        self.assertTrue(res.status_code == status.HTTP_200_OK)
        self.assertTrue(len(res.data) == 2)

        # it should return a list with two ordered dictionaries, below checks that
        # the values in the ordered dictionaries match those in the test objects above
        self.assertEquals(res.data[0]['expense_name'], 'Test Expense 1')
        self.assertEquals(res.data[1]['expense_name'], 'Test Expense 2')

    def test_user_can_edit_expense(self):
        """Test that authenticated user can edit expense"""
        print("Test that authenticated user can edit expense")
        id_url = EXPENSE_URL + str(self.test_expense_2.id) + '/'
        res = self.client.patch(id_url, EDIT_EXPENSE_PAYLOAD)
        self.assertEquals(res.data['expense_name'], EDIT_EXPENSE_PAYLOAD['expense_name'])
        self.assertTrue(
            res.status_code == status.HTTP_200_OK)

    def test_user_can_delete_expense(self):
        """Test that authenticated user can delete expense"""
        print("Test that authenticated user can delete expense")
        expense_id = self.test_expense_2.id
        id_url = EXPENSE_URL + str(expense_id) + '/'
        res = self.client.delete(id_url)
        self.assertTrue(
            res.status_code == status.HTTP_200_OK)

        # message indicates successful deletion with correct id
        self.assertEquals(res.data['message'], "Expense successfully deleted!")
        self.assertEquals(res.data['id'], expense_id)

        # object no longer exists
        with self.assertRaises(Expense.DoesNotExist):
            Expense.objects.get(id=expense_id)

    def test_user_can_retrieve_monthly_spending_records_list(self):
        """Test that authenticated users can retrieve monthly spending records list"""
        print("Test that authenticated users can retrieve monthly spending records list")
        month_date_url_str = (SPENDING_RECORD_LIST_URL + str(self.today.month)
                              + '/' + str(self.today.year) + '/')
        res = self.client.get(month_date_url_str)
        self.assertTrue(res.status_code == status.HTTP_200_OK)
        self.assertTrue(len(res.data) == 2)

        # it should return a list with two ordered dictionaries, below checks that
        # the values in the ordered dictionaries match those in the test objects above
        self.assertEquals(res.data[0]['expense']['expense_name'], 'Test Expense 1')
        self.assertEquals(res.data[0]['amount'], '100.00')
        self.assertEquals(res.data[1]['expense']['expense_name'], 'Test Expense 2')
        self.assertEquals(res.data[1]['amount'], '200.00')

    def test_user_can_delete_spending_record(self):
        """Test that authenticated user can delete spending record"""
        print("Test that authenticated user can delete spending record")
        obj_id = self.test_spending_record_2.id
        id_url = SPENDING_RECORD_URL + str(obj_id) + '/'
        res = self.client.delete(id_url)
        self.assertTrue(
            res.status_code == status.HTTP_200_OK)
        print(res.data)
        # message indicates successful deletion of correct id
        self.assertEquals(res.data['message'], "Spending Record successfully deleted!")
        self.assertEquals(res.data['id'], obj_id)

        # object no longer exists
        with self.assertRaises(SpendingRecord.DoesNotExist):
            SpendingRecord.objects.get(id=obj_id)

