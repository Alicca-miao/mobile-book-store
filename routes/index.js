// const query = require('../utils/utils.js'); // 使用之前定义的 query 函数

// // src/routes/book.js
// const express = require('express');
// const router = express.Router();
// const pool = require('../config/database'); // 确保路径正确

// router.get('/test', async (req, res) => {
//   try {
//     const [results] = await pool.query('SELECT * FROM book1 LIMIT 1');
//     res.json(results);
//   } catch (error) {
//     res.status(500).json({ error: 'Database query failed' });
//   }
// });
const query = require('../utils/utils'); // 假设这个模块已经设置了数据库连接

const router = (req, res) => {
  const book = req.query.book;
  const id = req.query.id;

  // 参数验证
  if (!book || !id) {
    return res.status(400).json({ error: '缺少必要的查询参数' });
  }

  // 验证book参数是否有效，假设我们只允许书籍编号为1、2或3
  const validBooks = ['1', '2', '3']; // 根据实际情况定义有效的book编号
  if (!validBooks.includes(book)) {
    return res.status(400).json({ error: '无效的书籍编号' });
  }

  // 使用参数化查询防止 SQL 注入
  const queryStr = `SELECT * FROM book${book} WHERE id = ?`;

  query(queryStr, [id], (err, results) => {
    if (err) {
      console.error('查询失败:', err);
      return res.status(500).json({ error: '查询失败', details: err });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: '未找到记录' });
    }
    res.json(results[0]); // 返回匹配的第一条记录
  });
};

module.exports = routes;