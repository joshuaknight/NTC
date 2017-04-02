# -*- coding: utf-8 -*-
# Generated by Django 1.10.2 on 2016-10-03 15:10
from __future__ import unicode_literals

import Article.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Article_Comment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comment_name', models.CharField(max_length=20, validators=[Article.models.valid_name], verbose_name=b'Your Name')),
                ('comment_date', models.DateField()),
                ('slug', models.SlugField()),
                ('object_id', models.PositiveIntegerField(blank=True)),
                ('comment_content', models.CharField(max_length=400, validators=[Article.models.valid_comment])),
            ],
        ),
        migrations.CreateModel(
            name='New_Article',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('author_name', models.CharField(max_length=20, validators=[Article.models.valid_name])),
                ('slug', models.SlugField()),
                ('article_name', models.CharField(max_length=30, validators=[Article.models.valid_name])),
                ('content', models.CharField(max_length=20000, validators=[Article.models.valid_content])),
                ('publ_date', models.DateField(verbose_name=b'Publication Date')),
            ],
        ),
        migrations.CreateModel(
            name='reply_comment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('reply_content', models.CharField(max_length=100)),
                ('reply_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Article.Article_Comment')),
            ],
        ),
    ]