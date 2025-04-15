from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from .models import User


class UserAdmin(BaseUserAdmin):
    model = User
    ordering = ["-created"]
    list_display = ["email", "username", "is_active", "is_staff", "email_verified", "created"]
    list_filter = ["is_staff", "is_active", "email_verified", "created"]
    search_fields = ["email", "username"]

admin.site.register(User, UserAdmin)
