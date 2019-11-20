# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2019-10-30 15:41
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('faconstor', '0052_processrun_curscn'),
    ]

    operations = [
        migrations.AddField(
            model_name='origin',
            name='db_open',
            field=models.IntegerField(blank=True, choices=[(1, '是'), (2, '否')], default=1, null=True, verbose_name='是否恢复完成后打开数据库：1：默认打开数据库；2：不打开数据库'),
        ),
        migrations.AddField(
            model_name='processrun',
            name='db_open',
            field=models.IntegerField(blank=True, default=1, null=True, verbose_name='是否打开数据库'),
        ),
    ]