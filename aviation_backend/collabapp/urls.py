
from django.urls import path
from . import views

urlpatterns = [
    path("apply/", views.apply_form, name="apply"),
    path("test-email/", views.test_email, name="test-email"),

    path("admission/", views.admission_form, name="admission"),
    path("contact/", views.contact, name="contact"),
    path("chat/", views.chat, name="chat"),
    path("request-callback/", views.request_callback, name="request-callback"),
    path("model-application/",
    views.model_application,
    name="model-application"),

]