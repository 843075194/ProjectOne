<?php
header("Content-type:text/html;charset=utf-8");
//统一返回格式
    //统一返回格式
   $responseData = array("code" => 0, "message" => "");
   
   //取出传过来的数据
    $username = $_POST['username'];
    $password = $_POST['password'];
    $createTime = $_POST['createTime'];

    //进行表单验证
    if(!$username){
        $responseData["code"] = 1;
        $responseData["message"] = "用户名不存在";
        echo json_encode($responseData);
        exit;
    }
    if(!$password){
        $responseData["code"] = 2;
        $responseData["message"] = "密码不能为空";
        echo json_encode($responseData);
        //输出$responseData = array("code" => 0, "message" => "");就是这一行
        exit;
    }
    //1、连接数据库
     $link = mysql_connect("127.0.0.1","root","123456");

    //2、判断数据库是否连接成功
    if(!$link){
        echo "连接失败";
        $responseData["code"] = 3;
        $responseData["message"] = "数据库连接失败";
        echo json_encode($responseData);
        exit;
    }
    //3、设置访问字符集
    mysql_set_charset("utf8");

    //4、选择数据库
    mysql_select_db("mysql");

    //5、准备sql语句  验证用户名是否重名
    $sql1 = "SELECT * FROM loginstudent2 WHERE username='{$username}'";
    //  echo $sql1;
    //6、发送sql语句
    $res = mysql_query($sql1);
  
    //7、取出一行数据
    $row = mysql_fetch_assoc($res);
    // echo $row;
    if($row){
        //用户名重名
        $responseData['code'] = 4;
        $responseData['message'] = "用户已经存在，可以立即登录";
        echo json_encode($responseData);
        exit;
    }

    //md5加密
    $str = md5($password);

    //5、准备sql语句进行插入操作
    $sql2 = "INSERT INTO loginstudent2(username,password,createTime) VALUES('{$username}','{$str}',{$createTime})";

    //6、发送sql语句
    $res = mysql_query($sql2);

    if(!$res){
        $responseData["code"]=5;
        $responseData["message"] = "注册失败";
        echo json_encode($responseData);
        exit;
    }else {
        $responseData["code"]=0;
        $responseData["message"] = "注册成功";
        echo json_encode($responseData);
    }
    
    //8、关闭数据库
    mysql_close($link);
 ?>