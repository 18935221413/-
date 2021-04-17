window.addEventListener('load', function() {
    var inp = document.querySelector('.inp');

    var message = document.querySelector('.message');
    inp.onblur = function() {
        if (this.value.length < 6 || this.value.length > 16) {
            message.className = 'message wrong';
            message.innerHTML = '请输入6-16位密码';
        } else {
            message.className = 'message right';
            message.innerHTML = '输入格式正确';
        }
    }
})