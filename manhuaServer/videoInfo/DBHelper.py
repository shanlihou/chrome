from videoInfo.models import modeVideo
class DBHelper(object):
    @staticmethod
    def checkHas(code):
        try:
            test = modeVideo.objects.get(code=code)
            if (test):
                return True
        except modeVideo.DoesNotExist:
            return False
        return False
    
    @classmethod
    def addVideoInfo(cls, code, path, actor, state=0):
        if cls.checkHas(code):
            cls.deleteVideoInfo(code)
            
        test = modeVideo(code=code, filePath=path, actor=actor, state=state)
        test.save()
        
    @staticmethod
    def deleteVideoInfo(code):
        try:
            test = modeVideo.objects.get(code=code)
            if (test):
                test.delete()
                return True
        except modeVideo.DoesNotExist:
            return False
    
    @staticmethod
    def getVideoInfo(code):
        try:
            test = modeVideo.objects.get(code=code)
            if (test):
                return test
        except modeVideo.DoesNotExist:
            return None
        return None
    
    @staticmethod
    def deleteAll():
        modeVideo.objects.all().delete()
        
    @staticmethod
    def getAll():
        return modeVideo.objects.all()
    
    @staticmethod
    def printAll():
        all = modeVideo.objects.all()
        for i in all:
            print(i.code, i.filePath, i.actor, i.state)
        
'''  
    
    @staticmethod
    def getPpNum(date):
        userList = Test.objects.filter(date=date)
        return len(userList)
'''