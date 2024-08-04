1. 小程序重写接口
2. 将首页的部分到小程序
   比较烦的是精灵图、轮播图
3. 顶部那个 custom topnav
4. 解决 pinia 和 less 的问题
5. 将剩下页面全部重构
6. 没有 axios，用 uni.request

   const getData = () => {
   uni.request({
   url: 'http://localhost:3000/booklist/book1/1',
   method: 'GET',
   success: (res) => {
   console.log(res.data);
   },
   fail: (err) => {
   console.error(err);
   }
   });
   };

- api1:
  http://localhost:3000/booklist

测试数据：
"id": "5",
"name": "圣墟",
"author": "辰东",
"images": "http://qidian.qpic.cn/qdbimg/349573/1004608738/150",
"ratings": "4.8",
"wordcount": "114.84",
"type": "玄幻",
"intro": "在破败中崛起，在寂灭中复苏。沧海成尘，雷电枯竭，那一缕幽雾又一次临近大地，世间的枷锁被打开了，一个全新的世界就此揭开神秘的一角……",
"serialize": "连载",
"like": "145-82-29"

less 安装
npm install less less-loader --save-dev
scss 安装
npm install sass sass-loader --save-dev

mysql -u root -p

SHOW DATABASES;

/Users/yumiaoli/Downloads/book_u.sql

CREATE DATABASE booklist;
USE booklist;
mysql -u root -p booklist < /path/to/booklist.sql

const mysql = require('mysql2'); const pool = mysql.createPool({ host: 'localhost', // MySQL 主机 user: 'root', // MySQL 用户名 password: 'yourpassword', // MySQL 密码 database: 'booklist' // 要连接的数据库 }); const promisePool = pool.promise(); module.exports = promisePool;
const db = require('./database'); async function testConnection() { try { const [rows] = await db.query('SELECT 1 + 1 AS result'); console.log('Database connection successful:', rows); } catch (err) { console.error('Database connection failed:', err); } } testConnection();
然后下载 mysql。 设置的 12345678
（macos 11 配套 mysql 版本为 5.8）

/usr/local/mysql/bin
brew cleanup
nano ~/.zshrc
直接添加到末尾
export PATH="/usr/local/mysql/bin:$PATH"
在 `nano` 中，按 `Ctrl + O`（字母 O）保存文件，然后按 `Ctrl + X` 退出。
source ~/.zshrc
刷新生效
mysql -u root -p
使用密码登录
exit;
mysql -u root -p booklist < /Users/yumiaoli/Downloads/book_u.sql
(在终端执行导入)
**USE booklist;
SHOW TABLES;
总共好像 183 个**

{"error":"查询失败","details":{"code":"ER_NO_SUCH_TABLE","errno":1146,"sqlState":"42S02","sqlMessage":"Table 'booklist.type' doesn't exist","sql":"SELECT \* FROM type WHERE name = '网游'"}}

http://localhost:3000/booklist/4
(类别)

http://localhost:3000/booklist/book1/1
（book 每一章节的内容 还有个参数 content）

http://localhost:3000/booklist?id=100
(推你喜欢)

使用首先需要能连接到 mysql，并先导入上面的 sql 文件，然后在`server`目录下创建`config/index.js`：
reader

- 最后改图片（按照 uni ap 的大小改）

出错：
遇到问题：

1. 跨域失败 没设置 cors，把//设置跨域
   app.all("_", function(req, res, next) {
   if (!req.get("Origin")) return next();
   // use "_" here to accept any origin
   res.set("Access-Control-Allow-Origin","\*");
   res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
   res.set("Access-Control-Allow-Headers", "X-Requested-With,Origin,Content-Type,Accept");
   // res.set('Access-Control-Allow-Max-Age', 3600);
   if ("OPTIONS" === req.method) return res.sendStatus(200);
   next();
   });

这段设置跨域的代码放在最后，不行要放在 router 所有接口的最前面
前端里不要 rewrite api

2 vue 里 TypeError: Cannot read properties of null (reading 'nextSibling') 的问题和解决方案：
（以为是跨域问题）发现是 vnode 的问题，组件 props 传递错了

1 精灵图里不支持 i 了只能用 class
2 从 180 个数据里搞随机数

http://localhost:3000/titles?id=2

问题 1: fontrbar 里点击 字体颜色和大小不变
问题 2:
->(type)category->bookdetail
