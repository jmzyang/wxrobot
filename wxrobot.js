const express = require('express')
const http = require('http')
const xml2js = require('xml2js');
var parser = new xml2js.Parser({explicitArray:false})
var builder = new xml2js.Builder({rootName: "xml", cdata: true, headless: true})
const app = express();
app.get('/',(req,res)=>{
    res.send(req.query.echostr)    
})
app.post('/',(req,res)=>{
    //1. 获取post请求中的内容
    var bufferList = [];
    req.on('data',chunk=>{
        bufferList.push(chunk) //不断接受二进制流
    })
    req.on('end',()=>{
    var result = Buffer.concat(bufferList); //拆散拼接成一个BUffer
    //转成字符串
    parser.parseString(result.toString('utf8'),(err,objres)=>{
        var msg = "";
        console.log(objres);
        if (objres.xml.MsgType=="text") {
                var data = JSON.stringify({
                    "reqType":0,
                    "perception": {
                        "inputText": {
                            "text": objres.xml.Content
                        }
                    },
                    "userInfo": {
                        "apiKey": "d45aadd544f24b01a17750661ea8f45d",
                        "userId": objres.xml.MsgId
                    }
                })
                var req = http.request({
                    method:"post",
                    host:"openapi.tuling123.com",
                    port:'80',
                    protocol:"http:",
                    path:'/openapi/api/v2',
                    headers: {  
                        "Content-Type": 'application/json',       
                        "Content-Length": Buffer.byteLength(data)
                    } 
                },(robotres)=>{
                    var BufferRobotres = [];
                    robotres.on('data',(chunk)=>{
                        BufferRobotres.push(chunk);
                    })
                    robotres.on('end',()=>{
                        var result = Buffer.concat(BufferRobotres);
                        var returnMsg = builder.buildObject({
                            ToUserName:objres.xml.FromUserName,
                            FromUserName:objres.xml.ToUserName,
                            MsgType: 'text',
                            Content: JSON.parse(result.toString()).results[0].values.text,
                            CreateTime: +new Date()
                        })
                        res.send(returnMsg)
                    })
                })
                req.write(data)
            }
        })
    })
})
app.listen(8888);
  
