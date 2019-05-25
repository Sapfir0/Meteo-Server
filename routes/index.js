var express = require('express');
var router = express.Router();

const bodyParser = require('body-parser');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', (req,res,next) => {
  console.log(req.body)
  res.send(req.body)
})

module.exports = router;
