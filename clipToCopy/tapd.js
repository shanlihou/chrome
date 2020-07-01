function Insert(){
    this.buttonAdd = false;
    this.inputAdd = false;
    this.urlAdd = false;
    this.isReply = false;
}

function getElementByAttr(tag, attr, value){
    var elements = document.getElementsByTagName(tag);
    for (var i = 0; i < elements.length; i++){
        if (elements[i].getAttribute(attr) == value)
        {
            return elements[i];
        }
    }
    return null;
}
function getElementByAttrAll(tag, attr, value){
    var elements = document.getElementsByTagName(tag);
    var retArray = new Array();
    for (var i = 0; i < elements.length; i++){
        if (elements[i].getAttribute(attr) == value)
        {
            elements[i];
            retArray.push(elements[i]);
        }
    }
    return retArray;
}
function appendButton(name, url){
    var button = document.createElement("a");
    button.style.height = "50px";
    button.style.width = "500px";
    var node=document.createTextNode(name);
    button.appendChild(node);
    var that = this;
    button.onclick = function(){
        console.log(url);
        that.input.value = url;          
        var range = document.createRange();
        range.selectNode(that.input);
        window.getSelection().addRange(range);
        that.input.select();
        document.execCommand('copy');
        console.log(that.input);
    }
    return button;
}

function tapd() {
    let body = document.querySelector('tbody');
    if (body == null) 
        return;
    
    let isFunction = localStorage.getItem('function');
    let isFilter = localStorage.getItem('filter');
    let isCur = localStorage.getItem('curgen');
    console.log("is:", isFunction, isFilter, isCur);

    let children = body.querySelectorAll('tr');
    for (child of children) {
        let aList = child.querySelectorAll('a');
        let state = '';
        if (isFilter == "true"){
            console.log('im in filter', isFilter);
            let isRemove = false;
            for (a of aList) {
                if (a.getAttribute('id'))
                {
                    if (a.innerHTML == "已解决" || a.innerHTML == "已实现" || a.innerHTML == "验证中" || a.innerHTML == "测试中" || a.innerHTML == "待测试" || a.innerHTML == "待验收") {
                        body.removeChild(child);
                        isRemove = true;
                        break;
                    }
                }
            }
            if (isRemove) {
                continue;
            }
        }

        let gt = child.querySelector("div.growing-title");
        let b = gt.querySelector('a');
        if (b.innerHTML.indexOf("功能点") > 0) {
            if (isFunction == "true")
                body.removeChild(child);
        }
    }
}

function timerFunc(){
    var that = this;
    var tmpFunc = function(){
        that.tapd();
    }
    return tmpFunc;
}
function setTimer(){
    this.timer = setInterval(this.timerFunc(), 1000 * 1);
}
Insert.prototype.getElementByAttr = getElementByAttr;
Insert.prototype.getElementByAttrAll = getElementByAttrAll;
Insert.prototype.setTimer = setTimer;
Insert.prototype.appendButton = appendButton;
Insert.prototype.timerFunc = timerFunc;

Insert.prototype.tapd = tapd;

var insert = new Insert();
insert.setTimer();

function rpc_setFilter(filterName, value, ret) {
    localStorage.setItem(filterName, value);
    ret();
}

function rpc_getLocStorage(name, ret) {
    console.log("rpc_getLocStorage:", name, ret);
    let value = localStorage.getItem(name);
    ret(name, value);
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log('requests is:', request, sendResponse);
        let callfunc = eval('rpc_' + request.func);
        let args = request.arg;
        args.push(function(){
            let _args = [].slice.call(arguments);
            sendResponse({
                rpcId: request.rpcId,
                args: _args
            });
        });
        callfunc.apply(null, args);
});