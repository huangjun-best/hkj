var exec = require('child_process').exec

function _command (cmd, dir, cb) {
    if (typeof dir === 'function') cb = dir, dir = __dirname
    exec(cmd, { cwd: dir }, function (err, stdout, stderr) {
        if (err) {
            return cb(err)
        }
        cb(null, stdout.split('\n').join(''))
    })
}

module.exports = {
    short : _command.bind(null, 'git rev-parse --short HEAD'),
    branchAll : _command.bind(null, 'git branch -r')
}