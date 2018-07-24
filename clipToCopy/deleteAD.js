function Insert(){
    this.buttonAdd = false;
    this.inputAdd = false;
    this.urlAdd = false;
    this.isDeleted = false;
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

function findAD(){
    var formn = document.getElementById('nv_forum');
    console.log(formn.childNodes[6]);
    if (!this.isDeleted)
    {
        formn.removeChild(formn.childNodes[6]);
        this.isDeleted = true;
        var wp = document.getElementById('wp');
        //formn.removeChild(wp);
        var diynavtop = document.getElementById('diynavtop');
        wp.removeChild(diynavtop);
    }
    
    
}

function timerFunc(){
    var that = this;
    var tmpFunc = function(){
        that.findAD();
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
Insert.prototype.findAD = findAD;


var insert = new Insert();
insert.setTimer();