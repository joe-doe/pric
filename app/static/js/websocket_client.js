            var socket;
            $(document).ready(function(){

                var prot = "https";
                var app_url = prot + '://' + document.domain + ':' + location.port;


                socket = io.connect(app_url + '/chat');
                socket.on('connect', function() {
                    socket.emit('joined', {});
                });
                socket.on('status', function(data) {
                    $('#chat').val($('#chat').val() + '< ' + data.msg + ' >\n');
                    $('#chat').scrollTop($('#chat')[0].scrollHeight);
                });
                socket.on('message', function(data) {
                    $('#chat').val($('#chat').val() + data.msg + '\n');
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
                    window.location.href = "{{ url_for('main.index') }}";
                });
            }