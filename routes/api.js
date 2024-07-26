// routes/api.js
var express = require('express');
var router = express.Router();
const multer = require('multer'); // 确保这行代码存在并且没有错误

// 修改路由处理程序以读取 JSON 文件
// 在 routes/api.js 文件中，使用 fs 模块读取 JSON 文件并返回其内容：
var fs = require('fs');
var path = require('path');


// 示例API端点: 获取用户列表
// router.get('/users', function(req, res, next) {
//   fs.readFile(path.join(__dirname, '../data/users.json'), 'utf8', (err, data) => {
//     if (err) {
//       return next(err);
//     }
//     // 将 JSON 字符串解析为 JavaScript 对象
//     const users = JSON.parse(data);
//     // 返回 JSON 数据
//     // res.json(users);
//     const userswithimages=users.map(user=>({
//       ...user,
//         image: `/images/admin/${user.image}` // 构建完整的图片 URL
//     }))
//     res.json(userswithimages)




//   });

// });

// // 示例API端点: 获取单个用户
// router.get('/users/:id', function(req, res, next) {
//   const userId = parseInt(req.params.id, 10);
//   // res.json({ id: userId, name: `User ${userId}` });

//   fs.readFile(path.join(__dirname, '../data/users.json'), 'utf8', (err, data) => {
//     if (err) {
//       return next(err);
//     }
//     const users = JSON.parse(data);
//     const user = users.find(u => u.id === userId);

//     if (user) {
//       res.json(user);
//     } else {
//       res.status(404).json({ message: 'User not found' });
//     }
//   });
// });


router.get('/mov', function(req, res, next) {
  fs.readFile(path.join(__dirname, '../data/movie.json'), 'utf8', (err, data) => {
    if (err) {
      return next(err);
    }
    // 将 JSON 字符串解析为 JavaScript 对象
    const movies = JSON.parse(data);
    // 返回 JSON 数据
    res.json(movies);
    // const userswithimages=users.map(user=>({
    //   ...user,
    //     image: `/images/admin/${user.image}` // 构建完整的图片 URL
    // }))
    // res.json(userswithimages)

  });

});

router.get('/detail', function(req, res, next) {
  fs.readFile(path.join(__dirname, '../data/detail.json'), 'utf8', (err, data) => {
    if (err) {
      return next(err);
    }
    // 将 JSON 字符串解析为 JavaScript 对象
    const movies = JSON.parse(data);
    // 返回 JSON 数据
    res.json(movies);
    // const userswithimages=users.map(user=>({
    //   ...user,
    //     image: `/images/admin/${user.image}` // 构建完整的图片 URL
    // }))
    // res.json(userswithimages)

  });

});

// router.get('/mov/:id', function(req, res, next) {
//   const filmId = parseInt(req.params.id, 10);
  
//   fs.readFile(path.join(__dirname, '../data/detail.json'), 'utf8', (err, data) => {
//     if (err) {
//       return next(err);
//     }
    
//     const users = JSON.parse(data);
//     const user = users.find(u => u.filmId === filmId);

//     if (user) {
//       res.json(user);
//     } else {
//       res.status(404).json({ message: 'User not found' });
//     }
//   });
// });

// router.get('/film/:id', function(req, res, next) {
//   const filmId = parseInt(req.params.id, 10);
  
//   fs.readFile(path.join(__dirname, '../data/detaill.json'), 'utf8', (err, data) => {
//     if (err) {
//       return next(err);
//     }
    
//     const users = JSON.parse(data);
//     const user = users.find(u => u.filmId === filmId);

//     if (user) {
//       res.json(user);
//     } else {
//       res.status(404).json({ message: 'User not found' });
//     }
//   });
// });
router.get('/film', function(req, res, next) {
  fs.readFile(path.join(__dirname, '../data/film.json'), 'utf8', (err, data) => {
    if (err) {
      return next(err);
    }
    // 将 JSON 字符串解析为 JavaScript 对象
    const movies = JSON.parse(data);
    // 返回 JSON 数据
    res.json(movies);
    // const userswithimages=users.map(user=>({
    //   ...user,
    //     image: `/images/admin/${user.image}` // 构建完整的图片 URL
    // }))
    // res.json(userswithimages)

  });

});


const uploadPath = path.join(__dirname, 'public', 'images');


// 配置 multer 用于处理文件上传
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        try {
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    } catch (error) {
      console.error('Error setting upload directory:', error);
      cb(error);
    }
  },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // 确保文件名唯一
        // const oname = req.files[0].originalname
      // cb(null, file.originalname);

    }
});
const upload = multer({ storage: storage });
// 添加上传处理器
router.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }

    console.log('path', req.file.path);
    console.log('originalname', req.file.originalname);
    const filePath = `/images/${req.file.filename}`;

    res.json({
        msg: '文件上传成功',
        body: req.body,
        filePath: filePath // 返回文件访问路径
    });
});



module.exports = router;
