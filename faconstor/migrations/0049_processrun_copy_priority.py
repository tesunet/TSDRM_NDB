# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2019-10-28 13:58
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('faconstor', '0048_auto_20191028_1337'),
    ]

    operations = [
        migrations.AddField(
            model_name='processrun',
            name='copy_priority',
            field=models.IntegerField(blank=True, default=1, verbose_name='优先拷贝顺序'),
        ),
    ]
