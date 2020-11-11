define(["jquery", "jquery-cookie"], function($){

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
                                Goto.innerHTML=("跳转主页")
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





    return{
        login
    }
})