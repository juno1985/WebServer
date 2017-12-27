import * as express from 'express';
import {Server} from 'ws';
const app = express();

export class Product{
    constructor(
      public id:number,
      public title:string,
      public price:number,
      public rating:number,
      public desc:string,
      public categories:Array<string>
    ){}
  }
  export class Comment{
  constructor(
    public id:number,
    public productId:number,
    public timestamp:string,
    public user:string,
    public rating:number,
    public content:string
  ){}
  }

  const products: Product[]=[
    new Product(1,"第一个商品",1.99,3.5,"商品描述",["电子产品","日用百货"]),
    new Product(2,"第二个商品",1.99,4.5,"商品描述",["运动健身","日用百货"]),
    new Product(3,"第三个商品",1.99,4.0,"商品描述",["生活娱乐","日用百货"]),
    new Product(4,"第四个商品",1.99,1.5,"商品描述",["鞋帽衣服","日用百货"]),
    new Product(5,"第五个商品",1.99,2.5,"商品描述",["外设相关","日用百货"]),
    new Product(6,"第六个商品",1.99,1.0,"商品描述",["养生保健","日用百货"]),
    new Product(7,"第七个商品",1.99,2.5,"商品描述",["电脑器材","日用百货"]),
    new Product(8,"第八个商品",1.99,3.0,"商品描述",["书刊报纸","日用百货"]),
    new Product(9,"第九个商品",1.99,4.0,"商品描述",["小资扯淡","日用百货"])
  ];

    const comments:Comment[]=[
    new Comment(1,1,"2017-02-01 22:22:22","zhangsan",3,"东西不错"),
    new Comment(2,1,"2017-02-01 22:22:22","wangwu",1,"东西不错"),
    new Comment(3,1,"2017-02-01 22:22:22","zhaoliu",2,"东西不错"),
    new Comment(4,2,"2017-02-01 22:22:22","zhangsan",4,"东西不错"),
    new Comment(5,2,"2017-02-01 22:22:22","zhangsan",5,"东西不错"),
    new Comment(6,3,"2017-02-01 22:22:22","zhangsan",3,"东西不错"),
    new Comment(7,4,"2017-02-01 22:22:22","zhangsan",2,"东西不错")
  ];
// 生成处理get请求服务
app.get('/', (req, res)=>{
    res.send("Hello Express");
});

app.get('/api/products',(req, res)=>{
    res.json(products);
});

app.get('/api/product/:id',(req, res)=>{
    res.json(products.find((product)=>product.id==req.params.id));
});

app.get('/api/product/:id/comment',(req,res)=>{
	res.json(comments.filter((comment:Comment)=>comment.productId==req.params.id));
});

const server = app.listen(8000, "localhost",()=>{
    console.log("服务器已启动,使用域名localhost,端口8000!!!")
});

const wsServer=new Server({port:8085});
wsServer.on("connection", websocket=>{websocket.send("服务器主动推送消息")});