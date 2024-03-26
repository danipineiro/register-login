from django.conf import settings

class EmailSender:
    def __init__(self):
        self.mail_provider_key = settings.MAIL_PROVIDER_KEY

    def send(self, to, subject, template, context, attachments=None):
        if self.mail_provider_key is None:
            return

        # mail_client = MailClient(self.mail_provider_key)
        # mail_client.send(to, subject, template, context, attachments)


class SmsSender:
    def __init__(self):
        self.sms_provider_key = settings.SMS_PROVIDER_KEY

    def send(self, to, message):
        if self.sms_provider_key is None:
            return

        # sms_client = SmsClient(self.sms_provider_key)
        # sms_client.send(to, message)
