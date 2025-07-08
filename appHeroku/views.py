from django.shortcuts import render
from django.http import HttpResponse
from .models import Contact

def bonjour(request):
    return HttpResponse("Bonjour, Heroku !")

def read_contacts_console(request):
    contacts = Contact.objects.all().order_by('id')
    for c in contacts:
        print(f"{c.id} | {c.name} | {c.email} | {c.phone}")
    return HttpResponse("Contacts sehll (Heroku logs)")