$(document).ready(function () {
    $('.textarea').bind('keydown', function (event) {
        if (event.keyCode == 13 && $(this).val()) {
            sendMessage($(this).val());
        }
    });
});

sendMessage = function (text) {
    renderMessage(text, 'self');
    $.ajax({
        url: "/string/",
        success: function (data) {
            renderMessage(JSON.parse(data).text, 'other');
        }
    });
}

renderMessage = function (text, to) {
    var urlImage = '';
    if (to == 'self')
        urlImage = 'http://i.imgur.com/HYcn9xO.png';
    else
        urlImage = 'https://www.ibm.com/cognitive/ca-en/outthink/i/outthink/logo.gif';
    var li = $('<li>', {
        class: to,
    });
    var img = $('<img>', {
        src: urlImage,
    });
    var avatar = $('<div>', {
        class: 'avatar',
    }).prepend(img);
    var date = new Date();
    var msg = $('<div>', {
        class: 'msg',
    }).prepend('<p>' + text + '</p><time>' + date.getHours() + ':' + date.getMinutes());
    li.prepend(avatar);
    li.prepend(msg);
    $('ol').append(li);
    $('ol').get(0).scrollTop = $('ol').get(0).scrollHeight;
}