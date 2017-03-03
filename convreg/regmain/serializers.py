from rest_framework import serializers

from regmain import models


class FamilySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Family
        fields = ('id', )


class ChurchSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Church
        fields = ('id', 'name')


class AttendantTypeSerializer(
        serializers.HyperlinkedModelSerializer):

    class Meta:
        model = models.AttendantType
        fields = ('id', 'att_type')


class ContactInfoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.ContactInfo
        fields = ('address', 'cell_phone', 'email', 'telephone')


class AirportInfoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.AirportInfo
        fields = (
            'flow_type', 'airport_code', 'airline', 'datetime',
            'luggages')


class TransportSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Transport
        fields = (
            'transport_type', 'airport_info', 'comments')


class SpecialRequestSerializer(
        serializers.HyperlinkedModelSerializer):

    class Meta:
        model = models.SpecialRequest
        fields = ('name', 'desc')


class PersonInfoSerializer(
        serializers.HyperlinkedModelSerializer):

    class Meta:
        model = models.PersonInfo
        fields = (
            'first_name', 'last_name', 'dob', 'sex', 'church'
            'family', 'contact_info', 'att_type')


class VolunteerTypeSerializer(
        serializers.HyperlinkedModelSerializer):

    class Meta:
        model = models.VolunteerType
        fields = ('name', 'desc')


class EventSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = models.Event
        fields = ('name', 'start_date', 'end_date', 'location')


class RegFormSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = models.RegForm
        fields = ('form_no', 'event')


class PersonVolunteerSerializer(
        serializers.HyperlinkedModelSerializer):

    class Meta:
        model = models.PersonVolunteer
        fields = ('event', 'person', 'activity')


class PersonEventMapSerializer(
        serializers.HyperlinkedModelSerializer):

    class Meta:
        model = models.PersonEventMap
        fields = (
            'person', 'event', 'primary_contact', 'arrival',
            'departure', 'special_request', 'transportation')


class RegFormPersonMapSerializer(
        serializers.HyperlinkedModelSerializer):

    class Meta:
        model = models.RegFormPersonMap
        fields = (
            'reg_form', 'person_event')
