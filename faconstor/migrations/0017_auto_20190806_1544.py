# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2019-08-06 15:44
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('faconstor', '0016_hostsmanage_state'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='script',
            name='command',
        ),
        migrations.RemoveField(
            model_name='script',
            name='maxtime',
        ),
        migrations.RemoveField(
            model_name='script',
            name='param',
        ),
        migrations.RemoveField(
            model_name='script',
            name='paramtype',
        ),
        migrations.RemoveField(
            model_name='script',
            name='password',
        ),
        migrations.RemoveField(
            model_name='script',
            name='port',
        ),
        migrations.RemoveField(
            model_name='script',
            name='runpath',
        ),
        migrations.RemoveField(
            model_name='script',
            name='runtype',
        ),
        migrations.RemoveField(
            model_name='script',
            name='time',
        ),
        migrations.RemoveField(
            model_name='script',
            name='type',
        ),
        migrations.RemoveField(
            model_name='script',
            name='username',
        ),
    ]
