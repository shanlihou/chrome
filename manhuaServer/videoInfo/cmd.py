from videoInfo.models import modeVideo
from videoInfo.videoParse import videoParse

class CMD(object):
    @classmethod
    def parse_cmd(cls, cmd, args):
        if hasattr(cls, cmd):
            return getattr(cls, cmd)(args)
        
        return 'failed'
        
    @staticmethod
    def getCode(args):
        code = videoParse().getOneCode()
        if code:
            return code
        
        return 'stop'
    
    @staticmethod
    def sendActor(args):
        if 'Actor' not in args:
            return 'failed'
        
        code, actor = args['Actor'].split('=')
        print(code, actor)
        videoParse().setActor(code, actor)
        return 'success'
    
    @staticmethod
    def test(args):
        videoParse().test()
        return 'success'
    
    @staticmethod
    def setPath(args):
        videoParse().setPath(r'E:\889914\video')
        return 'success'
    
    @staticmethod
    def printAll(args):
        videoParse().printAll()
        return 'success'
        
    @staticmethod
    def deleteAll(args):
        videoParse().deleteAll()
        return 'success'
        