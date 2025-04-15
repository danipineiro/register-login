from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models

from common.models import TimeStampedModel
from user.managers import CustomUserManager


class User(AbstractBaseUser, PermissionsMixin, TimeStampedModel):

    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    email_verified = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email
