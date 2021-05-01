from django.db import models
from .constants import Status
from .validators import checkStrongPassword
import uuid
# Create your models here.

class User(models.Model):
    name=models.CharField(max_length=100)
    email=models.EmailField(unique=True)
    password=models.CharField(max_length=100)
    id = models.CharField(primary_key=True,default=uuid.uuid4,max_length=36)


class Task(models.Model):
    name=models.CharField(max_length=30)
    date=models.DateField()
    description=models.TextField()
    status=models.CharField(choices=[(status.name,status.value) for status in Status],max_length=20)
    created_at=models.DateTimeField(auto_now_add=True)
    user_id = models.ForeignKey('User',on_delete=models.CASCADE)
    id = models.CharField(primary_key=True,default=uuid.uuid4,max_length=36)