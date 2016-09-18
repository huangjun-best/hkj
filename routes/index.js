var express = require('express');
var router = express.Router();
var git = require('../func/gitCommand');
var branchList = '';
git.branchAll("/opt/C7649/webapps/hkj/publish/", function (err,str) {
  if(err){
    console.log(err);
    return;
  }
  branchList = splitArr(str.split(' '));
  console.log(branchList);
});
//var process = require('child_process');
function splitArr(arr){
  var emptyArr = [];
  arr.forEach(function(v,k){
    v = v.replace('origin/','');
    if(v && v != '->' && v != 'HEAD'){
      if(!inArray(v, emptyArr)){
        emptyArr.push(v);
      }
    }
  });
  return emptyArr;
}

function inArray(str, arr){
  var count = 0;
  arr.forEach(function(v,k){
    if(str == v){
      count++;
    }
  });
  return !!count;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  // cosole.log(git);
  res.render('index', { branchList: branchList });
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
    console.log(execStr);

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
