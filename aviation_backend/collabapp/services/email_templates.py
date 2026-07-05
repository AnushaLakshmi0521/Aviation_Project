
def student_apply_email(name):
    return f"""
    <html>
        <body style="font-family:Arial,sans-serif;">
            <h2>Hello {name}, 👋</h2>

            <p>Thank you for applying to <b>Aviation Training</b>.</p>

            <p>
            We have successfully received your application.
            Our admissions team will review it and contact you soon.
            </p>

            <br>

            <p>Regards,</p>

            <h3>Aviation Training Team</h3>
        </body>
    </html>
    """


def admin_apply_email(app):
    return f"""
    <html>
        <body>

        <h2>New Application Received</h2>

        <table border="1" cellpadding="8" cellspacing="0">

            <tr>
                <td><b>Name</b></td>
                <td>{app.full_name}</td>
            </tr>

            <tr>
                <td><b>Email</b></td>
                <td>{app.email}</td>
            </tr>

            <tr>
                <td><b>Phone</b></td>
                <td>{app.phone}</td>
            </tr>

            <tr>
                <td><b>Gender</b></td>
                <td>{app.gender}</td>
            </tr>

            <tr>
                <td><b>Age</b></td>
                <td>{app.age}</td>
            </tr>

            <tr>
                <td><b>Qualification</b></td>
                <td>{app.qualification}</td>
            </tr>

            <tr>
                <td><b>Height</b></td>
                <td>{app.height}</td>
            </tr>

            <tr>
                <td><b>Weight</b></td>
                <td>{app.weight}</td>
            </tr>

            <tr>
                <td><b>Training Center</b></td>
                <td>{app.selected_center}</td>
            </tr>

            <tr>
                <td><b>Career Track</b></td>
                <td>{app.career_track}</td>
            </tr>

            <tr>
                <td><b>Message</b></td>
                <td>{app.message}</td>
            </tr>

        </table>

        </body>
    </html>
    """

def student_admission_email(name):
    return f"""
    <html>
        <body style="font-family:Arial,sans-serif;">

            <h2>Hello {name}, 👋</h2>

            <p>Thank you for submitting your admission request.</p>

            <p>
            We have successfully received your registration.
            Our admissions team will review your details and contact you shortly.
            </p>

            <br>

            <p>Regards,</p>

            <h3>Aviation Training Team</h3>

        </body>
    </html>
    """

def admin_admission_email(admission):
    return f"""
    <html>
    <body>

    <h2>New Admission Request</h2>

    <table border="1" cellpadding="8" cellspacing="0">

        <tr>
            <td><b>Name</b></td>
            <td>{admission.full_name}</td>
        </tr>

        <tr>
            <td><b>Email</b></td>
            <td>{admission.email}</td>
        </tr>

        <tr>
            <td><b>Phone</b></td>
            <td>{admission.phone}</td>
        </tr>

        <tr>
            <td><b>Training Center</b></td>
            <td>{admission.selected_center}</td>
        </tr>

        <tr>
            <td><b>Career Track</b></td>
            <td>{admission.career_track}</td>
        </tr>

        <tr>
            <td><b>Message</b></td>
            <td>{admission.message}</td>
        </tr>

    </table>

    </body>
    </html>
    """

def student_contact_email(name):
    return f"""
    <html>
    <body>

    <h2>Hello {name},</h2>

    <p>Thank you for contacting Aviation Training.</p>

    <p>
    We have received your enquiry successfully.
    Our support team will contact you shortly.
    </p>

    <br>

    <b>Regards,</b><br>
    Aviation Training Team

    </body>
    </html>
    """

def admin_contact_email(contact):
    return f"""
    <html>
    <body>

    <h2>New Contact Enquiry</h2>

    <table border="1" cellpadding="8">

        <tr>
            <td><b>Name</b></td>
            <td>{contact.name}</td>
        </tr>

        <tr>
            <td><b>Email</b></td>
            <td>{contact.email}</td>
        </tr>

        <tr>
            <td><b>Track</b></td>
            <td>{contact.track}</td>
        </tr>

        <tr>
            <td><b>Message</b></td>
            <td>{contact.message}</td>
        </tr>

    </table>

    </body>
    </html>
    """

def admin_callback_email(callback):
    return f"""
    <html>
    <body>

    <h2>New Callback Request</h2>

    <table border="1" cellpadding="8">

        <tr>
            <td><b>Phone Number</b></td>
            <td>{callback.phone}</td>
        </tr>

    </table>

    </body>
    </html>
    """