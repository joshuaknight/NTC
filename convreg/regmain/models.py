from django.db import models

from regmain import constants


class Family(models.Model):
    name = models.CharField(max_length=1024)

    class Meta:
        app_label = constants.APP_LABEL

    def __unicode__(self):
        return '%s' % self.id

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
        }


class Church(models.Model):
    name = models.CharField(max_length=255)

    class Meta:
        app_label = constants.APP_LABEL

    def __unicode__(self):
        return '%s-%s' % (self.id, self.name)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
        }


class AttendantType(models.Model):

    att_type = models.CharField(max_length=255)

    class Meta:
        app_label = constants.APP_LABEL

    def __unicode__(self):
        return '%s' % self.att_type

    def to_dict(self):
        return {
            'id': self.id,
            'att_type': self.att_type,
        }


class ContactInfo(models.Model):
    address = models.TextField(blank=True)
    cell_phone = models.CharField(max_length=255, blank=True)
    email = models.EmailField(blank=True, null=True)
    telephone = models.CharField(max_length=255, blank=True)

    class Meta:
        app_label = constants.APP_LABEL

    def __unicode__(self):
        return '%s' % self.id

    def to_dict(self):
        return {
            'id': self.id,
            'cell_phone' : self.cell_phone,
            'address': self.address,
            'email': self.email,
            'telephone': self.telephone,
        }


class AirportInfo(models.Model):
    FLOW_TYPES = [(x,x) for x in constants.FLOW_TYPE.ALL]

    flow_type = models.CharField(
        choices=FLOW_TYPES, max_length=20)
    airport_code = models.CharField(max_length=20)
    airline = models.CharField(max_length=255)
    datetime = models.DateTimeField()
    luggages = models.IntegerField()

    class Meta:
        app_label = constants.APP_LABEL

    def __unicode__(self):
        return '%s-%s' % self.id
    
    def to_dict(self):
        return {
        'id' : self.id,
        'flow_type' : self.flow_type,
        'airport_code' : self.airport_code,
        'airline' : self.airline,
        'datetime' : self.datetime,
        'luggages' : self.luggages,}       


class Transport(models.Model):

    transport_type = models.CharField(max_length=100)
    airport_info = models.ForeignKey(AirportInfo, null=True)
    comments = models.TextField(blank=True)

    class Meta:
        app_label = constants.APP_LABEL

    def __unicode__(self):
        return '%s' % self.id


class SpecialRequest(models.Model):

    name = models.CharField(max_length=100)
    desc = models.TextField()

    class Meta:
        app_label = constants.APP_LABEL

    def __unicode__(self):
        return '%s-%s' % (self.id, self.name)


class PersonInfo(models.Model):
    SEX_CHOICES = [(x,x) for x in constants.SEX_TYPE.ALL]

    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)

    dob = models.DateTimeField()
    sex = models.CharField(choices=SEX_CHOICES, max_length=20)

    church = models.ForeignKey(Church, null=True)
    family = models.ForeignKey(Family, null=True)
    contact_info = models.ForeignKey(ContactInfo, null=True)
    att_type = models.ForeignKey(AttendantType)

    class Meta:
        app_label = constants.APP_LABEL

    def __unicode__(self):
        return '%s-%s-%s' % (
            self.id, self.first_name, self.last_name)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'dob': self.dob.strftime('%y-%m-%d'),
            'sex': self.sex,
            'church_id': self.church.id,
            'family_id': self.family.id,
            'contact_info': self.contact_info.id,
            'att_type': self.att_type.id,
        }


class VolunteerType(models.Model):

    name = models.CharField(max_length=255)
    #desc = models.TextField

    class Meta:
        app_label = constants.APP_LABEL

    def __unicode__(self):
        return '%s-%s' % (self.id, self.name)


class Event(models.Model):

    name = models.CharField(max_length=255)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    location = models.CharField(max_length=255)

    class Meta:
        app_label = constants.APP_LABEL

    def __unicode__(self):
        return '%s-%s' % (self.id, self.name)


class RegForm(models.Model):

    form_no = models.CharField(max_length=100)
    event = models.ForeignKey(Event)

    class Meta:
        app_label = constants.APP_LABEL

    def __unicode__(self):
        return '%s-%s' % (self.id, self.form_no)


class PersonVolunteer(models.Model):

    event = models.ForeignKey(Event)
    person = models.ForeignKey(PersonInfo)
    activity = models.ForeignKey(VolunteerType)

    class Meta:
        app_label = constants.APP_LABEL

    def __unicode__(self):
        return '%s-%s-%s' % (
            self.event.name, self.person.id, self.activity.name)


class PersonEventMap(models.Model):

    person = models.ForeignKey(PersonInfo)
    event = models.ForeignKey(Event)

    primary_contact = models.BooleanField(default=False)
    arrival = models.DateTimeField()
    departure = models.DateTimeField()
    special_request = models.ForeignKey(SpecialRequest)
    transportation = models.ForeignKey(Transport)

    class Meta:
        app_label = constants.APP_LABEL

    def __unicode__(self):
        return '%s' % self.id

    def to_dict(self):
        return {
            'id' : self.id,
            'primary_contact' : self.primary_contact,
            'arrival' : self.arrival,
            'depature' : self.depature,
            'special_request' : self.special_request,
            'transportation' : self.transportation,
        }


class RegFormPersonMap(models.Model):
    reg_form = models.ForeignKey(RegForm)
    person_event = models.ForeignKey(PersonEventMap)

    class Meta:
        app_label = constants.APP_LABEL

    def __unicode__(self):
        return '%s-%s-%s' % (
            self.id, self.reg_form.id, self.person.id)
