var socketServerUrl = "";
var hostToLive = "http://localhost";
var socket = require('socket.io-client')(socketServerUrl);
const superagernt = require('superagent');


socket.on('connect',function(){
    console("connected");
})


socket.on('disconnect',function(){
    console("connection lost");
})

socket.on('page-request',function(data){
    var path = data.pathname;
    var method = data.methode;
    var params = data.params;

    var localhostUrl = hostToLive + path;
    
    if(method =="get")executeGet(localhostUrl,params);
    else if(method == "post")executePost(localhostUrl,params);
})
function executeGet(url,params){
    superagernt.get(url)
    .query(params)
    .end((err,Response) => {
        if(err){
            return console.log(err);
        }
        socket.emit('page-response',Response.text);
    })
}


function executePost(url,params){
    superagernt.post(url)
    .query(params)
    .end((err,Response) => {
        if(err){
            return console.log(err);
        }
        socket.emit('page-response',Response.text);
    })
}