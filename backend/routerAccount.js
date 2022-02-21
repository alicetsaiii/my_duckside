// ----- 冠樺 ----- //

var express = require('express');
const { default: reactSelect } = require('react-select');
var router = express.Router();
var { query, checkAccount } = require('./mysql.js');

// 列出資料表全部的資料
router.get('/account/all', (req, res) => {
   query(`SELECT * FROM account`,
      [],
      (err, rows) => res.send(rows)
   );
});

// 新增會員
router.post('/account/create', (req, res) => {
   let strQuery = `INSERT INTO account
        (acc_email, acc_password, acc_name) VALUES(?, ?, ?)`
   query(strQuery,
      [req.body.acc_email, req.body.acc_password, req.body.acc_name],
      (err) => err ? res.send(err) : res.send('Added successfully')
   );
});

// 註冊會員時，檢查email帳號是否有重複
// 回傳 boolean 值：有重複回傳 true；沒有重複回傳 false
router.get('/account/check/:acc_email', (req, res) => {
   let strQuery = `SELECT acc_email FROM account WHERE acc_email = ?`
   query(strQuery, [req.params.acc_email], (err, rows) => {
      err ? res.send(err) : res.send(rows[0] ? true : false);
   });
});

// 列出某會員的會員資料
router.get('/account/list', async (req, res) => {
   // 檢查前端的會員email帳號是否正確
   var acc_id = await checkAccount(req.body.acc_email, res);

   let strQuery = `SELECT * FROM account WHERE acc_id = ?`;
   query(strQuery, [acc_id], (err, rows) => {
      err ? res.send(err) : res.send(rows[0]);
   });
});

// 會員登入，檢查密碼是否正確
router.get('/account/login', async (req, res) => {
   // 檢查前端的會員email帳號是否正確
   var acc_id = await checkAccount(req.body.acc_email, res);

   let strQuery = `SELECT acc_email, acc_password FROM account WHERE acc_id = ?`;
   query(strQuery, [acc_id], (err, rows) => {
      if (err) {
         res.send(err);
      } else {
         (req.body.acc_password === rows[0].acc_password) ?
            res.send('Passowrd corret') : res.send('Password error');
      }
   });
});

module.exports = router;