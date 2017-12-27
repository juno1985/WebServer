"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var ws_1 = require("ws");
var app = express();
var Product = /** @class */ (function () {
    function Product(id, title, price, rating, desc, categories) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.rating = rating;
        this.desc = desc;
        this.categories = categories;
    }
    return Product;
}());
exports.Product = Product;
var Comment = /** @class */ (function () {
    function Comment(id, productId, timestamp, user, rating, content) {
        this.id = id;
        this.productId = productId;
        this.timestamp = timestamp;
        this.user = user;
        this.rating = rating;
        this.content = content;
    }
    return Comment;
}());
exports.Comment = Comment;
var products = [
    new Product(1, "第一个商品", 1.99, 3.5, "商品描述", ["电子产品", "日用百货"]),
    new Product(2, "第二个商品", 1.99, 4.5, "商品描述", ["运动健身", "日用百货"]),
    new Product(3, "第三个商品", 1.99, 4.0, "商品描述", ["生活娱乐", "日用百货"]),
    new Product(4, "第四个商品", 1.99, 1.5, "商品描述", ["鞋帽衣服", "日用百货"]),
    new Product(5, "第五个商品", 1.99, 2.5, "商品描述", ["外设相关", "日用百货"]),
    new Product(6, "第六个商品", 1.99, 1.0, "商品描述", ["养生保健", "日用百货"]),
    new Product(7, "第七个商品", 1.99, 2.5, "商品描述", ["电脑器材", "日用百货"]),
    new Product(8, "第八个商品", 1.99, 3.0, "商品描述", ["书刊报纸", "日用百货"]),
    new Product(9, "第九个商品", 1.99, 4.0, "商品描述", ["小资扯淡", "日用百货"])
];
var comments = [
    new Comment(1, 1, "2017-02-01 22:22:22", "zhangsan", 3, "东西不错"),
    new Comment(2, 1, "2017-02-01 22:22:22", "wangwu", 1, "东西不错"),
    new Comment(3, 1, "2017-02-01 22:22:22", "zhaoliu", 2, "东西不错"),
    new Comment(4, 2, "2017-02-01 22:22:22", "zhangsan", 4, "东西不错"),
    new Comment(5, 2, "2017-02-01 22:22:22", "zhangsan", 5, "东西不错"),
    new Comment(6, 3, "2017-02-01 22:22:22", "zhangsan", 3, "东西不错"),
    new Comment(7, 4, "2017-02-01 22:22:22", "zhangsan", 2, "东西不错")
];
// 生成处理get请求服务
app.get('/', function (req, res) {
    res.send("Hello Express");
});
app.get('/api/products', function (req, res) {
    //拿到所有数据
    var result = products;
    //拿到get请求的所有参数
    var params = req.query;
    if (params.title) {
        result = result.filter(function (p) { return p.title.indexOf(params.title) !== -1; });
    }
    if (params.price && result.length > 0) {
        //得到价格低于搜索条件的
        result = result.filter(function (p) { return p.price <= parseInt(params.price); });
    }
    if (params.category !== "-1" && result.length > 0) {
        result = result.filter(function (p) { return p.categories.indexOf(params.category) !== -1; });
    }
    res.json(products);
});
app.get('/api/product/:id', function (req, res) {
    res.json(products.find(function (product) { return product.id == req.params.id; }));
});
app.get('/api/product/:id/comment', function (req, res) {
    res.json(comments.filter(function (comment) { return comment.productId == req.params.id; }));
});
var server = app.listen(8000, "localhost", function () {
    console.log("服务器已启动,使用域名localhost,端口8000!!!");
});
var subscription = new Map();
var wsServer = new ws_1.Server({ port: 8085 });
wsServer.on("connection", function (websocket) {
    // websocket.send("服务器主动推送消息");
    websocket.on('message', function (message) {
        var prodIds = subscription.get(websocket) || [];
        subscription.set(websocket, prodIds.concat([JSON.parse(message.toString()).productId]));
    });
});
//productId->price
var currentBids = new Map();
setInterval(function () {
    products.forEach(function (p) {
        var currentBid = currentBids.get(p.id) || p.price;
        var newBid = currentBid + Math.random() * 5;
        currentBids.set(p.id, newBid);
    });
    subscription.forEach(function (productIds, ws) {
        if (ws.readyState == 1) {
            var newBids = productIds.map(function (pid) { return ({
                productId: pid,
                bid: currentBids.get(pid)
            }); });
            ws.send(JSON.stringify(newBids));
        }
        else {
            subscription.delete(ws);
        }
    });
}, 2000);
