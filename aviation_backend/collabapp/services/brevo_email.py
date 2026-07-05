
import os
import requests
from dotenv import load_dotenv

load_dotenv()

BREVO_API_KEY = os.getenv("BREVO_API_KEY")


def send_email(to_email, to_name, subject, html_content):

    url = "https://api.brevo.com/v3/smtp/email"

    headers = {
        "accept": "application/json",
        "api-key": BREVO_API_KEY,
        "content-type": "application/json",
    }

    payload = {
        "sender": {
            "name": "Aviation Training",
            "email": "anug26446@gmail.com"
        },
        "to": [
            {
                "email": to_email,
                "name": to_name
            }
        ],
        "subject": subject,
        "htmlContent": html_content
    }

    response = requests.post(
        url,
        json=payload,
        headers=headers,
        timeout=30
    )

    return response.status_code, response.text