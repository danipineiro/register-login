from django.db.models.signals import post_save
from django.dispatch import receiver

from . import tasks
from .models import User


@receiver(post_save, sender=User)
def send_welcome_email(sender, instance=None, created=False, **kwargs):
    if created:
        tasks.send_welcome_email.delay(instance.email)
