var express = require('express');

var router = express.Router();
//var process = require('child_process');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/build', function(req, res, next) {
  console.log(req.body);
  var version = req.body.version;
  var gitbranch = req.body.gitbranch;
  if(!version){
    res.send('版本号不能为空');
  }
  if(!gitbranch){
    res.send('git分支号不能为空');
  }
  var execStr = 'sh ./b.sh ' + version + ' ' + gitbranch;

  // process.exec(execStr, function (error, stdout, stderr) {
  //   if (error !== null) {
  //     console.log('exec error: ' + error);
  //     return stdout;
  //   }
  //   res.send(stdout.replace(/\n/g,'<br/>'));
  //   return stdout
  // });

  var exec = require('child_process').exec;
  var child = exec(execStr);

  child.stdout.on('data', function(data) {
    console.log('stdout: ' + data);
    res.send(data.replace(/\n/g,'<br/>'));
  });
  child.stderr.on('data', function(data) {
    console.log('stdout: ' + data);
    res.send(data.replace(/\n/g,'<br/>'));
  });
  child.on('close', function(code) {
    console.log('closing code: ' + code);
  });
  // res.type('json');
  // res.send({
  //   "success":true,
  //   "data":[1,2,3,4]
  // });
  //res.render('index', { title: 'Express' });
});



module.exports = router;
