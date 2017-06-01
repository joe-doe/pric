var socket;
var prot = "http";
var app_url = prot + '://' + document.domain + ':' + location.port;

$(document).ready(function(){

    var static_folder = $('.static-folder').attr('id');
    socket = io.connect(app_url + '/chat');

    socket.on('connect', function() {
        socket.emit('joined', {});
    });

    socket.on('status', function(data) {
        $('#chat').val($('#chat').val() + '< ' + data.msg + ' >\n');
        $('#chat').scrollTop($('#chat')[0].scrollHeight);
    });

    socket.on('message', function(data) {
        // msg = data.msg.replace(":)", "<img src='" + static_folder + "photo/emoji/rockanim.gif' alt='rock-emoji'/>");
        for(key in emoji) {
            msg = data.msg.replace(key.toString(), "<img src='" + static_folder + "photo/emoji/"+ emoji[key] +"' alt='"+ emoji[key] +"'/>");
            console.log(msg);
        }
        $('#chat').append('<span id="user">' + data.user + ': </span><span id="message"> ' + msg + '</span><br />');
        $('#chat').scrollTop($('#chat')[0].scrollHeight);
        if (focused == false) {
            notifyMe(data.msg);
        }
    });

    $('#text').keypress(function(e) {
        var code = e.keyCode || e.which;
        if (code == 13) {
            text = $('#text').val();
            $('#text').val('');
            socket.emit('text', {msg: text});
        }
    });
});
function leave_room() {
        socket.emit('left', {}, function() {
            socket.disconnect();
            // go back to the login page
            window.location.href = app_url;
        });
}

