from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APIClient

from currencies.models import Currency


CURRENCIES_LIST_URL = '/api/currencies/'
User = get_user_model()


class CurrenciesPublicApiTests(TestCase):
    """Test the publicly available currencies API"""

    def setUp(self):
        self.client = APIClient()

    def test_login_required_for_currencies_list(self):
        """Test that login required for retrieving currencies"""
        print("Test that login required for retrieving currencies")
        res = self.client.get(CURRENCIES_LIST_URL)
        self.assertTrue(res.status_code == status.HTTP_401_UNAUTHORIZED
                        or res.status_code == status.HTTP_404_NOT_FOUND)


class CurrenciesPrivateApiTests(TestCase):
    """Test the publicly available currencies API"""

    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            'testuser',
            'testpassword'
        )
        self.client.force_authenticate(self.user)

        self.currency1 = Currency.objects.create(
            currency_name="Test Currency1",
            currency_code="TCO"
        )
        self.currency2 = Currency.objects.create(
            currency_name="Test Currency2",
            currency_code="TCT"
        )

    def test_user_can_retrieve_currencies_list(self):
        """Test that users are able to retrieve currencies list"""
        print("Test that users are able to retrieve currencies list")
        res = self.client.get(CURRENCIES_LIST_URL)
        self.assertTrue(res.status_code == status.HTTP_200_OK)
        self.assertTrue(len(res.data) == 2)

        # it should return a list with two ordered dictionaries, below checks that
        # the values in the ordered dictionaries match those in the test objects above
        self.assertEquals(res.data[0]['currency_name'], 'Test Currency1')
        self.assertEquals(res.data[0]['currency_code'], 'TCO')
        self.assertEquals(res.data[1]['currency_name'], 'Test Currency2')
        self.assertEquals(res.data[1]['currency_code'], 'TCT')
