import logging

from django.conf import settings

logger = logging.getLogger(__name__)


class EmailSender:
    def __init__(self):
        self.mail_provider_key = settings.MAIL_PROVIDER_KEY

    def send(self, to, subject, template, context, attachments=None):
        if self.mail_provider_key is None:
            logger.warning("Mail provider key is not set")
            return

        # mail_client = MailClient(self.mail_provider_key)
        # mail_client.send(to, subject, template, context, attachments)
