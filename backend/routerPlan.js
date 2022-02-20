// ----- 冠樺 ----- //

var express = require('express');
var router = express.Router();
var { query, checkAccount } = require('./mysql.js');

// 列出資料表全部的資料
router.get('/plan/all', function (req, res) {
   query('SELECT * FROM plan', [], function (err, rows) {
      res.send(rows);
   })
})

// 新增一個計劃
router.post('/plan/create', async (req, res) => {
   // 檢查前端的會員email帳號是否正確
   var acc_id = await checkAccount(req.body.acc_email, res);

   var strQuery =
      `INSERT INTO plan (acc_id, sec_id, plan_date, plan_strategy, plan_param1,
         plan_param2, plan_anchor, plan_stoploss, plan_target,	plan_note)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
   query(
      strQuery,
      [
         acc_id,
         req.body.sec_id,
         req.body.plan_date,
         req.body.plan_strategy,
         req.body.plan_param1,
         req.body.plan_param2,
         req.body.plan_anchor,
         req.body.plan_stoploss,
         req.body.plan_target,
         req.body.plan_note
      ],
      (err) => {
         err ? res.send(err) : res.send('Successfully added a plan!')
      })
});

module.exports = router;