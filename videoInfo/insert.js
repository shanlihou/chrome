function Insert(){
    this.isAddListener = false;
    this.isFirst = false;
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
function findChilds(father, tag, attr, value){
    if (!father)
        return null;
    
	if (father.childNodes != null) {
		for (var i = 0; i < father.childNodes.length; i++) {
			if (father.childNodes[i].nodeName == tag) {
				if (father.childNodes[i].attributes[attr].value == value)
                    return father.childNodes[i];
			} else {
				var result = findChilds(father.childNodes[i], tag, attr, value);
				if (result != null) {
					return result;
				}
			}
		}
	}
	return null;
}
function getTitle(){
    var elements = document.getElementsByTagName("title");
    for (var i = 0; i < elements.length; i++)
    {
        return elements[i].innerHTML;
    }
}
function login(username, pwd){
    document.getElementById("login_user").value = username;
    document.getElementById("login_psw").value = pwd;
    var btLogin = this.getElementByAttr('a', 't', 'w_Login');
    btLogin.click();
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
function addButton(){
    var div = this.getElementByAttr('div', 'class', 'ui-button-box login-btnbox');
    if (!this.buttonAdd)
    {
        this.buttonAdd = true;
        div.appendChild(this.appendButton("admin123"));
        div.appendChild(this.appendButton("Admin12("));
        div.appendChild(this.appendButton("admin"));
    }
}
function inputPwd(){
    var pwd1 = this.getElementByAttrAll('input', 'class', 'fn-mart2 u-input');
    pwd1[0].value = "admin123";
    pwd1[1].value = "admin123";
}
function getUrl(){
    var aLink = this.getElementByAttrAll('td', 'width', '70%');
    var retArray = new Array();
    for (var i = 0; i < aLink.length; i++)
    {
        var url = aLink[i].childNodes[1].href;
        var size = aLink[i].nextElementSibling.childNodes[1].innerHTML;
        retArray.push(this.appendButton(size, url));
        aLink[i].appendChild(this.appendButton('download', retArray[i]));
    }
    var tdSize = this.getElementByAttrAll('td', 'style', 'text-align:center;white-space:nowrap')
    console.log(aLink[0].nextElementSibling.childNodes[1].innerHTML);
    return retArray;
}
function getLocked() {
    var locked = this.getElementByAttr('div', 'class', 'locked');
    if (locked && (!this.isReply))
    {
        console.log(locked)
        this.isReply = true;
        var postMsg = document.getElementById('fastpostmessage');
        postMsg.value = '破隐一击';
        document.getElementById('fastpostsubmit').click();
    }
}
function getChoice() {
	var input = document.createElement("input");
	input.type = 'text';
	var that = this;
	input.addEventListener('keyup',function(ev){
				var ev=ev || window.event;
				if(ev.keyCode==13){
					var rangeList = input.value.split('-');
					var min = parseInt(rangeList[0]);
					var max = parseInt(rangeList[1]);
					window.localStorage.setItem('min', min);
					window.localStorage.setItem('max', max);
					that.isStart = true;
				}
				ev.preventDefault();
			},true);
	return input;
}
function calcMaxLevel(level, card) {
	var needCardList = [0, 0, 2, 4, 10, 20, 50, 100, 200, 400, 800, 1000, 2000, 5000, 99999999];
	while(card > 0) {
		if (card >= needCardList[level + 1]) {
			card -= needCardList[level + 1];
			level++;
		} else {
			break;
		}
	}
	return level;
}

var getPage = function(url)
{
    var urlList = url.split('/');
    //console.log(urlList[urlList.length - 1]);
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

function getCurCode(){
    var codeSp = this.getElementByAttr('span', 'style', 'color:#CC0000;');
    if (codeSp)
        return codeSp.innerHTML.toLowerCase();
    else
        return null;
    /*
    var codeDiv = document.getElementById('video_id');
    var codeTd = this.findChilds(codeDiv, 'TD', 'class', 'text');
    if (codeTd)
        return codeTd.innerHTML.toLowerCase();
    else
        return null;*/
}

function getUrlCode(){
    var curUrl = window.location.href;
    var index = curUrl.indexOf('search/');
    if (index == -1)
        return null;
    
    index += 7
    var end = curUrl.indexOf('&', index);
    var code = curUrl.substring(index, end);
    return code;
}

function getActor(){
    var actorSp = this.getElementByAttr('span', 'class', 'starfav');
    if (!actorSp)
        return null;
    
    var aa = actorSp.parentNode.childNodes[1].childNodes[1].innerHTML;
    return aa;
    /*
    var actor = document.getElementById('video_cast');
    var aa = this.findChilds(actor, 'A', 'rel', 'tag');
    if (aa)
        return aa.innerHTML;
    return null;*/
}

function getMovie(){
    var movie = this.getElementByAttr('a', 'class', 'movie-box');
    return movie;
}

function enterCode(code){
    var codeInput = document.getElementById('search-input');
    codeInput.value = code;
    //var bnSearch = document.getElementById('idsearchbutton');
    var bnSearch = this.getElementByAttr('button', 'type', 'submit');
    bnSearch.click();
}

function isFailed(){
    var elements = document.getElementsByTagName('h4');
    for (var i = 0; i < elements.length; i++){
        if (elements[i].innerText == '沒有您要的結果！')
        {
            console.log(elements[i].innerText);
            return true;
        }
    }
    return false;
}

var addListener = function()
{
    if (this.isAddListener)
        return;
    
    this.isAddListener = true;
    var that = this;
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
    {
        // console.log(sender.tab ?"from a content script:" + sender.tab.url :"from the extension");
        console.log(that.isFirst);
        if (that.isFirst)
            return
        
        that.isFirst = true;
        code = request.code.toLowerCase();
        var cur = that.getCurCode();
        console.log(cur, code);
        if (cur == code)
        {
            var actor = that.getActor();
            sendResponse(code + '=' + actor);
            that.isFirst = false;
            return;
        }
        
        var urlCode = that.getUrlCode();
        console.log(urlCode);
        if (urlCode == code)
        {
            var movie = that.getMovie();
            if (movie)
            {
                movie.click();
            }
            else
            {
                if (that.isFailed())
                {
                    sendResponse(code + '=' + 'no');
                    that.isFirst = false;
                }
            }
            return;
        }
        
        that.enterCode(code);
        /*
        if(request.cmd == 'test')
            console.log(request.value);
        sendResponse('我收到了你的消息！');
        if (request.value == 'success')
        {
            var navi = that.getElementByAttr('div', 'class', 'navigation');
            var lastNode = navi.childNodes[navi.childNodes.length - 1];
            lastNode.click();
        }
        else if (request.value == 'failed')
        {
            that.isDownload = false;
        }*/
    });    
}

function damaiOrder() {
    this.addListener();
}

function timerFunc(){
    var that = this;
    var tmpFunc = function(){
		that.damaiOrder();
    }
    return tmpFunc;
}
function setTimer(){
    this.timer = setInterval(this.timerFunc(), 1000 * 1);
}
Insert.prototype.getElementByAttr = getElementByAttr;
Insert.prototype.getElementByAttrAll = getElementByAttrAll;
Insert.prototype.setTimer = setTimer;
Insert.prototype.getTitle = getTitle;
Insert.prototype.addButton = addButton;
Insert.prototype.login = login;
Insert.prototype.appendButton = appendButton;
Insert.prototype.inputPwd = inputPwd;
Insert.prototype.timerFunc = timerFunc;
Insert.prototype.getUrl = getUrl;
Insert.prototype.getLocked = getLocked;
Insert.prototype.getChoice = getChoice;
Insert.prototype.findChilds = findChilds;
Insert.prototype.damaiOrder = damaiOrder;
Insert.prototype.calcMaxLevel = calcMaxLevel;
Insert.prototype.getPage = getPage;
Insert.prototype.addListener = addListener;
Insert.prototype.getCurCode = getCurCode;
Insert.prototype.getActor = getActor;
Insert.prototype.enterCode = enterCode;
Insert.prototype.getUrlCode = getUrlCode;
Insert.prototype.getMovie = getMovie;
Insert.prototype.isFailed = isFailed;
var insert = new Insert();
insert.setTimer();
