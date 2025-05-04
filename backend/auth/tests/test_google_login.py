import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from unittest.mock import patch
from django.contrib.auth import get_user_model

User = get_user_model()


@pytest.mark.django_db
@patch("google.oauth2.id_token.verify_oauth2_token")
def test_google_login_success(mock_verify):
    client = APIClient()

    mock_id_token = "fake-id-token"
    user_email = "testuser@example.com"

    mock_verify.return_value = {
        "iss": "https://accounts.google.com",
        "email": user_email,
        "email_verified": True,
    }

    url = reverse("google-login")
    response = client.post(url, {"id_token": mock_id_token}, format="json")

    assert response.status_code == status.HTTP_200_OK
    assert "access" in response.data
    assert "refresh" in response.data

    user = User.objects.get(email=user_email)
    assert user.email_verified is True
    assert hasattr(user, "social_login_google")


@pytest.mark.django_db
@patch("google.oauth2.id_token.verify_oauth2_token")
def test_google_login_invalid_issuer(mock_verify):
    client = APIClient()

    mock_verify.return_value = {
        "iss": "invalid-issuer",
        "email": "testuser@example.com",
        "email_verified": True,
    }

    url = reverse("google-login")
    response = client.post(url, {"id_token": "fake-token"}, format="json")

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.data["detail"] == "Invalid issuer."


@pytest.mark.django_db
@patch("google.oauth2.id_token.verify_oauth2_token")
def test_google_login_missing_email(mock_verify):
    client = APIClient()

    mock_verify.return_value = {
        "iss": "https://accounts.google.com",
        "email_verified": True,
    }

    url = reverse("google-login")
    response = client.post(url, {"id_token": "fake-token"}, format="json")

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.data["detail"] == "Email not found in token."


@pytest.mark.django_db
@patch(
    "google.oauth2.id_token.verify_oauth2_token",
    side_effect=ValueError("Invalid token"),
)
def test_google_login_invalid_token(mock_verify):
    client = APIClient()

    url = reverse("google-login")
    response = client.post(url, {"id_token": "bad-token"}, format="json")

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.data["detail"] == "Invalid token."
