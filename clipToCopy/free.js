

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
function tapd() {
    let tbss = document.querySelector('#tbss');
    let tbody = tbss.querySelector('tbody');
    if (!tbody)
        return;

    let trs = tbody.querySelectorAll('tr');
    let jsonObj = [];
    console.log(trs);
    for (let tr of trs) {
        let tds = tr.querySelectorAll('td');
        let ip = tds[1].innerHTML;
        let port = tds[2].innerHTML;
        let pwd = tds[4].innerHTML;
        let method = tds[3].innerHTML;
        let remark = ip + '-' + tds[6].innerHTML;
        console.log(tds, ip);
        jsonObj.push({
            server: ip,
            server_port: parseInt(port),
            password: pwd,
            method: method,
            remarks: remark,
            timeout: 5
        });
    }
    let jsonStr = JSON.stringify(jsonObj);
    console.log(jsonStr);
    this.isReply = true;
}

function timerFunc(){
    var that = this;
    var tmpFunc = function(){
        if (!that.isReply)
            that.tapd();
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

Insert.prototype.tapd = tapd;

var insert = new Insert();
insert.setTimer();