from django.contrib import admin
from django.urls import path, include
from dj_rest_auth.registration.views import VerifyEmailView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/auth/", include("dj_rest_auth.urls")),
    path("api/v1/auth/registration/", include("dj_rest_auth.registration.urls")),
    path('api/v1/auth/registration/verify-email/', VerifyEmailView.as_view(), name='account_confirm_email'),
]
