var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
// 定义了根路径 / 的路由处理逻辑，渲染 index.ejs 模板
