# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2019-09-18 19:37
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('faconstor', '0033_auto_20190918_1328'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='processrun',
            name='recover_job_id',
        ),
        migrations.AlterField(
            model_name='group',
            name='remark',
            field=models.TextField(blank=True, null=True, verbose_name='说明'),
        ),
        migrations.AlterField(
            model_name='invitation',
            name='purpose',
            field=models.TextField(blank=True, null=True, verbose_name='演练目的'),
        ),
        migrations.AlterField(
            model_name='process',
            name='remark',
            field=models.TextField(blank=True, null=True, verbose_name='预案描述'),
        ),
        migrations.AlterField(
            model_name='processrun',
            name='note',
            field=models.TextField(blank=True, null=True, verbose_name='记录'),
        ),
        migrations.AlterField(
            model_name='processrun',
            name='run_reason',
            field=models.TextField(blank=True, null=True, verbose_name='启动原因'),
        ),
        migrations.AlterField(
            model_name='processtask',
            name='content',
            field=models.TextField(blank=True, null=True, verbose_name='任务内容'),
        ),
        migrations.AlterField(
            model_name='processtask',
            name='explain',
            field=models.TextField(blank=True, null=True, verbose_name='处理说明'),
        ),
        migrations.AlterField(
            model_name='processtask',
            name='result',
            field=models.TextField(blank=True, null=True, verbose_name='处理结果'),
        ),
        migrations.AlterField(
            model_name='scriptrun',
            name='explain',
            field=models.TextField(blank=True, null=True, verbose_name='运行说明'),
        ),
        migrations.AlterField(
            model_name='scriptrun',
            name='note',
            field=models.TextField(blank=True, null=True, verbose_name='记录'),
        ),
        migrations.AlterField(
            model_name='scriptrun',
            name='result',
            field=models.TextField(blank=True, null=True, verbose_name='运行结果'),
        ),
        migrations.AlterField(
            model_name='scriptrun',
            name='runlog',
            field=models.TextField(blank=True, null=True, verbose_name='运行日志'),
        ),
        migrations.AlterField(
            model_name='steprun',
            name='explain',
            field=models.TextField(blank=True, null=True, verbose_name='运行说明'),
        ),
        migrations.AlterField(
            model_name='steprun',
            name='note',
            field=models.TextField(blank=True, null=True, verbose_name='记录'),
        ),
        migrations.AlterField(
            model_name='steprun',
            name='parameter',
            field=models.CharField(blank=True, max_length=500, null=True, verbose_name='运行参数'),
        ),
        migrations.AlterField(
            model_name='steprun',
            name='result',
            field=models.TextField(blank=True, null=True, verbose_name='运行结果'),
        ),
        migrations.AlterField(
            model_name='userinfo',
            name='remark',
            field=models.TextField(blank=True, null=True, verbose_name='说明'),
        ),
    ]
