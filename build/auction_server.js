"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
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
// 生成处理get请求服务
app.get('/', function (req, res) {
    res.send("Hello Express");
});
app.get('/products', function (req, res) {
    res.json(products);
});
app.get('/product/:id', function (req, res) {
    res.json(products.find(function (product) { return product.id == req.params.id; }));
});
var server = app.listen(8000, "localhost", function () {
    console.log("服务器已启动,使用域名localhost,端口8000!!!");
});
