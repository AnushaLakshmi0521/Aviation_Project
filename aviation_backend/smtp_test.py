
import os
import ssl
import certifi
import smtplib
from dotenv import load_dotenv

load_dotenv()

os.environ["SSL_CERT_FILE"] = certifi.where()

context = ssl.create_default_context(cafile=certifi.where())

try:
    server = smtplib.SMTP("smtp-relay.brevo.com", 587, timeout=10)
    server.ehlo()
    server.starttls(context=context)
    server.ehlo()

    server.login(
        os.getenv("EMAIL_HOST_USER"),
        os.getenv("EMAIL_HOST_PASSWORD")
    )

    print("✅ SMTP Login Successful")

    server.sendmail(
        os.getenv("EMAIL_HOST_USER"),
        "anug26446@gmail.com",
        """Subject: Test Email

Hello from Django + Brevo!
"""
    )

    print("✅ Email Sent Successfully")

    server.quit()

except smtplib.SMTPAuthenticationError as e:
    print("Authentication Error:", e.smtp_code, e.smtp_error)

except smtplib.SMTPSenderRefused as e:
    print("Sender Refused:", e.smtp_code, e.smtp_error)

except Exception as e:
    print(type(e).__name__)
    print(e)