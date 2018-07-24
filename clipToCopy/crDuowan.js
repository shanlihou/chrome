function Insert(){
    this.buttonAdd = false;
    this.inputAdd = false;
    this.urlAdd = false;
    this.isReply = false;
	this.isOrder = false;
	this.isTicket = false;
	this.isStart = true;
	this.isAddChoice = false;
	this.isModifyLevel = false;
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
	if (father.childNodes != null) {
		for (var i = 0; i < father.childNodes.length; i++) {
			if (father.childNodes[i].nodeName == tag) {
				father.childNodes[i].attributes[attr] == value;
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
function damaiOrder() {
	var cardList = this.getElementByAttrAll('li', 'class', 'card__item');
	if (cardList == null || cardList.length == 0) {
		return;
	}
	console.log('im here', this.isModifyLevel, cardList)
	if (!this.isModifyLevel) {
		for (var i = 0; i < cardList.length; i++) {
			var level = this.findChilds(cardList[i], 'P', 'class', 'card-level');
			var card = this.findChilds(cardList[i], 'EM', 'class', 'card-progress-text');
			console.log(level)
			if (level == null) {
				break;
			}
			var iLevel = parseInt(level.innerHTML.match(/\d+/)[0]);
			card = parseInt(card.innerHTML.match(/\d+/)[0])
			var maxLevel = this.calcMaxLevel(iLevel, card);
			level.innerHTML = level.innerHTML + maxLevel;

		}
		this.isModifyLevel = true;
	}
}

function timerFunc(){
    var that = this;
    var tmpFunc = function(){
        that.damaiOrder();
        /*
        if (!that.inputAdd)
        {
            var divs = that.getElementByAttrAll('div', 'class', 'input-group');
            var input = document.createElement('input');
            input.type = 'text';
            that.input = input;
            divs[0].appendChild(input);
            console.log(divs);
            that.inputAdd = true;
        }
        //aLink[0].childNodes[1].href = '';
        //aLink[0].childNodes[1].onclick = function(){console.log('123')};
        //console.log(aLink[0].childNodes[1].href);
        if (!that.urlAdd)
        {
            var btns = that.getUrl();
            if (btns.length)
            {
                that.urlAdd = true;
                var father = document.getElementById('magnet-table');
                for (var i = 0; i < btns.length; i++)
                {
                    father.appendChild(btns[i]); 
                }
            }
        }*/
        //console.log(father);
        //console.log("im here");
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

var insert = new Insert();
insert.setTimer();