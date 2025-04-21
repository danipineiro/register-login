from allauth.account.adapter import DefaultAccountAdapter
from allauth.account.models import EmailConfirmation
from django.conf import settings


class CustomAccountAdapter(DefaultAccountAdapter):
    def get_email_confirmation_url(self, request, emailconfirmation: EmailConfirmation):
        key = emailconfirmation.key
        return f"{settings.FRONTEND_URL}/confirm-email?key={key}"
