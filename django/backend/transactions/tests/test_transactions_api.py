import datetime
import json
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


class TransactionsPrivateApiTests(TestCase):
    """Test the privately available transactions API"""

    def setUp(self):
        self.client = APIClient()
        self.date_today = datetime.date.today()
        self.date_1 = datetime.date.today().replace(day=1)
        self.date_2 = datetime.date.today().replace(day=2)
        self.date_3 = datetime.date.today().replace(day=3)
        self.date_4 = datetime.date.today().replace(day=4)
        self.test_bank = get_test_bank()
        self.test_user = get_test_user()
        self.client.force_authenticate(self.test_user)
        self.test_currency = get_test_currency()
        self.test_income_source = IncomeSource.objects.create(
            income_source_name="Test Income Source 1",
            user=self.test_user
        )
        self.test_savings_account_1 = SavingsAccount.objects.create(
            bank=self.test_bank,
            account_balance=200.00,
            account_name='Test Account Name 1',
            account_owner=self.test_user,
            currency=self.test_currency
        )
        self.test_savings_account_2 = SavingsAccount.objects.create(
            bank=self.test_bank,
            account_balance=200.00,
            account_name='Test Account Name 2',
            account_owner=self.test_user,
            currency=self.test_currency
        )
        self.test_deposit_1 = Deposit.objects.create(
            amount=100.00,
            date=self.date_1,
            income_source=self.test_income_source,
            savings_account=self.test_savings_account_1
        )
        self.test_deposit_2 = Deposit.objects.create(
            amount=100.00,
            date=self.date_2,
            income_source=self.test_income_source,
            savings_account=self.test_savings_account_2
        )
        self.test_withdrawal_1 = Withdrawal.objects.create(
            amount=100.00,
            date=self.date_3,
            savings_account=self.test_savings_account_1
        )
        self.test_withdrawal_2 = Withdrawal.objects.create(
            amount=100.00,
            date=self.date_4,
            savings_account=self.test_savings_account_2
        )

    def test_user_can_create_deposit(self):
        "Test that user can create deposit"""
        print("Test that user user can create deposit")
        payload = {
            "amount": 200.00,
            "date": str(self.date_today),
            "income_source": self.test_income_source.id,
            "savings_account": self.test_savings_account_1.id

        }
        res = self.client.post(
            DEPOSIT_SUBMIT_URL, data=json.dumps(payload),
            content_type='application/json')

        self.assertTrue(
            res.status_code == status.HTTP_201_CREATED)
        self.assertTrue(
            float(res.data['amount']) == float(payload['amount']))
        self.assertTrue(str(res.data['date']) == str(payload['date']))
        self.assertTrue(res.data['income_source'] == payload['income_source'])
        self.assertTrue(res.data['savings_account'] == (payload['savings_account']))

    def test_user_can_create_withdrawal(self):
        "Test that user can create withdrawal"""
        print("Test that user user can create withdrawal")
        payload = {
            "amount": 200.00,
            "date": str(self.date_today),
            "savings_account": self.test_savings_account_1.id

        }
        res = self.client.post(
            WITHDRAWAL_SUBMIT_URL, data=json.dumps(payload),
            content_type='application/json')

        self.assertTrue(
            res.status_code == status.HTTP_201_CREATED)
        self.assertTrue(
            float(res.data['amount']) == float(payload['amount']))
        self.assertTrue(str(res.data['date']) == str(payload['date']))
        self.assertTrue(res.data['savings_account'] == (payload['savings_account']))

    def test_user_can_retrieve_monthly_deposits_list(self):
        """Test that authenticated users can retrieve monthly deposits list"""
        print("Test that authenticated users can retrieve monthly deposits  list")
        res = self.client.get(DEPOSITS_MONTHLY_LIST_URL +
                              str(self.date_today.month) + '/'
                              + str(self.date_today.year) + '/')
        self.assertTrue(res.status_code == status.HTTP_200_OK)
        self.assertTrue(len(res.data) == 2)

        # it should return a list with two ordered dictionaries, below checks that
        # the values in the ordered dictionaries match those in the test objects above
        self.assertEquals(res.data[0]['income_source'], self.test_income_source.id)
        self.assertEquals(res.data[0]['amount'], '100.00')
        self.assertEquals(res.data[0]['savings_account'], self.test_savings_account_1.id)
        self.assertEquals(res.data[0]['date'], str(self.date_1))
        self.assertEquals(res.data[0]['transaction'], 'Deposit')

        self.assertEquals(res.data[1]['income_source'], self.test_income_source.id)
        self.assertEquals(res.data[1]['amount'], '100.00')
        self.assertEquals(res.data[1]['savings_account'], self.test_savings_account_2.id)
        self.assertEquals(res.data[1]['date'], str(self.date_2))
        self.assertEquals(res.data[1]['transaction'], 'Deposit')

    def test_user_can_retrieve_monthly_transactions_list(self):
        """Test that authenticated users can retrieve monthly deposits list"""
        print("Test that authenticated users can retrieve monthly transactions  list")
        res = self.client.get(TRANSACTIONS_MONTHLY_LIST_URL +
                              str(self.date_today.month) + '/'
                              + str(self.date_today.year) + '/'
                              + str(self.test_savings_account_1.id) + '/')
        self.assertTrue(res.status_code == status.HTTP_200_OK)
        self.assertTrue(len(res.data) == 2)

        # it should return a list with two ordered dictionaries, below checks that
        # the values in the ordered dictionaries match those in the test objects above
        self.assertEquals(res.data[0]['income_source'], self.test_income_source.id)
        self.assertEquals(res.data[0]['amount'], '100.00')
        self.assertEquals(res.data[0]['savings_account'], self.test_savings_account_1.id)
        self.assertEquals(res.data[0]['date'], str(self.date_1))
        self.assertEquals(res.data[0]['transaction'], 'Deposit')

        self.assertEquals(res.data[1]['amount'], '100.00')
        self.assertEquals(res.data[1]['savings_account'], self.test_savings_account_1.id)
        self.assertEquals(res.data[1]['date'], str(self.date_3))
        self.assertEquals(res.data[1]['transaction'], 'Withdrawal')

    def test_user_can_retrieve_monthly_withdrawals_list(self):
        """Test that authenticated users can retrieve monthly deposits list"""
        print("Test that authenticated users can retrieve monthly deposits  list")
        res = self.client.get(WITHDRAWALS_MONTHLY_LIST_URL +
                              str(self.date_today.month) + '/'
                              + str(self.date_today.year) + '/')
        self.assertTrue(res.status_code == status.HTTP_200_OK)
        self.assertTrue(len(res.data) == 2)

        # it should return a list with two ordered dictionaries, below checks that
        # the values in the ordered dictionaries match those in the test objects above
        self.assertEquals(res.data[0]['amount'], '100.00')
        self.assertEquals(res.data[0]['savings_account'], self.test_savings_account_1.id)
        self.assertEquals(res.data[0]['date'], str(self.date_3))
        self.assertEquals(res.data[0]['transaction'], 'Withdrawal')

        self.assertEquals(res.data[1]['amount'], '100.00')
        self.assertEquals(res.data[1]['savings_account'], self.test_savings_account_2.id)
        self.assertEquals(res.data[1]['date'], str(self.date_4))
        self.assertEquals(res.data[1]['transaction'], 'Withdrawal')

    def test_user_can_delete_deposit(self):
        """Test that authenticated user can delete deposit"""
        print("Test that authenticated user can delete deposit")
        deposit_id = self.test_deposit_1.id
        id_url = DEPOSIT_SUBMIT_URL + str(deposit_id) + '/'
        res = self.client.delete(id_url)
        self.assertTrue(
            res.status_code == status.HTTP_200_OK)

        # message indicates successful deletion with correct id
        self.assertEquals(res.data['message'], "Deposit successfully deleted!")
        self.assertEquals(res.data['id'], deposit_id)

        # object no longer exists
        with self.assertRaises(Deposit.DoesNotExist):
            Deposit.objects.get(id=deposit_id)

    def test_user_can_delete_withdrawal(self):
        """Test that authenticated user can delete withdrawal"""
        print("Test that authenticated user can delete withdrawal")
        withdrawal_id = self.test_withdrawal_1.id
        id_url = WITHDRAWAL_SUBMIT_URL + str(withdrawal_id) + '/'
        res = self.client.delete(id_url)
        self.assertTrue(
            res.status_code == status.HTTP_200_OK)

        # message indicates successful deletion with correct id
        self.assertEquals(res.data['message'], "Withdrawal successfully deleted!")
        self.assertEquals(res.data['id'], withdrawal_id)

        # object no longer exists
        with self.assertRaises(Withdrawal.DoesNotExist):
            Withdrawal.objects.get(id=withdrawal_id)
