import json
from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework import status

from user_profiles.models import UserProfile

User = get_user_model()

USR_PROFILE_URL = '/api/profiles/user-profile/'
USR_PROFILE_CREATE_URL = '/api/profiles/user/'


def get_test_user():
    return User.objects.create_user(
        'testuser',
        'testpassword'
    )


class ProfilePublicApiTests(TestCase):
    """Test the publicly available user profile API"""

    def setUp(self):
        self.test_user = get_test_user()
        self.test_user_profile = UserProfile.objects.create(
            user=self.test_user,
            contact_email="testemail@gmx.com",
            surname="McTest",
            given_name="Testy"
        )

    def test_login_required_profile(self):
        """Test that login required for retrieving user profile url"""
        print("Test that login required for retrieving user profile url")
        res = self.client.get(USR_PROFILE_URL)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_user_and_user_profile_creation_success(self):
        "Test that user and profile are successfully created together"""
        print("Test that user and profile are successfully created together")
        payload = {
                'username': 'TestUser2',
                'password': 'testpassword',
                're_password': 'testpassword',
                'profile': {
                    'contact_email': 'testemail@gmx.com',
                    'surname': 'McTest2',
                    'given_name': 'Test'
                }
            }
        res = self.client.post(
            USR_PROFILE_CREATE_URL, data=json.dumps(payload),
            content_type='application/json')
        self.assertEquals(res.data['message'], 'User successfully created!')
        self.assertTrue(
            res.status_code == status.HTTP_201_CREATED)
        self.assertEquals('TestUser2', User.objects.get(username='TestUser2').username)
