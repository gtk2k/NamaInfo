var msgAddr, port, threadId;
function checkNicoliveJSConf() {
    setTimeout(function () {
        var scripts = document.getElementsByTagName('script');
        for (var i = scripts.length; i--;) {
            if (/Nicolive_JS_Conf.Watch = {/.test(scripts[i].textContent)) {
                var scriptCode = decodeURIComponent(scripts[i].textContent);
                msgAddr = /<addr>([^<]*)<\/addr>/.exec(scriptCode)[1];
                port = /<port>([^<]*)<\/port>/.exec(scriptCode)[1];
                threadId = /<thread>([^<]*)<\/thread>/.exec(scriptCode)[1];
                wsStart();
                return;
            }
        }
        checkNicoliveJSConf();
    }, 0);
}
checkNicoliveJSConf();

var ws;
function wsStart() {
    ws = new WebSocket('ws://127.0.0.1:8080');
    ws.onopen = wsOnOpen;
    ws.onmessage = wsOnMessage;
    ws.onclose = wsOnClose;
}

function wsOnOpen() {
    ws.send(JSON.stringify({ client:'NamaInfo', msgAddr: msgAddr, port: port, threadId: threadId }));
}

function wsOnMessage() {
    if (e.data == 'getNamaInfo') {
        ws.send(JSON.stringify({ client: 'NamaInfo', msgAddr: msgAddr, port: port, threadId: threadId }));
    }
}

function wsOnClose() {
    setTimeout(function () {
        wsStart();
    }, 1000);
}
