from django.db import models
from django.contrib.auth import get_user_model
from cloudinary_storage.storage import RawMediaCloudinaryStorage
from django.contrib.postgres.fields import ArrayField
import json
User = get_user_model()

# Create your models here.


class project(models.Model):
    title = models.CharField(max_length=250, null=False, blank=False)
    email = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=True)
    description = models.TextField()
    type_of_collaborator=models.CharField(max_length=250, null=True, blank=True)
    level_of_expertise_of_collaborator=models.CharField(max_length=250, null=True, blank=True)
    domain = models.CharField(max_length=250, null=True, blank=True)
    tech_stack = ArrayField(models.JSONField(encoder=None), null=True, blank=True)
    github_link = models.CharField(max_length=250, null=True, blank=True)
    tasks = ArrayField(models.JSONField(encoder=None), null=True, blank=True)
    

    def __str__(self):
        return self.title
