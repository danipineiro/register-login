from allauth.account.adapter import DefaultAccountAdapter
from allauth.account.models import EmailConfirmation
from django.conf import settings


class CustomAccountAdapter(DefaultAccountAdapter):
    def get_email_confirmation_url(self, request, emailconfirmation: EmailConfirmation):
        key = emailconfirmation.key
        return f"{settings.FRONTEND_URL}/confirm-email?key={key}"

    def send_mail(self, template_prefix, email_template, context, to):
        if template_prefix == "account/email/password_reset_key":
            uid = context.get("uid")
            token = context.get("token")
            context["password_reset_url"] = (
                f"{settings.FRONTEND_URL}/reset-password?uid={uid}&token={token}"
            )
        super().send_mail(template_prefix, email_template, context, to)
