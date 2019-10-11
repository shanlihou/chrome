from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from manhua.Download import Download

# Create your views here.


@csrf_exempt
def hello(request):
    args = str(request.read())[2:-1].split('&')
    print(args)
    argDict = {}
    for i in args:
        k, v = i.split('=')
        argDict[k] = v

    ret = Download().addTask(argDict['hua'], argDict['page'], argDict['jpgUrl'])
    if ret:
        return HttpResponse("success")
    else:
        return HttpResponse("failed")