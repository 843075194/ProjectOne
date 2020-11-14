define(["jquery", "jquery-cookie"], function ($) {

    function login() {
        var oBtn = document.getElementById("btn1");
        var oAlert = document.getElementById('alert_info');
        var Goto = document.getElementById('Goto');
        var a = document.querySelectorAll('.form-control')
        oBtn.onclick = function () {
            console.log(a[0].value);
            $ajax({
                type: "post",
                url: "../php/login.php",
                data: {
                    username: a[0].value,
                    password: a[1].value,
                },
                success: function (result) {
                    console.log(result);
                    switch (result.code) {
                        case 1:
                            oAlert.className = 'alert alert-danger';
                            oAlert.style.display = 'block';
                            oAlert.innerHTML = result.message
                            Goto.href = './register.html';
                            break;
                        case 2:
                            oAlert.className = 'alert alert-danger';
                            oAlert.style.display = 'block';
                            oAlert.innerHTML = result.message
                            Goto.href = './register.html';
                            break;
                        case 3:
                            oAlert.className = 'alert alert-danger';
                            oAlert.style.display = 'block';
                            oAlert.innerHTML = result.message
                            Goto.href = './register.html';
                            break;
                        case 4:
                            oAlert.className = 'alert alert-success';
                            oAlert.style.display = 'block';
                            oAlert.innerHTML = result.message
                            Goto.href = './index.html';
                            Goto.innerHTML = ("跳转主页")
                            break;
                        case 5:
                            oAlert.className = 'alert alert-danger';
                            oAlert.style.display = 'block';
                            oAlert.innerHTML = result.message
                            Goto.href = './register.html';
                            break;
                        case 0:
                            oAlert.className = 'alert alert-success';
                            oAlert.style.display = 'block';
                            oAlert.innerHTML = result.message
                            break;
                    }
                },
                error: function (msg) {
                    console.log(msg);
                }, isJson: true
            })
        }

    }

    function eye() {
        var eye = document.querySelector('#eye');
        var flag = 0;
        eye.addEventListener('click', function () {
            console.log(1);
            if (flag == 0) {
                eye.parentNode.parentNode.children[1].type = 'password'
                eye.src = 'images/open.png';
                flag = 1;
            } else {
                eye.parentNode.parentNode.children[1].type = 'text'
                eye.src = 'images/close.png';
                flag = 0;
            }
        })
    }

    function angel() {
        document.addEventListener('mousemove',function (ev) {
            var e = window.ev || ev;
            var x = e.clientX;
            var y = e.clientY;
            // $("#angel").style.left = x-40 + 'px';
            // $("#angel").style.top = y - 40 + 'px';
            $("#angel").css('left',x-40);
            $("#angel").css('top',y-40);
          })
      }



    return {
        login,
        eye,
        angel
    }
})