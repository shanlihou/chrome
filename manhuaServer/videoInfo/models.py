from django.db import models

# Create your models here.

class modeVideo(models.Model):
    filePath = models.CharField(max_length=200)
    code = models.CharField(max_length=200)
    actor = models.CharField(max_length=200)
    state = models.IntegerField(default=0)