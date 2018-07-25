var bTest = document.getElementById("test");
bTest.onclick = function(){
    var url = 'path=1234';
    var xhrUrl = "http://127.0.0.1:8000/download/";
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if (xhr.readyState==4)
        {// 4 = "loaded"
            if (xhr.status==200)
            {// 200 = "OK"
                console.log(xhr.responseText); 
            }
            else
            {
                console.log('failed');
            }
        }
    }; // Implemented elsewhere.
    xhr.open("POST", xhrUrl, true);
    xhr.send(url);
}
var getPage = function(url)
{
    var urlList = url.split('/');
    console.log(urlList[urlList.length - 1]);
    page = urlList[urlList.length - 1];
    page = /\d+/.exec(page);
    if (page)
    {
        page = page[0];
    }
    else
        page = "0";
    hua = urlList[urlList.length - 2];
    return {"hua":hua, "page":page};
}
var notuse = function()
{
    getPage('http://manhua.fzdm.com/131/92/index_42.html');
    var ret = getPage('http://manhua.fzdm.com/131/93/');
    console.log(ret);
}