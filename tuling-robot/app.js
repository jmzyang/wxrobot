const http = require('http')
// reqType	int	N	-	输入类型:0-文本(默认)、1-图片、2-音频
// perception	-	Y	-	输入信息
// userInfo
var data = JSON.stringify({
	"reqType":0,
    "perception": {
        "inputText": {
            "text": "你好"
        }
    },
    "userInfo": {
        "apiKey": "d45aadd544f24b01a17750661ea8f45d",
        "userId": "123456"
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
},(res)=>{
    var BufferList = [];
    res.on('data',(chunk)=>{
        BufferList.push(chunk);
    })
    res.on('end',()=>{
        var result = Buffer.concat(BufferList);
        console.log(JSON.parse(result.toString()).results[0].values.text);
    })
})
req.write(data); //发送请求
