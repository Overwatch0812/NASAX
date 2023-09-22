from django.db import models
from django.contrib.auth import get_user_model
from cloudinary_storage.storage import RawMediaCloudinaryStorage
 
User=get_user_model()

# Create your models here.
class project(models.Model):
    thumbnail=models.ImageField(upload_to='images/thumbnail',null=True,blank=True)
    title=models.CharField(max_length=250,null=False,blank=False)
    author=models.ForeignKey(User,on_delete=models.CASCADE)
    description=models.TextField()
    domain=models.CharField(max_length=250)
    languages_used=models.CharField(max_length=100)
    pdf=models.FileField(upload_to="files/pdfs",null=True,blank=True,storage=RawMediaCloudinaryStorage())
    txt=models.FileField(upload_to="files/txt",null=True,blank=True,storage=RawMediaCloudinaryStorage())
    codes=models.FileField(upload_to="files/codes",null=True,blank=True,storage=RawMediaCloudinaryStorage())

    def __str__(self):
        return self.title 