let bTest = document.getElementById("test");
let g_cb = {};

function getRpcId(func) {
    for (let i = 0; i < 10000; i++) {
        if (!(i in g_cb)) {
            g_cb[i] = func;
            return i;
        }
    }
    return null;
}

function popRpcId(rpcId) {
    let func = g_cb[rpcId];
    delete g_cb[rpcId];
    return func;
}

function rpc_call() {
    let eventObj = {};
    eventObj['func'] = arguments[0];
    args = [].slice.call(arguments);
    eventObj['arg'] = args.slice(1, -1);
    respfunc = args[args.length - 1];
    
    let rpcId = getRpcId(respfunc);
    eventObj['rpcId'] = rpcId;
    console.log("arg:", arguments, eventObj);
    
    chrome.tabs.query(
        {active: true, currentWindow: true},
        function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, eventObj, function(retObj){
                let func = popRpcId(retObj.rpcId);
                func.apply(null, retObj.args);
            });
        }
    );
}

function getElementByAttrAll(tag, attr, value){
    var elements = document.getElementsByTagName(tag);
    var retArray = new Array();
    for (var i = 0; i < elements.length; i++){
        console.log(i, elements[i].getAttribute(attr), value);
        if (elements[i].getAttribute(attr) == value)
        {
            elements[i];
            retArray.push(elements[i]);
        }
    }
    return retArray;
}

let checkBoxes = getElementByAttrAll('input', 'type', 'checkbox');
checkBoxes.map(function (cb) {
    (function (locCb) {
        cb.onclick = function() {
            console.log(locCb.id, locCb.checked);
            rpc_call('setFilter', locCb.id, locCb.checked, (ret)=> {
                
            });
        }
        console.log('before get:', locCb.id);
        rpc_call('getLocStorage', locCb.id, function(name, value){
            console.log('get loc:', locCb.id, name, value);
            locCb.checked = value == 'true' ? true: false;
        });
    })(cb);
    
});

bTest.onclick = function(){
    rpc_call('test', 1, 3, 4, (ret)=> {
        console.log("im in resp", ret, arguments);
    });
}