from django.shortcuts import render
from account.models import CustomUser

# Create your views here.


def Home(request):
    user_id = CustomUser.objects.order_by('id').values('id')
    user_domain = CustomUser.objects.order_by('id').values('domain')
    context = {"id": user_id, "domain": user_domain}
    return render(request, 'index.html', context)
