from django.shortcuts import render
from django.http import HttpResponse

def bonjour(request):
    return HttpResponse("Bonjour, Heroku !")