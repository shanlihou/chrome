console.log('hello');
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
    console.log('收到来自content-script的消息：');
	var url = request.greeting;
	console.log(url);
	console.log(chrome.downloads);
	chrome.downloads.download({
            url: url,
            conflictAction: 'uniquify',
            saveAs: false
        });
    console.log(request, sender, sendResponse);
    sendResponse('我是后台，我已收到你的消息：' + JSON.stringify(request));
});