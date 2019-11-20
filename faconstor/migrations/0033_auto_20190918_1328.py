# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2019-09-18 13:28
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('faconstor', '0032_processrun_browse_job_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='processrun',
            name='recover_job_id',
            field=models.CharField(blank=True, max_length=50, null=True, verbose_name='运行的恢复任务ID'),
        ),
        migrations.AlterField(
            model_name='processrun',
            name='browse_job_id',
            field=models.CharField(blank=True, max_length=50, null=True, verbose_name='指点时间点的备份任务ID'),
        ),
    ]
