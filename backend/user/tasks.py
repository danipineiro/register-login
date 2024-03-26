import logging
from celery.exceptions import SoftTimeLimitExceeded

from common.communication import EmailSender, SmsSender
from common.decorators import count_queries
from joinup.celery import app

logger = logging.getLogger(__name__)


@app.task(time_limit=60)
@count_queries
def send_welcome_email(mail, name, last_name):
    try:
        email = EmailSender()
        template = 'users/welcome_email.html'
        context = {
            'name': name,
            'last_name': last_name
        }
        email.send(mail, 'Welcome to our platform', template, context)
    except SoftTimeLimitExceeded:
        logger.error(f'Time limit exceeded for {send_welcome_email.__name__} task')

@app.task(time_limit=60)
@count_queries
def send_welcome_sms(phone_number, name, last_name):
    try:
        sms = SmsSender()
        sms.send(phone_number, f'{name} {last_name}, welcome to our platform')
    except SoftTimeLimitExceeded:
        logger.error(f'Time limit exceeded for {send_welcome_sms.__name__} task')
