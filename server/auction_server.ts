import * as express from 'express';

const app = express();
// 生成处理get请求服务
app.get('/', (req, res)=>{
    res.send("Hello Express");
});

app.get('/products',(req, res)=>{
    res.send("接受到查询产品请求");
});

const server = app.listen(8000, "localhost",()=>{
    console.log("服务器已启动,使用域名localhost,端口8000")
});