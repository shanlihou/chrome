console.log('hello');

function sendMessageToContentScript(message, callback)
{
    chrome.tabs.query({url: "*://www.buscdn.pw/*"}, function(tabs)
    {
        chrome.tabs.sendMessage(tabs[0].id, message, function(response)
        {
            if(callback) callback(response);
        });
    });
}
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
    console.log('收到来自content-script的消息：');
	var url = request.greeting;
    url = 'jpgUrl=' + url;
    var pageInfo = request.pageInfo;
	console.log(url);
    var data = url;
    data += '&hua=' + pageInfo.hua;
    data += '&page=' + pageInfo.page;
    console.log(data);
    
    var xhrUrl = "http://127.0.0.1:8000/download/";
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if (xhr.readyState==4)
        {// 4 = "loaded"
            if (xhr.status==200)
            {// 200 = "OK"
                console.log(xhr.responseText);
                sendResponse('我是后台，我已收到你的消息：' + JSON.stringify(request));
                console.log('end');
                
                sendMessageToContentScript({cmd:'test', value:xhr.responseText}, function(response)
                {
                    console.log('来自content的回复：'+response);
                });
            }
            else
            {
                console.log('failed');
            }
        }
    }; // Implemented elsewhere.
    xhr.open("POST", xhrUrl, true);
    xhr.send(data);
    
    console.log(request, sender, sendResponse);
    sendResponse('我是后台，我已收到你的消息：' + JSON.stringify(request));
});

function sendActor(actor){
    var data = 'cmd=sendActor&';
    data += 'Actor=' + actor;
    var xhrUrl = "http://127.0.0.1:8000/videoInfo/";
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if (xhr.readyState==4)
        {// 4 = "loaded"
            if (xhr.status==200)
            {// 200 = "OK"
            }
            else
            {
                console.log('failed');
            }
        }
    }; // Implemented elsewhere.
    xhr.open("POST", xhrUrl, true);
    xhr.send(data);    
}

function getCode()
{
    var xhrUrl = "http://127.0.0.1:8000/videoInfo/";
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if (xhr.readyState==4)
        {// 4 = "loaded"
            if (xhr.status==200)
            {// 200 = "OK"
                ret = xhr.responseText;
                if (ret == 'stop' || ret == 'failed')
                    return;
                
                console.log(xhr.responseText);
                sendMessageToContentScript({code:xhr.responseText}, function(resp){
                    console.log(resp);
                    if (resp)
                        sendActor(resp);
                });
            }
            else
            {
                console.log('failed');
            }
        }
    }; // Implemented elsewhere.
    xhr.open("POST", xhrUrl, true);
    xhr.send('cmd=getCode');
    
};

function Insert(){
}
function run(){
    this.getCode();
}
function timerFunc(){
    var that = this;
    var tmpFunc = function(){
        that.run();
    }
    return tmpFunc;
}
function setTimer(){
    this.timer = setInterval(this.timerFunc(), 1000 * 1);
}
Insert.prototype.setTimer = setTimer;
Insert.prototype.timerFunc = timerFunc;
Insert.prototype.run = run;
Insert.prototype.getCode = getCode;
var insert = new Insert();
insert.setTimer();