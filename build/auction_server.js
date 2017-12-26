"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
// 生成处理get请求服务
app.get('/', function (req, res) {
    res.send("Hello Express");
});
app.get('/products', function (req, res) {
    res.send("接受到查询产品请求");
});
var server = app.listen(8000, "localhost", function () {
    console.log("服务器已启动,使用域名localhost,端口8000");
});
