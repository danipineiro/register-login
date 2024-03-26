from django.contrib.auth.models import AbstractUser
from django.db import models

from common.models import TimeStampedModel


class User(AbstractUser, TimeStampedModel):
    username = None
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    hobbies = models.CharField(max_length=500, blank=True)
    phone_number = models.CharField(max_length=15, blank=True)
    email_verified = models.BooleanField(default=False)
    sms_verified = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
