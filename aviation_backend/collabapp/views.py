
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Apply
from .models import Admission,Contact
from .serializers import ApplySerializer,AdmissionSerializer,ContactSerializer

from .services.notification_service import send_apply_notifications,send_admission_notifications,send_contact_notifications,send_model_notifications
from .services.brevo_email import send_email

from .models import CallbackRequest
from .serializers import CallbackRequestSerializer
from .services.notification_service import send_callback_notification
from .services.ai_chat import ask_ai
from .models import ModelApplication
from .serializers import ModelApplicationSerializer

@api_view(["POST"])
def apply_form(request):
    serializer = ApplySerializer(data=request.data)

    if serializer.is_valid():

        application = serializer.save()

        try:
            send_apply_notifications(application)
        except Exception as e:
            print("Email Error:", e)

        return Response(
            {
                "success": True,
                "message": "Application submitted successfully.",
                "application_id": application.id,
            },
            status=status.HTTP_201_CREATED,
        )

    return Response(
        {
            "success": False,
            "errors": serializer.errors,
        },
        status=status.HTTP_400_BAD_REQUEST,
    )


@api_view(["GET"])
def test_email(request):

    status_code, response = send_email(
        to_email="anug26446@gmail.com",
        to_name="Anusha",
        subject="Brevo API Test",
        html_content="""
        <h2>Congratulations 🎉</h2>
        <p>Your Brevo Email API is working successfully.</p>
        """,
    )

    return Response(
        {
            "status_code": status_code,
            "response": response,
        }
    )


@api_view(["POST"])
def admission_form(request):
    serializer = AdmissionSerializer(data=request.data)

    if serializer.is_valid():
        admission = serializer.save()

        try:
            send_admission_notifications(admission)
        except Exception as e:
            print("Admission Email Error:", e)

        return Response(
            {
                "success": True,
                "message": "Admission submitted successfully.",
                "id": admission.id,
            },
            status=status.HTTP_201_CREATED,
        )

    return Response(
        {
            "success": False,
            "errors": serializer.errors,
        },
        status=status.HTTP_400_BAD_REQUEST,
    )
@api_view(["POST"])
def contact(request):
    serializer = ContactSerializer(data=request.data)

    if serializer.is_valid():
        contact = serializer.save()

        try:
            send_contact_notifications(contact)
        except Exception as e:
            print("Contact Email Error:", e)

        return Response({
            "success": True,
            "message": "Contact request submitted."
        })

    return Response({
        "success": False,
        "errors": serializer.errors
    }, status=400)



@api_view(["POST"])
def request_callback(request):

    serializer = CallbackRequestSerializer(data=request.data)

    if serializer.is_valid():

        callback = serializer.save()

        try:
            send_callback_notification(callback)
        except Exception as e:
            print("Callback Email Error:", e)

        return Response({
            "success": True,
            "message": "Callback request submitted."
        })

    return Response({
        "success": False,
        "errors": serializer.errors
    }, status=400)

@api_view(["POST"])
def chat(request):

    messages = request.data.get("messages",[])

    if not messages:
        return Response(
            {
                "success": False,
                "error": "Message is required"
            },
            status=400,
        )

    try:
        reply = ask_ai(messages)

        return Response(
            {
                "success": True,
                "reply": reply
            }
        )

    except Exception as e:
        print(e)

        return Response(
            {
                "success": False,
                "error": str(e)
            },
            status=500,
        )

@api_view(["POST"])
def model_application(request):

    serializer = ModelApplicationSerializer(data=request.data)

    if serializer.is_valid():

        application = serializer.save()

        try:
            send_model_notifications(application)

        except Exception as e:
            print(e)

        return Response({
            "success": True,
            "message": "Application submitted successfully."
        })

    return Response(serializer.errors, status=400)