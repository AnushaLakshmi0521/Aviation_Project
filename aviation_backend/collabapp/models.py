
from django.db import models


class Apply(models.Model):
    full_name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=20)

    gender = models.CharField(max_length=20)
    age = models.IntegerField()

    qualification = models.CharField(max_length=100)

    height = models.FloatField()
    weight = models.FloatField()

    selected_center = models.CharField(max_length=200)
    career_track = models.CharField(max_length=200)

    message = models.TextField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.full_name

class Admission(models.Model):
    full_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    selected_center = models.CharField(max_length=255, default="South Bengaluru (Head Office)")
    career_track = models.CharField(max_length=255, default="Not Specified")
    message = models.TextField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.full_name

class Contact(models.Model):
    TRACK_CHOICES = [
        ("general", "General"),
        ("white-collar", "White Collar"),
        ("blue-collar", "Blue Collar"),
    ]

    name = models.CharField(max_length=200)
    email = models.EmailField()
    track = models.CharField(max_length=50, choices=TRACK_CHOICES)
    message = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class CallbackRequest(models.Model):
    phone = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.phone


class ModelApplication(models.Model):
    DIVISION_CHOICES = [
        ("Modeling Foundation", "Modeling Foundation"),
        ("Ramp Modeling", "Ramp Modeling"),
        ("Print Modeling", "Print Modeling"),
        ("Commercial Modeling", "Commercial Modeling"),
        ("E-Commerce Modeling", "E-Commerce Modeling"),
        ("Catalogue Modeling", "Catalogue Modeling"),
        ("Bridal Modeling", "Bridal Modeling"),
        ("Ethnic Wear Modeling", "Ethnic Wear Modeling"),
        ("Luxury Modeling", "Luxury Modeling"),
    ]

    full_name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=20)

    instagram = models.URLField(blank=True, null=True)

    age = models.PositiveIntegerField()
    height = models.PositiveIntegerField()

    division = models.CharField(
        max_length=100,
        choices=DIVISION_CHOICES
    )

    message = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.full_name