import datetime

import django.utils.timezone
from django.contrib.auth.models import AbstractUser
from django.db import models, transaction
from django.contrib.auth.models import (
    AbstractBaseUser, PermissionsMixin, BaseUserManager
)

# Create your models here.


class Developers(models.Model):
    name = models.CharField(db_column='Name', max_length=30, unique=True)  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'developers'


class Publishers(models.Model):
    name = models.CharField(db_column='Name', max_length=30, unique=True)  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'publishers'


class Genre(models.Model):
    name = models.CharField(max_length=20, unique=True)

    class Meta:
        managed = True
        db_table = 'genre'
        ordering = ['name']


class Users(AbstractUser):
    login = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=100)
    email = models.EmailField(max_length=150, unique=True)
    join_date = models.DateTimeField(auto_now_add=True)
    is_manager = models.BooleanField(default=False)
    USERNAME_FIELD = 'login'
    REQUIRED_FIELDS = ['password', 'email']

    def __str__(self):
        return self.login

    @property
    def is_authenticated(self):
        return True

    class Meta:
        managed = True
        db_table = 'users'


class Comic(models.Model):
    # id = models.IntegerField(db_column='ID', primary_key = True)  # Field name made lowercase.
    name = models.CharField(max_length=50, unique=True)
    genre = models.CharField(max_length=50, blank=True, null=True)
    releasedate = models.DateField(db_column='releaseDate', blank=True, null=True)  # Field name made lowercase.
    developer = models.CharField(max_length=50, blank=True, null=True)
    publisher = models.CharField(max_length=50, blank=True, null=True)
    price = models.FloatField(blank=True, null=True)
    managed_by = models.BigIntegerField(default=6)
    is_deleted = models.BooleanField(default=False)


    class Meta:
        managed = True
        db_table = 'comic'


class Cart(models.Model):
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    comic_id = models.ForeignKey(Comic, on_delete=models.CASCADE)
    add_date = models.DateField(default=datetime.date.today, null=True)
    

    class Meta:
        managed = True
        db_table = 'cart'


class Library(models.Model):
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    comic_id = models.ForeignKey(Comic, on_delete=models.CASCADE)
    payment_date = models.DateField(default=datetime.date.today)
    is_activated = models.BooleanField(default=False)
    activation_date = models.DateField(default=datetime.date.today, null=True)

    class Meta:
        managed = True
        db_table = 'library'
