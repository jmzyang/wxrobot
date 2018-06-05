var xml2js = require('xml2js');
//  引入xml2js,将xml和js对象进行转换的方法
var parser = new xml2js.Parser({explicitArray:false}); //xml转js parser.parseString
// ({explicitArray:false}) 默认不以数组的方式转译
var builder = new xml2js.Builder({rootName:'xml',cdata:true,headless:true}); //js转xml builder.buildObject(obj)
var str = `<xml>
<ToUserName><![CDATA[公众号]]></ToUserName>
<FromUserName><![CDATA[粉丝号]]></FromUserName>
<CreateTime>1460537339</CreateTime>
<MsgType><![CDATA[text]]></MsgType>
<Content><![CDATA[这里是用户发送的正文内容]]></Content>
<MsgId>6272960105994287618</MsgId>
</xml>`;
// parser.parseString(str,(err,res)=>{
//     console.log(res);
// })
var obj = {
    name:'jmzyang<>',
    age:18,
    sex:'男'
}
var res = builder.buildObject(obj);
console.log(res);
