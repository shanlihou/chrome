#coding=utf8
from videoInfo.ListPath import ListPath
from videoInfo.DBHelper import DBHelper
import os
import re
import shutil
import code

def singleton(cls, *args, **kw):
    instances = {}
    def _singleton():
        if cls not in instances:
            instances[cls] = cls(*args, **kw)
        return instances[cls]
    return _singleton

@singleton
class videoParse(object):
    def __init__(self):
        self.pat = re.compile(r'\w+-\w+')
        self.curCode = None
        self.fileList = None
        self.zhPat = re.compile(u'[\u4e00-\u9fa5]+')
        self.sortPath = r'E:\889914\sort'
        self.ignoreList = ['carib', '1080', 'dioguitar', 'net', 'hjd', 'com', 'MBD', 'hd']
        
    def isContainZh(self, data):
        find = self.zhPat.search(data)
        return find
        
    def setPath(self, path):
        self.path = path
        self.getAllList()
        
    def isCodeStyle(self, data):
        aCode, nCode = data.split('-')
        if not nCode.isdigit():
            return False
        
        if aCode.isdigit():
            return False
        
        if len(aCode) < 2:
            return False
        
        return True
        
    def getOneCode(self):
        if self.curCode:
            video = DBHelper().getVideoInfo(self.curCode)
            if video:
                if video.actor == 'ready':
                    return self.curCode
            else:
                return self.curCode
            
        while 1:
            if not self.fileList:
                return None
            
            self.curPath = self.fileList.pop(0)
            self.curCode = self._getCode2(self.curPath).lower()
            if not self.curCode:
                continue
            
            return self.curCode
        
    def setActor(self, code, actor):
        if code.lower() != self.curCode:
            return
        
        DBHelper().addVideoInfo(code, self.curPath, actor, 1)
        
    def printAll(self):
        DBHelper().printAll()
    
    def deleteAll(self):
        DBHelper().deleteAll()
    
    def _getCode(self, fileName):
        print('-' * 60)
        bn = os.path.basename(fileName)
        if self.isContainZh(bn):
            return None
        
        find = self.pat.search(bn)
        if find:
            return find.group()
        else:
            return None
    
    def isIgnore(self, data):
        for ignoreStr in self.ignoreList:
            if ignoreStr in data:
                return True
            
        return False
        
    def _getCode2(self, fileName):
        print('-' * 60)
        singlePat = re.compile(r'([a-zA-Z]+|\d+)')
        bn = os.path.basename(fileName)
        if self.isContainZh(bn):
            return None
        bn = '.'.join(bn.split('.')[:-1])
        find = singlePat.findall(bn)
        if find:
            codeList = []
            for i in range(len(find) - 1):
                code = find[i] + '-' + find[i + 1]
                if self.isIgnore(code):
                    continue
                
                if not self.isCodeStyle(code):
                    continue
                    
                codeList.append(code)
            print(codeList)
            return codeList[0] if codeList else None
        else:
            return None
        
        
    def getAllList(self):
        lp = ListPath(self.path)
        self.fileList = lp.getAllFile()
        '''
        for i in self.fileList:
            print(self._getCode2(i))
            print(i)'''
        
    def getDestPath(self, actor):
        #dstPath = os.path.join(self.sortPath, actor)
        actor = self.trans(actor)
        dstPath = self.sortPath + '\\' + actor
        print(self.sortPath, actor, dstPath)
        if not os.path.exists(dstPath):
            os.mkdir(dstPath)
            # os.mkdir(dstPath)
        return dstPath
    
    def trans(self, data):
        bs = eval("b'" + data + "'")
        return bs.decode('utf-8')
        
    def cpAll(self):
        all = DBHelper().getAll()
        for i in all:
            if i.actor == 'no' or i.actor == 'null':
                continue
            
            dstPath = self.getDestPath(i.actor)
            shutil.move(i.filePath, dstPath)
            #DBHelper().addVideoInfo(i.code, dstPath, i.actor)
            
    def transAll(self):
        all = DBHelper().getAll()
        for i in all:
            if i.actor == 'no':
                continue
            
            print(i.actor)
            bs = eval("b'" + i.actor + "'")
            print(type(bs))
            print(bs.decode('utf-8'))
    
    def test(self):
        self.cpAll()
    
if __name__ == '__main__':
    video = videoParse(r'E:\889914\video')
    video.test()