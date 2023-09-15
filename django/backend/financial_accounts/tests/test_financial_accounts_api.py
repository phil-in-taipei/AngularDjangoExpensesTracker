from django.test import TestCase
from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status
from rest_framework.test import APIClient

from currencies.models import Currency
from financial_accounts.models import Bank, SavingsAccount

SAVINGS_ACCOUNTS_LIST_URL = '/api/financial-accounts/savings-accounts/'
SAVINGS_ACCOUNT_URL = '/api/financial-accounts/savings-account/'

EDIT_ACCOUNT_PAYLOAD = {
        'account_name': 'Edited account name',
}

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



#data={"message": "Account successfully deleted!"},
                        #status=status.HTTP_204_NO_CONTENT


class FinancialAccountsPublicApiTests(TestCase):
    """Test the publicly available financial accounts API"""

    def setUp(self):
        self.client = APIClient()
        self.test_bank = get_test_bank()
        self.test_user = get_test_user()
        self.test_currency = get_test_currency()
        self.test_savings_account = SavingsAccount.objects.create(
            bank=self.test_bank,
            account_name='Test Account Name',
            account_owner=self.test_user,
            currency=self.test_currency
        )

    def test_login_required_for_savings_accounts_list(self):
        """Test that login required for retrieving savings accounts"""
        print("Test that login required for retrieving savings accounts")
        res = self.client.get(SAVINGS_ACCOUNTS_LIST_URL)
        self.assertTrue(res.status_code == status.HTTP_401_UNAUTHORIZED
                        or res.status_code == status.HTTP_404_NOT_FOUND)

    def test_login_required_for_editing_savings_account(self):
        """Test that login required for editing savings accounts"""
        print("Test that login required for editing savings accounts")
        id_url = SAVINGS_ACCOUNT_URL + str(self.test_savings_account.id) + '/'
        res = self.client.patch(id_url, EDIT_ACCOUNT_PAYLOAD)
        self.assertTrue(
            res.status_code == status.HTTP_401_UNAUTHORIZED
            or res.status_code == status.HTTP_404_NOT_FOUND
        )

    def test_login_required_for_deleting_savings_account(self):
        """Test that login required for deleting savings accounts"""
        print("Test that login required for deleting savings accounts")
        id_url = SAVINGS_ACCOUNT_URL + str(self.test_savings_account.id) + '/'
        res = self.client.delete(id_url)
        self.assertTrue(
            res.status_code == status.HTTP_401_UNAUTHORIZED
            or res.status_code == status.HTTP_404_NOT_FOUND
        )


class FinancialAccountsPrivateApiTests(TestCase):
    """Test the privately available financial accounts API"""

    def setUp(self):
        self.client = APIClient()
        self.test_bank = get_test_bank()
        self.test_user = get_test_user()
        self.client.force_authenticate(self.test_user)
        self.test_currency = get_test_currency()
        self.test_savings_account = SavingsAccount.objects.create(
            bank=self.test_bank,
            account_name='Test Account Name 1',
            account_owner=self.test_user,
            currency=self.test_currency
        )
        self.test_savings_account = SavingsAccount.objects.create(
            bank=self.test_bank,
            account_name='Test Account Name 2',
            account_owner=self.test_user,
            currency=self.test_currency
        )

    def test_user_can_retrieve_savings_accounts_list(self):
        """Test that authenticated users can retrieve savings accounts list"""
        print("Test that authenticated users can retrieve savings accounts list")
        res = self.client.get(SAVINGS_ACCOUNTS_LIST_URL)
        self.assertTrue(res.status_code == status.HTTP_200_OK)
        self.assertTrue(len(res.data) == 2)

        # it should return a list with two ordered dictionaries, below checks that
        # the values in the ordered dictionaries match those in the test objects above
        self.assertEquals(res.data[0]['account_name'], 'Test Account Name 1')
        self.assertEquals(res.data[1]['account_name'], 'Test Account Name 2')

    def test_user_can_edit_savings_account(self):
        """Test that authenticated user can edit savings account"""
        print("Test that authenticated user can edit savings account")
        id_url = SAVINGS_ACCOUNT_URL + str(self.test_savings_account.id) + '/'
        print(id_url)
        res = self.client.patch(id_url, EDIT_ACCOUNT_PAYLOAD)
        print(res)
        self.assertEquals(res.data['account_name'], EDIT_ACCOUNT_PAYLOAD['account_name'])
        self.assertTrue(
            res.status_code == status.HTTP_200_OK)

    def test_user_can_delete_savings_account(self):
        """Test that authenticated user can delete savings account"""
        print("Test that authenticated user can delete savings account")
        account_id = self.test_savings_account.id
        id_url = SAVINGS_ACCOUNT_URL + str(account_id) + '/'
        print(id_url)
        res = self.client.delete(id_url)
        print(res)
        self.assertTrue(
            res.status_code == status.HTTP_204_NO_CONTENT)

        # message indicates successful deletion
        self.assertEquals(res.data['message'], "Account successfully deleted!")

        # savings account no longer exists
        with self.assertRaises(SavingsAccount.DoesNotExist):
            SavingsAccount.objects.get(id=account_id)

