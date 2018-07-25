console.log('hello');
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
                sendResponse(xhr.responseText);
                console.log('end');
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
    //sendResponse('我是后台，我已收到你的消息：' + JSON.stringify(request));
});

function testDjango()
{
    var url = 'path=1234';
    var xhrUrl = "http://127.0.0.1:8000/download/";
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if (xhr.readyState==4)
        {// 4 = "loaded"
            if (xhr.status==200)
            {// 200 = "OK"
                console.log(xhr.responseText); 
                sendResponse(xhr.responseText);
            }
            else
            {
                console.log('failed');
            }
        }
    }; // Implemented elsewhere.
    xhr.open("POST", xhrUrl, true);
    xhr.send(url);
    
};