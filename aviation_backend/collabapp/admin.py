
from django.contrib import admin
from .models import Apply, Admission, Contact
from .models import CallbackRequest,ModelApplication


@admin.register(Apply)
class ApplyAdmin(admin.ModelAdmin):
    list_display = ("full_name", "email", "phone", "created_at")
    search_fields = ("full_name", "email", "phone")


@admin.register(Admission)
class AdmissionAdmin(admin.ModelAdmin):
    list_display = ("full_name", "email", "phone", "created_at")
    search_fields = ("full_name", "email", "phone")


from django.contrib import admin
from .models import Contact

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "email",
        "track",
        "created_at",
    )

    search_fields = (
        "name",
        "email",
    )

    list_filter = (
        "track",
        "created_at",
    )

    ordering = ("-created_at",)

admin.site.register(CallbackRequest)


@admin.register(ModelApplication)
class ModelApplicationAdmin(admin.ModelAdmin):

    list_display = (
        "full_name",
        "email",
        "phone",
        "division",
        "created_at",
    )

    search_fields = (
        "full_name",
        "email",
        "phone",
    )

    list_filter = (
        "division",
        "created_at",
    )