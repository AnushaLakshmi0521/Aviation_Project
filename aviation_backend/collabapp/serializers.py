
from rest_framework import serializers
from .models import Apply ,Admission,Contact
from .models import CallbackRequest
from .models import ModelApplication

class ApplySerializer(serializers.ModelSerializer):
    class Meta:
        model = Apply
        fields = "__all__"

class AdmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admission
        fields = "__all__"



class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = "__all__"

class CallbackRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = CallbackRequest
        fields = "__all__"

class ModelApplicationSerializer(serializers.ModelSerializer):

    class Meta:
        model = ModelApplication
        fields = "__all__"