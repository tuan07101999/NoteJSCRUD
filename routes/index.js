var express = require('express');
var router = express.Router();
const server = require('../server');
/* GET home page. */
router.get('/', function(req, res, next) {
  server.getAll((result) =>{
    if(result){
      console.log(result);
      res.render('index',  {lst: result.Items });
    }
  })
});

router.get('/create',function(req,res,next){
  res.render('create');
})

var id = 9;
router.post('/create',function(req,res,next){
  var param = {
    "id": id++,
    "MaSV": req.body.MaSV,
    "HoTen": req.body.HoTen,
    "Lop": req.body.Lop,
    "NamSinh": req.body.NamSinh,
    "SoThich": req.body.SoThich,
  }

  server.CreateNEW(param,(result) => {
    if(result){
      res.redirect('/');
    }else{
      console.log(param);
    }
  })
})


router.get('/dlt/:id', function(req, res, next) {
  var param = {
    "id": req.params.id
  }
  server.DeleteSV(param, (result => {
      if (result) {
          res.redirect('/create');
      } else
          console.log(param);
  }))
})

module.exports = router;
