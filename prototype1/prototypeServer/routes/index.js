var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res) {
  res.send("Hello");
});

router.post('/inbox',(req,res)=>{
  res.send("Success");
});

module.exports = router;
