from django.test import TestCase

from currencies.models import Currency


class CurrencyModelTests(TestCase):
    """Test the Currency Model"""

    def setUp(self):
        self.currency = Currency.objects.create(
            currency_name="Test Currency",
            currency_code="TCR"
        )

    def test_currency_fields(self):
        """Test the currency fields"""
        print("Test the currency fields")
        self.assertEqual(self.currency.currency_name, 'Test Currency')
        self.assertEqual(self.currency.currency_code, 'TCR')

    def test_currency_model_str(self):
        """Test the currency string representation"""
        print("Test the currency string representation")
        self.assertEqual(str(self.currency), "{} ({})".format(
            self.currency.currency_code,
            self.currency.currency_name
        ))
