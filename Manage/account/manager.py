from django.contrib.auth.base_user import BaseUserManager

class CustomUserManager(BaseUserManager):
    use_in_migrations=True

    def create_user(self,email,password=None,**extra_Fields):
        if not email:
            raise ValueError('Email is required')
        email=self.normalize_email(email)
        user=self.model(email=email,**extra_Fields)
        user.set_password(password)
        user.save(using=self._db)
        return user


    def create_superuser(self,email,password,**extra_Fields):
        extra_Fields.setdefault('is_staff',True)    
        extra_Fields.setdefault('is_superuser',True)    
        extra_Fields.setdefault('is_active',True)

        if extra_Fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff true')
        return self.create_user(email,password,**extra_Fields)    