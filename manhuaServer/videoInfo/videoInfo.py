from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from videoInfo.cmd import CMD


@csrf_exempt
def videoInfo(request):
    reads = request.read()
    print(reads)
    args = str(reads)[2:-1].split('&')
    print(args)
    if not all(args):
        return HttpResponse('failed')
    
    argDict = {}
    
    print(args)
    for i in args:
        k, v = i.split('=', 1)
        argDict[k] = v
    
    if 'cmd' not in argDict:
        return HttpResponse('failed')
    
    cmd = argDict['cmd']
    print(cmd)
    ret = CMD.parse_cmd(cmd, argDict)
    print(ret)
    return HttpResponse(ret)