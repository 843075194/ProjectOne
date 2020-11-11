function $ajax({ type = "get", url, data, success, error, isJson }) {

  type = type.toLowerCase();
  var xhr = null;
  try {
    xhr = new XMLHttpRequest();
  } catch (error) {
    xhr = ActiveXObject("Microsoft.XMLHTTP");
  }
  //如果请求是get且有数据，拼接url
  if (type === "get" && data) {
    url += "?" + queryString(data);
  }
  //open是固定要传这三个
  //如果是get方式要拼接字符串，如果是post方式直接写url就行
  xhr.open(type, url, true);

  if (type === "get") {

    //get直接输出send()
    xhr.send();
  } else {
    //设置编码格式  如果是post请求
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

    //post在send()的时候要加上传入参数
    xhr.send(queryString(data));
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        var res = isJson ? JSON.parse(xhr.responseText) : xhr.responseText;
        //这句话意思是看是否是json格式的，如果是json格式的话需要改成对象的模式;
        success && success(res);
      } else {
        error && error("Error: " + xhr.status);
        //如果不是200，说明报错了，把报错编号返回出来
      }
    }
  }
}

function queryString(obj) {
  var str = "";
  if (!obj) {
    return str;
  }
  for (var attr in obj) {
    str += `${attr}=${obj[attr]}&`;
  }
  return str.substring(0, str.length - 1);
}
