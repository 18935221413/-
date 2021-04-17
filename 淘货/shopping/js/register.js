window.addEventListener('load', function() {
    var eye = document.getElementById('eye');
    var pwd = document.getElementById('pwd');
    var flag = 0;
    eye.onclick = function() {
        if (flag == 0) {
            pwd.type = 'text';
            eye.src = 'images/open.png';
            flag = 1;
        } else {
            pwd.type = 'password';
            eye.src = 'images/close.png';
            flag = 0;
        }
    }

})