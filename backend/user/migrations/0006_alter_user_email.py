# Generated by Django 5.2 on 2025-04-15 18:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("user", "0005_alter_user_email"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="email",
            field=models.EmailField(max_length=254, unique=True),
        ),
    ]
