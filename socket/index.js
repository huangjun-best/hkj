var socket = function(io){
    var exec = require('child_process').exec;
    // io.on('connection', function (socket) {
    //     console.log('a user connected');
    //     socket.emit('news', { hello: 'world' });
    //     socket.on('my other event', function (data) {
    //         console.log(data);
    //     });
    // });
    // io.on('connection', function(socket){
    //     socket.on('chat message', function(msg){
    //         console.log('message: ' + msg);
    //     });
    // });
    var count = 0;
    var clickBuild = false;

    io.on('connection', function(socket){
        count++;
        //socket.broadcast.emit('hi');
        console.log(count);
        socket.on('start build', function(msg){
            console.log(clickBuild);
            if(clickBuild){
                socket.emit('queue','前面已经有人在编译了,请稍后再试');
                return;
            }
            clickBuild = true;
            console.log(msg);
            var version = msg.version;
            var gitbranch = msg.gitbranch;

            var execStr = 'sh ./b.sh ' + version + ' ' + gitbranch;
            var child = exec(execStr);
            if(!version){
                socket.emit('error','版本号不能为空');
            }
            if(!gitbranch){
                socket.emit('error','git分支号不能为空');
            }
            socket.emit('start','开始执行脚本,请等待');

            child.stdout.on('data', function(data) {
                console.log('stdout: ' + data);
                socket.emit('get Process',data);
            });
            // child.stderr.on('data', function(data) {
            //     console.log('stdout: ' + data);
            //     res.send(stdout.replace(/\n/g,'<br/>'));
            // });

            child.on('close', function(code) {
                console.log('closing code: ' + code);
                setTimeout(function(){
                    clickBuild = false;
                },10000);

                socket.emit('close','脚本执行完成');
            });
            //io.emit('chat message', msg);
        });
    });
};



module.exports = socket;