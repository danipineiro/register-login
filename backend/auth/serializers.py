from allauth.account.utils import get_user_model
from allauth.account.utils import user_pk_to_url_str
from dj_rest_auth.serializers import PasswordResetSerializer
from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import render_to_string
from rest_framework import serializers

User = get_user_model()


class CustomPasswordResetSerializer(PasswordResetSerializer):
    def get_email_options(self):
        return {}

    def validate_email(self, value):
        # Esto mantiene la validación original
        value = super().validate_email(value)
        self.request = self.context.get("request")
        return value

    def save(self, **kwargs):
        if "allauth" in settings.INSTALLED_APPS:
            from allauth.account.forms import default_token_generator
        else:
            from django.contrib.auth.tokens import default_token_generator

        request = self.context.get("request")
        email = self.data["email"]
        user = User.objects.filter(email__iexact=email).first()

        if user:
            uid = user_pk_to_url_str(user)
            token = default_token_generator.make_token(user)

            reset_url = f"{settings.FRONTEND_URL}/auth/password/reset/confirm?uid={uid}&token={token}"

            context = {
                "user": user,
                "reset_url": reset_url,
                "request": request,
            }

            subject = "Password Reset Requested"
            message = render_to_string(
                "account/email/password_reset_key_message.html", context
            )

            send_mail(
                subject,
                message,
                settings.DEFAULT_FROM_EMAIL,
                [
                    user.email,
                ],
            )


class GoogleLoginSerializer(serializers.Serializer):
    id_token = serializers.CharField(required=True)
