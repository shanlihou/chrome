function Insert(){
    this.first = false;
}
function getElementByAttr(tag, attr, value){
    var elements = document.getElementsByTagName(tag);
    for (var i = 0; i < elements.length; i++){
        if (elements[i].getAttribute(attr) == value)
        {
            return elements[i];
        }
    }
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
function getPerform(){
    var performList = document.getElementById("performList").childNodes[3].childNodes[1].childNodes;
    performList[0].childNodes[0].click();
    var priceList = document.getElementById("priceList").childNodes[3].childNodes[1].childNodes;
    priceList[0].childNodes[0].click();
    var xuanzuo = document.getElementById("btnXuanzuo3");
    xuanzuo.click();
}
function getYongle(){
    console.log(document.getElementById("Jdate").childNodes[1])
    console.log(document.getElementById("Jprice").childNodes)
}

function timerFunc(){
    var that = this;
    var tmpFunc = function(){
        if (!that.first)
        {
            that.getYongle();
            that.first = true;
        }
        //console.log(xuanzuo);
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
Insert.prototype.getPerform = getPerform;
Insert.prototype.getYongle = getYongle;

var insert = new Insert();
insert.setTimer();