# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2019-09-03 23:10
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('faconstor', '0023_auto_20190903_1539'),
    ]

    operations = [
        migrations.AddField(
            model_name='script',
            name='commv_interface',
            field=models.CharField(blank=True, max_length=64, null=True, verbose_name='commvaul接口脚本'),
        ),
        migrations.AddField(
            model_name='script',
            name='interface_type',
            field=models.CharField(blank=True, max_length=32, null=True, verbose_name='日志地址'),
        ),
        migrations.AddField(
            model_name='script',
            name='origin',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='faconstor.Origin', verbose_name='源端客户端'),
        ),
    ]