// ----- 冠樺 ----- //

// 以 Express 建立 Web伺服器
var express = require('express');
var app = express();

// 部署至 Heroku 會用到
app.use(express.static('backend/build'));

// 引用 cors 解決跨域問題
var cors = require('cors');
app.use(cors());

// 獲取前端的變數
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 引用各資料表的 router
var routers = [
    './routerAccount',
    './routerAsset',
    './routerPlan',
    './routerSecurities',
    './routerTransaction'
]

routers.forEach(val => { app.use('/', require(val)); })

// 一切就緒，開始接受用戶端連線
app.listen(process.env.PORT || 5000);


// ------------------------------------------------------- //
// member 為測試用的資料表，之後將會刪掉，正式名稱應為 account
// ------------------------------------------------------- //

var { query } = require('./mysql.js');

app.get('/member/list', function (req, res) {
    query('SELECT * FROM members', [], function (err, rows) {
        res.send(rows);
    })
});

app.post('/member/add', function (req, res) {
    conn.query('INSERT INTO members (name) VALUES (?)', [req.body.name], function (err, rows) {
        res.send('ok');
    })
    console.log(req.body);
})


