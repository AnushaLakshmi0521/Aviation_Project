
from django.core.mail import send_mail
from django.conf import settings


def send_test_email():
    send_mail(
        subject="Django + Brevo Test",
        message="🎉 Congratulations! Your Django application is successfully sending emails using Brevo SMTP.",
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=["anug26446@gmail.com"],
        fail_silently=False,
    )