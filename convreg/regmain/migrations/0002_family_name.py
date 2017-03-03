# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('regmain', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='family',
            name='name',
            field=models.CharField(default='delete', max_length=1024),
            preserve_default=False,
        ),
    ]
