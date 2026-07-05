
from .brevo_email import send_email

from .email_templates import (
    student_apply_email,
    admin_apply_email,
    student_admission_email,
    admin_admission_email,
    student_contact_email,
    admin_contact_email,
)
from .email_templates import admin_callback_email


ADMIN_EMAIL = "anug26446@gmail.com"


def send_apply_notifications(application):
    """
    Sends:
    1. Confirmation email to the student
    2. Notification email to the admin
    """

    # Email to Student
    send_email(
        to_email=application.email,
        to_name=application.full_name,
        subject="Application Received - Aviation Training",
        html_content=student_apply_email(application.full_name),
    )

    # Email to Admin
    send_email(
        to_email=ADMIN_EMAIL,
        to_name="Admin",
        subject="New Application Received",
        html_content=admin_apply_email(application),
    )



def send_admission_notifications(admission):

    send_email(
        to_email=admission.email,
        to_name=admission.full_name,
        subject="Admission Request Received",
        html_content=student_admission_email(admission.full_name),
    )

    send_email(
        to_email=ADMIN_EMAIL,
        to_name="Admin",
        subject="New Admission Request",
        html_content=admin_admission_email(admission),
    )
def send_contact_notifications(contact):

    send_email(
        to_email=contact.email,
        to_name=contact.name,
        subject="We Received Your Enquiry",
        html_content=student_contact_email(contact.name),
    )

    send_email(
        to_email=ADMIN_EMAIL,
        to_name="Admin",
        subject="New Contact Enquiry",
        html_content=admin_contact_email(contact),
    )

def send_callback_notification(callback):

    send_email(
        to_email=ADMIN_EMAIL,
        to_name="Admin",
        subject="New Callback Request",
        html_content=admin_callback_email(callback),
    )
