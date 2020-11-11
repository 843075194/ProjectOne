define(["jquery", "jquery-cookie"], function($){

    function registerSend() {  
        var oBtn = document.getElementById("btn1");
            var aInputs = document.getElementsByTagName("input");
            // var aInputs = document.getElementsByTagName("input");这个没获取到
            var oAlert = document.getElementById('alert_info');
            var Goto = document.getElementById('Goto');
            var a = document.querySelectorAll('.form-control')
            oBtn.onclick = function () {
                console.log(a[0].value);
                //function $ajax({ type = "get", url, data, success, error,callback }) {
                $ajax({
                    type: "post",
                    url: "../php/register.php",
                    data: {
                        username: a[0].value,
                        password: a[1].value,
                        repassword: a[2].value,
                        createTime: (new Date()).getTime()
                    },
                    success: function (result) {
                        console.log(result);
                        switch (result.code) {
                            case 1:
                                oAlert.className = 'alert alert-danger';
                                oAlert.style.display = 'block';
                                oAlert.innerHTML = result.message
                                break;
                            case 2:
                                oAlert.className = 'alert alert-danger';
                                oAlert.style.display = 'block';
                                oAlert.innerHTML = result.message
                                break;
                            case 3:
                                oAlert.className = 'alert alert-danger';
                                oAlert.style.display = 'block';
                                oAlert.innerHTML = result.message
                                break;
                            case 4:
                                oAlert.className = 'alert alert-success';
                                oAlert.style.display = 'block';
                                oAlert.innerHTML = result.message
                                Goto.href = './login.html';
                                break;
                            case 5:
                                oAlert.className = 'alert alert-danger';
                                oAlert.style.display = 'block';
                                oAlert.innerHTML = result.message
                                break;
                            case 6:
                                oAlert.className = 'alert alert-danger';
                                oAlert.style.display = 'block';
                                oAlert.innerHTML = result.message
                                break;
                            case 0:
                                oAlert.className = 'alert alert-success';
                                oAlert.style.display = 'block';
                                Goto.href = './login.html';
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
        registerSend
    }
})