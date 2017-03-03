# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AirportInfo',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('flow_type', models.CharField(max_length=20, choices=[(b'inbound', b'inbound'), (b'outbound', b'outbound')])),
                ('airport_code', models.CharField(max_length=20)),
                ('airline', models.CharField(max_length=255)),
                ('datetime', models.DateTimeField()),
                ('luggages', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='AttendantType',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('att_type', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Church',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='ContactInfo',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('address', models.TextField(blank=True)),
                ('cell_phone', models.CharField(max_length=255, blank=True)),
                ('email', models.EmailField(max_length=254, null=True, blank=True)),
                ('telephone', models.CharField(max_length=255, blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255)),
                ('start_date', models.DateTimeField()),
                ('end_date', models.DateTimeField()),
                ('location', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Family',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
            ],
        ),
        migrations.CreateModel(
            name='PersonEventMap',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('primary_contact', models.BooleanField(default=False)),
                ('arrival', models.DateTimeField()),
                ('departure', models.DateTimeField()),
                ('event', models.ForeignKey(to='regmain.Event')),
            ],
        ),
        migrations.CreateModel(
            name='PersonInfo',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('first_name', models.CharField(max_length=255)),
                ('last_name', models.CharField(max_length=255)),
                ('dob', models.DateTimeField()),
                ('sex', models.CharField(max_length=20, choices=[(b'male', b'male'), (b'female', b'female'), (b'transgender', b'transgender')])),
                ('att_type', models.ForeignKey(to='regmain.AttendantType')),
                ('church', models.ForeignKey(to='regmain.Church', null=True)),
                ('contact_info', models.ForeignKey(to='regmain.ContactInfo', null=True)),
                ('family', models.ForeignKey(to='regmain.Family', null=True)),
            ],
        ),
        migrations.CreateModel(
            name='PersonVolunteer',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
            ],
        ),
        migrations.CreateModel(
            name='RegForm',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('form_no', models.CharField(max_length=100)),
                ('event', models.ForeignKey(to='regmain.Event')),
            ],
        ),
        migrations.CreateModel(
            name='RegFormPersonMap',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('person_event', models.ForeignKey(to='regmain.PersonEventMap')),
                ('reg_form', models.ForeignKey(to='regmain.RegForm')),
            ],
        ),
        migrations.CreateModel(
            name='SpecialRequest',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=100)),
                ('desc', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Transport',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('transport_type', models.CharField(max_length=100)),
                ('comments', models.TextField(blank=True)),
                ('airport_info', models.ForeignKey(to='regmain.AirportInfo', null=True)),
            ],
        ),
        migrations.CreateModel(
            name='VolunteerType',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.AddField(
            model_name='personvolunteer',
            name='activity',
            field=models.ForeignKey(to='regmain.VolunteerType'),
        ),
        migrations.AddField(
            model_name='personvolunteer',
            name='event',
            field=models.ForeignKey(to='regmain.Event'),
        ),
        migrations.AddField(
            model_name='personvolunteer',
            name='person',
            field=models.ForeignKey(to='regmain.PersonInfo'),
        ),
        migrations.AddField(
            model_name='personeventmap',
            name='person',
            field=models.ForeignKey(to='regmain.PersonInfo'),
        ),
        migrations.AddField(
            model_name='personeventmap',
            name='special_request',
            field=models.ForeignKey(to='regmain.SpecialRequest'),
        ),
        migrations.AddField(
            model_name='personeventmap',
            name='transportation',
            field=models.ForeignKey(to='regmain.Transport'),
        ),
    ]
