# Generated by Django 3.1.2 on 2021-03-29 15:16

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Food',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('bf', models.IntegerField()),
                ('lu', models.IntegerField()),
                ('di', models.IntegerField()),
                ('cal', models.IntegerField()),
                ('fat', models.IntegerField()),
                ('pro', models.IntegerField()),
                ('sug', models.IntegerField()),
            ],
        ),
    ]
