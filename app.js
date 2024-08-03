const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// 创建数据库连接
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // 替换为你的数据库用户名
  password: '12345678', // 替换为你的数据库密码
  database: 'booklist' // 替换为你的数据库名称
});

// 连接到数据库
connection.connect((err) => {
  if (err) {
    console.error('数据库连接失败:', err.stack);
    return;
  }
  console.log('数据库连接成功');
});

//设置跨域
app.all("*", function(req, res, next) {
  if (!req.get("Origin")) return next();
  // use "*" here to accept any origin
  res.set("Access-Control-Allow-Origin","*");
  res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.set("Access-Control-Allow-Headers", "X-Requested-With,Origin,Content-Type,Accept");
  // res.set('Access-Control-Allow-Max-Age', 3600);
  if ("OPTIONS" === req.method) return res.sendStatus(200);
  next();
});
// 动态获取表数据的路由
app.get('/booklist/:tableName/:id', (req, res) => {
  const tableName = req.params.tableName;
  const id = req.params.id;

  // // 确保表名是有效的，防止 SQL 注入
  // const validTables = ['book1', 'book2', 'book3']; // 根据实际情况定义有效的表名
  // if (!validTables.includes(tableName)) {
  //   return res.status(400).json({ error: '无效的表名' });
  // }
//183?
  // 使用参数化查询防止 SQL 注入
  const queryStr = `SELECT * FROM ${tableName} WHERE id = ?`;

  connection.query(queryStr, [id], (err, results) => {
    if (err) {
      console.error('查询失败:', err);
      return res.status(500).json({ error: '查询失败', details: err });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: '未找到记录' });
    }
    res.json(results[0]); // 返回匹配的第一条记录
  });
});


// 根据类型获取内容的路由


app.get('/type', (req, res) => {
  // const tableName = req.params.tableName;
  const id = req.query.id || 0
  const queryStr =  `SELECT * FROM booklist WHERE type =?`;
  connection.query(queryStr, [id], (err, results) => {
    if (err) {
      console.error('查询失败:', err);
      return res.status(500).json({ error: '查询失败', details: err });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: '未找到记录' });
    }
    res.json(results[0]); // 返回匹配的第一条记录
  });
});

// app.get('/booklist/:type', (req, res) => {
//   const type = req.params.type;

//   if (!type) {
//     return res.status(400).json({ error: '缺少type参数' });
//   }



// function getType(type) {
//   if (type == 1) {
//     return '玄幻'
//   } else if (type == 2) {
//     return '修真'
//   } else if (type == 3) {
//     return '都市'
//   } else if (type == 4) {
//     return '历史'
//   } else if (type == 5) {
//     return '网游'
//   }
// }

//   // 使用参数化查询防止 SQL 注入
//   const queryStr = 'SELECT * FROM booklist WHERE type= ?';
// let typee=getType(type)
//   connection.query(queryStr, [typee], (err, results) => {
//     if (err) {
//       console.error('查询失败:', err);
//       return res.status(500).json({ error: '查询失败', details: err });
//     }
//     if (results.length === 0) {
//       return res.status(404).json({ error: '未找到记录' });
//     }
//     res.json(results[0]); // 返回匹配的第一条记录
//   });
// });

//接下来是booklist的部分
app.get('/booklist', (req, res) => {
  // const tableName = req.params.tableName;
  const id = req.query.id || 0
  const queryStr = id? `SELECT * FROM booklist WHERE id =?`:`select * from booklist;`;
  connection.query(queryStr, [id], (err, results) => {
    if (err) {
      console.error('查询失败:', err);
      return res.status(500).json({ error: '查询失败', details: err });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: '未找到记录' });
    }
    res.json(results[0]); // 返回匹配的第一条记录
  });
});
app.get('/titles', (req, res) => {
  // const tableName = req.params.tableName;
  const id = req.query.id || 0
  const queryStr =  `SELECT * FROM booktitles WHERE id =?`;
  connection.query(queryStr, [id], (err, results) => {
    if (err) {
      console.error('查询失败:', err);
      return res.status(500).json({ error: '查询失败', details: err });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: '未找到记录' });
    }
    res.json(results[0]); // 返回匹配的第一条记录
  });
});
//还差个booktitle应该不用了？






// 启动服务器
app.listen(port, () => {
  console.log(`服务器正在监听 http://localhost:${port}`);
});
