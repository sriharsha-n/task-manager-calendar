# Generated by Django 2.2.8 on 2021-04-28 11:23

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('name', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('password', models.CharField(max_length=100)),
                ('id', models.CharField(default=uuid.uuid4, max_length=36, primary_key=True, serialize=False)),
            ],
        ),
        migrations.AddField(
            model_name='task',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='task',
            name='id',
            field=models.CharField(default=uuid.uuid4, max_length=36, primary_key=True, serialize=False),
        ),
        migrations.AddField(
            model_name='task',
            name='user_id',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='api.User'),
            preserve_default=False,
        ),
    ]
