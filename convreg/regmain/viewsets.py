from rest_framework import viewsets

from regmain import models
from regmain import serializers


class FamilyViewSet(viewsets.ModelViewSet):
    queryset = models.Family.objects.all()
    serializer_class = serializers.FamilySerializer


class ChurchViewSet(viewsets.ModelViewSet):
    queryset = models.Church.objects.all()
    serializer_class = serializers.ChurchSerializer


class AttendantTypeViewSet(viewsets.ModelViewSet):
    queryset = models.AttendantType.objects.all()
    serializer_class = serializers.AttendantTypeSerializer


class ContactInfoViewSet(viewsets.ModelViewSet):
    queryset = models.ContactInfo.objects.all()
    serializer_class = serializers.ContactInfoSerializer


class AirportInfoViewSet(viewsets.ModelViewSet):
    queryset = models.AirportInfo.objects.all()
    serializer_class = serializers.AirportInfoSerializer


class TransportViewSet(viewsets.ModelViewSet):
    queryset = models.Transport.objects.all()
    serializer_class = serializers.TransportSerializer


class SpecialRequestViewSet(viewsets.ModelViewSet):
    queryset = models.SpecialRequest.objects.all()
    serializer_class = serializers.SpecialRequestSerializer


class PersonInfoViewSet(viewsets.ModelViewSet):
    queryset = models.PersonInfo.objects.all()
    serializer_class = serializers.PersonInfoSerializer


class VolunteerTypeViewSet(viewsets.ModelViewSet):
    queryset = models.VolunteerType.objects.all()
    serializer_class = serializers.VolunteerTypeSerializer


class EventViewSet(viewsets.ModelViewSet):
    queryset = models.Event.objects.all()
    serializer_class = serializers.EventSerializer


class RegFormViewSet(viewsets.ModelViewSet):
    queryset = models.RegForm.objects.all()
    serializer_class = serializers.RegFormSerializer


class PersonVolunteerViewSet(viewsets.ModelViewSet):
    queryset = models.PersonVolunteer.objects.all()
    serializer_class = serializers.PersonVolunteerSerializer


class PersonEventMapViewSet(viewsets.ModelViewSet):
    queryset = models.PersonEventMap.objects.all()
    serializer_class = serializers.PersonEventMapSerializer


class RegFormPersonMapViewSet(viewsets.ModelViewSet):
    queryset = models.RegFormPersonMap.objects.all()
    serializer_class = serializers.RegFormPersonMapSerializer
