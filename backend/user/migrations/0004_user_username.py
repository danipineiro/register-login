# Generated by Django 5.2 on 2025-04-15 16:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("user", "0001_squashed_0003_user_groups_user_user_permissions_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="username",
            field=models.CharField(default="user", max_length=150, unique=True),
            preserve_default=False,
        ),
    ]
