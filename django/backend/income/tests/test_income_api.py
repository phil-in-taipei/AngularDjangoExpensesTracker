from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APIClient

from income.models import IncomeSource

INCOME_SOURCE_LIST_URL = '/api/income/income-sources/'
INCOME_SOURCE_OBJ_BASE_URL = '/api/income/income-source/'
EDIT_INCOME_SOURCE_PAYLOAD = {
        'income_source_name': 'Edited income source',
}
User = get_user_model()


def get_test_user():
    return User.objects.create_user(
        'testuser',
        'testpassword'
    )


class IncomeSourcesPublicApiTests(TestCase):
    """Test the publicly available income sources API"""

    def setUp(self):
        self.client = APIClient()
        self.test_user = get_test_user()
        self.test_income_source = IncomeSource.objects.create(
            user=self.test_user,
            income_source_name="Test Income Source Name 1"
        )

    def test_login_required_for_income_sources_list(self):
        """Test that login required for retrieving income sources"""
        print("Test that login required for retrieving income sources")
        res = self.client.get(INCOME_SOURCE_LIST_URL)
        self.assertTrue(res.status_code == status.HTTP_401_UNAUTHORIZED
                        or res.status_code == status.HTTP_404_NOT_FOUND)

    def test_login_required_for_editing_income_source(self):
        """Test that login required for editing income sources"""
        print("Test that login required for editing income sources")
        id_url = INCOME_SOURCE_OBJ_BASE_URL + str(self.test_income_source.id) + '/'
        res = self.client.patch(id_url, EDIT_INCOME_SOURCE_PAYLOAD)
        self.assertTrue(
            res.status_code == status.HTTP_401_UNAUTHORIZED
            or res.status_code == status.HTTP_404_NOT_FOUND
        )

    def test_login_required_for_deleting_income_source(self):
        """Test that login required for deleting income sources"""
        print("Test that login required for deleting income sources")
        id_url = INCOME_SOURCE_OBJ_BASE_URL + str(self.test_income_source.id) + '/'
        res = self.client.delete(id_url)
        self.assertTrue(
            res.status_code == status.HTTP_401_UNAUTHORIZED
            or res.status_code == status.HTTP_404_NOT_FOUND
        )


class IncomeSourcesPrivateApiTests(TestCase):
    """Test the privately available income sources API"""

    def setUp(self):
        self.client = APIClient()
        self.test_user = get_test_user()
        self.client.force_authenticate(self.test_user)
        self.test_income_source = IncomeSource.objects.create(
            user=self.test_user,
            income_source_name="Test Income Source Name 1"
        )
        self.test_income_source2 = IncomeSource.objects.create(
            user=self.test_user,
            income_source_name="Test Income Source Name 2"
        )

    def test_user_can_retrieve_income_sources_list(self):
        """Test that authenticated users can retrieve income sources list"""
        print("Test that authenticated users can retrieve income sources list")
        res = self.client.get(INCOME_SOURCE_LIST_URL)
        self.assertTrue(res.status_code == status.HTTP_200_OK)
        self.assertTrue(len(res.data) == 2)

        # it should return a list with two ordered dictionaries, below checks that
        # the values in the ordered dictionaries match those in the test objects above
        self.assertEquals(res.data[0]['income_source_name'], 'Test Income Source Name 1')
        self.assertEquals(res.data[1]['income_source_name'], 'Test Income Source Name 2')

    def test_user_can_edit_income_source(self):
        """Test that authenticated user can edit income source"""
        print("Test that authenticated user can edit income source")
        id_url = INCOME_SOURCE_OBJ_BASE_URL + str(self.test_income_source.id) + '/'
        res = self.client.patch(id_url, EDIT_INCOME_SOURCE_PAYLOAD)
        self.assertEquals(
            res.data['income_source_name'],
            EDIT_INCOME_SOURCE_PAYLOAD['income_source_name']
        )
        self.assertTrue(
            res.status_code == status.HTTP_200_OK)

    def test_user_can_delete_income_source(self):
        """Test that authenticated user can delete an income source"""
        print("Test that authenticated user can delete an income source")
        income_source_id = self.test_income_source.id
        id_url = INCOME_SOURCE_OBJ_BASE_URL + str(income_source_id) + '/'
        res = self.client.delete(id_url)
        self.assertTrue(
            res.status_code == status.HTTP_200_OK)

        # message indicates successful deletion with correct id
        self.assertEquals(res.data['message'], "Income source successfully deleted!")
        self.assertEquals(res.data['id'], income_source_id)

        # savings account no longer exists
        with self.assertRaises(IncomeSource.DoesNotExist):
            IncomeSource.objects.get(id=income_source_id)
