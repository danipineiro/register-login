from dj_rest_auth.registration.views import VerifyEmailView
from django.urls import path, include

from auth.views import GoogleLoginAPIView

urlpatterns = [
    path("registration/", include("dj_rest_auth.registration.urls")),
    path(
        "registration/verify-email/",
        VerifyEmailView.as_view(),
        name="account_confirm_email",
    ),
    path("google/", GoogleLoginAPIView.as_view(), name="google-login"),
    path("", include("dj_rest_auth.urls")),
]
