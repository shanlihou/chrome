// ==UserScript==
// @name        放牧的风 - 免费 SS/SSR/V2Ray 页面增加“复制全部链接” -修复SSR与V2ray按钮
// @description 提取放牧的风在页面上提供的免费账号并增加“复制全部链接”按钮。【修复V2ray不同客户端问题】
// @namespace   UnKnown
// @match        *://www.youneed.win/free-*
// @version     1.4
// @grant       none
// ==/UserScript==

var get_link = () => {

	const    parentNode =   document.querySelector('.context');
	const referenceNode = parentNode.querySelectorAll(':scope > div');
	const      table = referenceNode[1].querySelector(':scope > table:only-child');
    console.log("tm", parentNode, referenceNode, table);
	if (!table) return false;

    const arraySelector = (
        selector = ':scope > *',
        parent = table,
        ) => Array.from(
        parent.querySelectorAll( selector )
	);

	const type = location.pathname.slice(6);
	const getLinks = type => ({

        //获取ss链接
		ss: () => arraySelector(':scope > tbody > tr').map(
				tr => {
					const d = arraySelector(':scope > td', tr).map(
						td => td.textContent
					);
                    //base64编码
					return 'ss://' + base64(`${d[4]}:${d[3]}@${d[1]}:${d[2]}`);
				}
			).join("\n"),

        //获取ssr链接
		//ssr: () => Array.from(table.querySelectorAll('a[data^="ssr"]')).map( a => a.getAttribute("data") ).join("\n"),
        ssr: () => arraySelector('a[data^="ssr"]').map(a => a.getAttribute("data")).join("\n"),

		//获取v2ray链接
        v2ray: () => arraySelector(':scope > tbody > tr').map(
			tr => {
				const data = arraySelector(':scope > td', tr).map(
					td => td.textContent
				);
                //base64编码
                //windows端最新V2RayN（V3.19）客户端使用这行
				return 'vmess://' + base64(`{"ps":"[youneed.win]${data[1]}","add":"${data[1]}","port":"${data[2]}","id":"${data[3]}","aid":"0","net":"${data[4]}","type":"none","host":"${data[5]}","tls":"${data[6]}"}`);
                //macOS端最新V2RayU（V2.2.0）客户端使用这行
				//return 'vmess://' + base64(`{"ps":"[youneed.win]${data[1]}","add":"${data[1]}","port":"${data[2]}","id":"${data[3]}","aid":"0","net":"${data[4]}","type":"none","path":"${data[5]}","tls":"${data[6]}"}`);
			}
		).join("\n"),

	})[type];

	
    let base64;
    if (type == "ss" || type == "v2ray") {
        //选择编码算法
        if (!window.CryptoJS) {
            // From https://en.wikibooks.org/wiki/Algorithm_Implementation/Miscellaneous/Base64#Javascript
            base64 = s => {
                var d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
                    r = "", p = "", c = s.length % 3;
                if (c > 0) {
                    for (; c < 3; c++) {
                        p += '=';
                        s += "\0";
                    }
                }
                for (c = 0; c < s.length; c += 3) {
                    var n = (s.charCodeAt(c) << 16) + (s.charCodeAt(c + 1) << 8) + s.charCodeAt(c + 2);
                    n = [(n >>> 18) & 63, (n >>> 12) & 63, (n >>> 6) & 63, n & 63];
                    r += d[n[0]] + d[n[1]] + d[n[2]] + d[n[3]];
                }
                return r.substring(0, r.length - p.length) + p;
            }
       } else {
            base64 = str => CryptoJS.enc.Base64.stringify(
                CryptoJS.enc.Utf8.parse(str)
            );
       }
	} 

	// 获取所有链接
	const resultStr = getLinks(type)();

	// 添加一个容器
	const pre = document.createElement("pre");
	pre.style = "max-height: 12em; overflow-y: auto; margin-bottom: 10px;";
	pre.textContent = resultStr;

	// 添加复制按钮
	const button = document.createElement("button");
	button.style = "width: 100%; font-size: large;";
	button.textContent = "复制全部链接";
	button.addEventListener("click", () => {
		try {
			if (navigator.clipboard) {
				navigator.clipboard.writeText(resultStr);
			} else {
				const eventCopyer = event => {
					event.preventDefault();
					event.clipboardData.setData("text/plain", resultStr);
				}
				document.addEventListener("copy", eventCopyer);
				document.execCommand("copy");
				document.removeEventListener("copy", eventCopyer);
			}
		} catch (error) {
			button.parentNode.insertBefore((str => {
				const info = document.createElement("pre");
				info.textContent ="若复制失败，请手动选择复制，" +
					"PC 端用户可按 F12 获取详细错误信息，以便反馈。"
				+ "\n捕捉到的错误信息：" + str;
			})(error), button.nextSibling);
		}
	});

	const newNode = document.createElement("div");
	newNode.id = "AllLinks";

	newNode.appendChild(pre);
	newNode.appendChild(button);

	parentNode.insertBefore(newNode, referenceNode[1]);

};

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
    let v2ray = getElementByAttr('td', 'class', 'v2ray');
    console.log('v2ray', v2ray);
    if (v2ray != null)
    {
        get_link();
        this.isReply = true;
    }
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
