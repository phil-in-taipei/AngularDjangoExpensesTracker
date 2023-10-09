from django.test import TestCase
from django.contrib.auth import get_user_model

from income.models import IncomeSource


User = get_user_model()


class IncomeSourceModelTests(TestCase):
    def setUp(self):
        self.test_user = User.objects.create_user(
            'testuser',
            'testpassword'
        )

        self.test_income_source = IncomeSource.objects.create(
            income_source_name="Test Income Source 1",
            user=self.test_user
        )

    def test_income_source_fields(self):
        """Test the income source fields"""
        print("Test the income source fields")

        self.assertEqual(self.test_income_source.income_source_name,
                         'Test Income Source 1')

        self.assertEqual(self.test_income_source.user.username,
                         'testuser')

    def test_income_source_str(self):
        """Test the income source string representation"""
        print("Test the income source string representation")
        self.assertEqual(str(self.test_income_source), "{}: {}".format(
            self.test_income_source.user,
            self.test_income_source.income_source_name
        ).title())


