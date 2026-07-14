
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


from .email_templates import (
    student_model_application_email,
    admin_model_application_email,
)


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

def send_model_notifications(application):

    send_email(
        to_email=application.email,
        to_name=application.full_name,
        subject="Your Modeling Application has been received",
        html_content=student_model_email(application.full_name),
    )

    send_email(
        to_email="YOUR_ADMIN_EMAIL",
        to_name="Admin",
        subject="New Modeling Application",
        html_content=admin_model_email(application),
    )

def student_model_email(name):

    return f"""
    <html>

    <body style="font-family:Arial">

        <h2>Hello {name} 👋</h2>

        <p>
        Thank you for applying to our Professional Modeling Academy.
        </p>

        <p>
        We have received your application successfully.
        </p>

        <p>
        Our talent acquisition team will review your profile and contact you within 48 hours.
        </p>

        <br>

        <b>
        Regards,
        </b>

        <br><br>

        Professional Modeling Academy

    </body>

    </html>
    """

def admin_model_email(application):

    return f"""
    <html>

    <body>

    <h2>New Modeling Application</h2>

    <table border="1" cellpadding="8">

        <tr>
            <td><b>Name</b></td>
            <td>{application.full_name}</td>
        </tr>

        <tr>
            <td><b>Email</b></td>
            <td>{application.email}</td>
        </tr>

        <tr>
            <td><b>Phone</b></td>
            <td>{application.phone}</td>
        </tr>

        <tr>
            <td><b>Instagram</b></td>
            <td>{application.instagram}</td>
        </tr>

        <tr>
            <td><b>Age</b></td>
            <td>{application.age}</td>
        </tr>

        <tr>
            <td><b>Height</b></td>
            <td>{application.height}</td>
        </tr>

        <tr>
            <td><b>Division</b></td>
            <td>{application.division}</td>
        </tr>

        <tr>
            <td><b>Message</b></td>
            <td>{application.message}</td>
        </tr>

    </table>

    </body>

    </html>
    """
