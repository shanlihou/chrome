import os
import time
import urllib.request


def singleton(cls, *args, **kw):
    instances = {}

    def _singleton():
        if cls not in instances:
            instances[cls] = cls(*args, **kw)
        return instances[cls]
    return _singleton


@singleton
class Download(object):
    def __init__(self):
        print(id(self))
        self.manhua = {}
        self.root = r'E:\shmanhua\hero'

    def addTask(self, hua, page, path):
        self.manhua.setdefault(hua, {})
        curHua = self.manhua[hua]
        if page in curHua:
            lastTime = curHua[page]
            now = time.time()
            if now - lastTime < 5:
                return False
            else:
                if self.checkFileExists(hua, page):
                    return True

        now = time.time()
        curHua[page] = now
        self.checkDir(hua)
        fullPath = self.getFullName(hua, page)
        print('will download:', path, fullPath)
        try:
            urllib.request.urlretrieve(path, fullPath)
        except Exception as e:
            print(e)
            return False
        return self.checkFileExists(hua, page)

    def checkFileExists(self, hua, page):
        fullPath = self.getFullName(hua, page)
        return os.path.exists(fullPath)

    def getFullName(self, hua, page):
        huaPath = os.path.join(self.root, hua)
        fullPath = os.path.join(huaPath, page)
        fullPath += '.jpg'
        return fullPath

    def checkDir(self, hua):
        huaPath = os.path.join(self.root, hua)
        if not os.path.exists(huaPath):
            os.mkdir(huaPath)
