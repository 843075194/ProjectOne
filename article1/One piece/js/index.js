window.onload = function () {

  //保存当前点击过的文字导航点,默认为0
  var this_index = -1;
  //保存当前显示
  var index = 0;
  //2 获取内容区视口的大小
  var content = document.querySelector("#content");
  var header = document.querySelector("#wrap #header");
  var ul = document.querySelector("#content .list ");
  var contentLis = document.querySelectorAll("#content .list>li");
  var active = document.querySelectorAll("#header .nav li");
  var dot = document.querySelectorAll("#content .dot>li");

  //0 控制音乐的播放
  var music = document.querySelector(".music");
  var audio = document.querySelector(".music #audio");
  music.onclick = function () {
    if (music.played) {
      audio.pause();
      music.style.background = "url(\'./images/musicoff.gif\')";
    } else {
      audio.play();
      music.style.background = "url(\'./images/musicon.gif\')";
    }
  }

  //1 控制鼠标滚动切换屏入场动画
  var arrAn = [
    {
      inAn: function () {
        var one1 = document.querySelector("#content .list .one .nav");
        var one2 = document.querySelector("#content .list .one .one2");
        var one3 = document.querySelector("#content .list .one .one3");

        one1.style.transform = "translateY(0px)";
        one2.style.transform = "translateX(0px)";
        one3.style.opacity = "1";
        one3.style.transform = "scale(1)";

      },
      outAn: function () {
        var one1 = document.querySelector("#content .list .one .nav");
        var one2 = document.querySelector("#content .list .one .one2");
        var one3 = document.querySelector("#content .list .one .one3");

        one1.style.transform = "translateY(1000px)";
        one2.style.transform = "translateX(1000px)";
        one3.style.opacity = "0";
        one3.style.transform = "scale(0.1)";
      }
    },
    {
      inAn: function () {
        var two1_list1 = document.querySelector(".two .two1 .two1_list .two1_list1");
        var two1_list2 = document.querySelector(".two .two1 .two1_list .two1_list2");
        var two1_list3 = document.querySelector(".two .two1 .two1_list .two1_list3");
        var two2 = document.querySelector(".two .two2  ");

        two1_list1.style.transform = "translateY(0px)"
        two1_list2.style.transform = "translateY(0px)"
        two1_list3.style.transform = "translateY(0px)"
        two2.style.transform = "translateY(0px)"
      },
      outAn: function () {
        var two1_list1 = document.querySelector(".two .two1 .two1_list .two1_list1");
        var two1_list2 = document.querySelector(".two .two1 .two1_list .two1_list2");
        var two1_list3 = document.querySelector(".two .two1 .two1_list .two1_list3");
        var two2 = document.querySelector(".two .two2  ");

        two1_list1.style.transform = "translateY(1000px)"
        two1_list2.style.transform = "translateY(1200px)"
        two1_list3.style.transform = "translateY(1400px)"
        two2.style.transform = "translateY(-500px)"

      }
    },
    {
      inAn: function () {
        var three1_list1 = document.querySelector(".three1_list .three1_list1");
        var three1_list2 = document.querySelector(".three1_list .three1_list2");
        var three2 = document.querySelector(".three .three2");

        three1_list1.style.transform = "translateX(0px)"
        three1_list2.style.transform = "translateX(0px)"
        three2.style.transform = "translateX(0px)"
      },
      outAn: function () {
        var three1_list1 = document.querySelector(".three1_list .three1_list1");
        var three1_list2 = document.querySelector(".three1_list .three1_list2");
        var three2 = document.querySelector(".three .three2");

        three1_list1.style.transform = "translateX(558px)"
        three1_list2.style.transform = "translateX(279px)"
        three2.style.transform = "translateX(-1000px)"
      }
    },
    {
      inAn: function () {
        var four1_list1 = document.querySelector(".four1_list .four1_list1");
        var four1_list2 = document.querySelector(".four1_list .four1_list2");
        var four1_list3 = document.querySelector(".four1_list .four1_list3");
        var four2 = document.querySelector(".four .four2");
        setTimeout(function () {
          four1_list2.style.transform = "translate(0,0)"
        }, 500);
        setTimeout(function () {
          four1_list1.style.transform = "translate(0,0)"
          four1_list3.style.transform = "translate(0,0)"
        }, 700)
        setTimeout(function () {
          four2.style.opacity = "1"
        }, 1000)
      },
      outAn: function () {
        var four1_list1 = document.querySelector(".four1_list .four1_list1");
        var four1_list2 = document.querySelector(".four1_list .four1_list2");
        var four1_list3 = document.querySelector(".four1_list .four1_list3");
        var four2 = document.querySelector(".four .four2");

        four1_list1.style.transform = "translate(279px,-1000px)"
        four1_list3.style.transform = "translate(-279px,-1000px)"
        four1_list2.style.transform = "translate( 0,-1000px)"
        four2.style.opacity = "0"
      }
    },
    {
      inAn: function () {
        var five1_list1 = document.querySelector(".five1_list .five1_list1");
        var five1_list2 = document.querySelector(".five1_list .five1_list2");
        var five1_list3 = document.querySelector(".five1_list .five1_list3");
        var five2 = document.querySelector(".five .five2");

        setTimeout(function () {
          five1_list1.style.transform = "translate(0,0)"
        }, 500)
        setTimeout(function () {
          five1_list2.style.transform = "translate(0,0)"
        }, 1000)
        setTimeout(function () {
          five1_list3.style.transform = "translate(0,0)"
        }, 1200)
        setTimeout(function () {
          five2.style.transform = "translate(0,0)"
        }, 1500)
        // five1_list1.style.transform = "translate(0,0)"
        // five1_list2.style.transform =  "translate(0,0)"
        // five1_list3.style.transform =  "translate(0,0)"
        // five2.style.transform =  "translate(0,0)"
      },
      outAn: function () {
        var five1_list1 = document.querySelector(".five1_list .five1_list1");
        var five1_list2 = document.querySelector(".five1_list .five1_list2");
        var five1_list3 = document.querySelector(".five1_list .five1_list3");
        var five2 = document.querySelector(".five .five2");

        five1_list1.style.transform = "translate(1000px,-1000px)"
        five1_list2.style.transform = "translate(1000px,-1000px)"
        five1_list3.style.transform = "translate( 1000px,-1000px)"
        five2.style.transform = "translate( -1000px,-1000px)"

      }
    },
    {
      inAn: function () {
        var six1_list1 = document.querySelector(".six1_list .six1_list1");
        var six1_list2 = document.querySelector(".six1_list .six1_list2");
        var six1_list3 = document.querySelector(".six1_list .six1_list3");
        var six2 = document.querySelector(".six .six2");

        setTimeout(function () {
          six1_list2.style.transform = "translateX(0px)"
        }, 500)
        setTimeout(function () {
          six1_list1.style.transform = "translateY(0px)"
          six1_list3.style.transform = "translateY(0px)"
          six2.style.transform = "translate( 0,0px)"
        }, 1000)
      },
      outAn: function () {
        var six1_list1 = document.querySelector(".six1_list .six1_list1");
        var six1_list2 = document.querySelector(".six1_list .six1_list2");
        var six1_list3 = document.querySelector(".six1_list .six1_list3");
        var six2 = document.querySelector(".six .six2");

        six1_list1.style.transform = "translateY(-1000px)"
        six1_list2.style.transform = "translateX(-1000px)"
        six1_list3.style.transform = "translateY( 1000px)"
        six2.style.transform = "translate( 0,1000px)"
      }
    }
  ]
  //1控制头部导航的背景类
  headerBind();

  function headerBind() {
    for (let i = 0; i < active.length; i++) {
      active[i].onclick = function () {
        //排他思想
        for (let i = 0; i < active.length; i++) {
          active[i].classList.remove("active");
        }
        active[i].classList.add("active");
        
        this_index = i;
        index = i;
        move(index)
      }
    }

    //控制右侧导航点
    for (let i = 0; i < dot.length; i++) {
      dot[i].onclick = function () {
        for (let j = 0; j < dot.length; j++) {
          dot[j].classList.remove("active");
        }
        dot[i].classList.add("active");
        this_index = i;
        index = i;
        move(index)
      }
    }
  }

  Bind();

  //2控制内容区每一屏的高度
  function Bind() {
    content.style.height = document.documentElement.clientHeight - header.clientHeight + "px";
    for (let i = 0; i < contentLis.length; i++) {
      contentLis[i].style.height = document.documentElement.clientHeight - header.offsetHeight + "px";
    }
  }

  //3鼠标滚轮事件
  var timer;
  gunLun1();

  function gunLun1() {
    //2.2鼠标滚轮事件，兼容性
    if (content.addEventListener) {
      content.addEventListener("DOMMousewheel", function (ev) {
        ev = ev || event;
        //每次触发滚轮事件得等200毫秒后才执行，如果同一时间内疯狂滚动滚轮，定时器会来不及执行就被清除了，体验更好.
        //也就是让滚轮事件被频繁触发时，fn函数只执行一次！
        clearTimeout(timer);
        timer = setTimeout(function () {
          //调用兼容鼠标滚轮事件的函数
          fn(ev);
        }, 200)
      })
    }
    content.onmousewheel = function (ev) {
      ev = ev || event;
      //每次触发滚轮事件得等200毫秒后才执行，如果同一时间内疯狂滚动滚轮，定时器会来不及执行就被清除了，体验更好
      clearTimeout(timer);
      timer = setTimeout(function () {
        //调用兼容鼠标滚轮事件的函数
        fn(ev);
      }, 200)
    };

    //兼容性
    function fn(ev) {
      ev = ev || event;
      let dir = "";
      if (ev.wheelDelta) {
        dir = ev.wheelDelta > 0 ? "up" : "down";
      } else if (ev.detail) {
        dir = ev.detail < 0 ? "up" : "down";
      }
      switch (dir) {
        case "up":
          //当this——index小于0，鼠标滚轮继续上滑也没有切换屏
          if (index > 0) {
            index--;
            move(index);
          }
          break;
        case "down":
          //当this——index大于内容区屏幕数，鼠标滚轮继续下滑也没有切换屏
          if (index < contentLis.length - 1) {
            index++;
            move(index);
          }
          break;
      }
    }
  }

  //4控制导航文字跟同步每一屏
  move();

  function move() {
    //同步鼠标滚动到的屏
    ul.style.top = -index * (document.documentElement.clientHeight - header.offsetHeight) + "px";
    //同步文字导航
    for (let i = 0; i < active.length; i++) {
      active[i].className = "";
    }
    active[index].className = "active";
    //同步右侧导航点
    for (let i = 0; i < dot.length; i++) {
      dot[i].className = "";
    }
    dot[index].className = "active";
    console.log(index)
    //切换屏动画
    arrAn[index].outAn();
    setTimeout(function () {
      arrAn[index].inAn();
    }, 1000)
  }

  var homeNode = document.querySelector("#content .list .one .one3");
  home3D();
  function home3D() {
    //保存上一次的索引
    var oldIndex = 0;
    //自动轮播的索引
    //自动轮播定时器
    var timer;
    //自动轮播索引
    var autoIndex = 0;
    var home1LiNodes = document.querySelectorAll("#content .list .one .one3>img");
    var home2LiNodes = document.querySelectorAll("#content .list .one .nav>li")
    //手动轮播
    for (let i = 0; i < home1LiNodes.length; i++) {
      home2LiNodes[i].onclick = function () {
        //当手动点时，关闭自动轮播定时器
        clearInterval(timer);
        for (let j = 0; j < home2LiNodes.length; j++) {
          //清除所有白色小圆点类
          home2LiNodes[j].classList.remove("active");
        }
        //为当前点击的添加白色小圆点类
        home2LiNodes[i].classList.add("active");

        //判断轮播图是  从左往右  根据当前索引大于上一次旧的索引
        if (i > oldIndex) {
          home1LiNodes[i].classList.remove("leftShow");
          home1LiNodes[i].classList.remove("leftHide");
          home1LiNodes[i].classList.remove("rightHide");
          //让当前的图从右边出来显示
          home1LiNodes[i].classList.add("rightShow");

          home1LiNodes[oldIndex].classList.remove("leftShow");
          home1LiNodes[oldIndex].classList.remove("rightShow");
          home1LiNodes[oldIndex].classList.remove("rightHide");
          //让当前的图从左边进去隐藏
          home1LiNodes[oldIndex].classList.add("leftHide");
        }
        //判断轮播图还是 从右往左  根据当前索引小于上一次旧的索引对比
        if (i < oldIndex) {
          home1LiNodes[i].classList.remove("rightHide");
          home1LiNodes[i].classList.remove("leftHide");
          home1LiNodes[i].classList.remove("rightShow");
          //让当前的图从左边出来显示
          home1LiNodes[i].classList.add("leftShow");

          home1LiNodes[oldIndex].classList.remove("leftShow");
          home1LiNodes[oldIndex].classList.remove("rightShow");
          home1LiNodes[oldIndex].classList.remove("leftHide");
          //让当前的图从右边进去隐藏
          home1LiNodes[oldIndex].classList.add("rightHide");
        }
        //让旧的索引等于当前点击的索引
        oldIndex = i;
        /*如果点击完，需要重新开启定时器，则需要以下代码
        1告诉导航点，当前是显示那一个屏的， 手动轮播 去同步 自动轮播
        autoIndex = i;
        2重新调用
        ziDong3D();
         */
        autoIndex = i;
        ziDong3D();
      }
    }

    ziDong3D();

    //自动轮播
    function ziDong3D() {
      clearInterval(timer);
      //自动轮播图，从左外右
      timer = setInterval(function () {
        autoIndex++;
        //1无痕轮播
        if (autoIndex === home1LiNodes.length) {
          autoIndex = 0;
        }
        //2同步导航点
        for (let i = 0; i < home2LiNodes.length; i++) {
          home2LiNodes[i].classList.remove("active");
        }
        home2LiNodes[autoIndex].classList.add("active");
        //3同步轮播切换图
        home1LiNodes[autoIndex].classList.remove("leftShow");
        home1LiNodes[autoIndex].classList.remove("leftHide");
        home1LiNodes[autoIndex].classList.remove("rightHide");
        //让当前的图从右边出来显示
        home1LiNodes[autoIndex].classList.add("rightShow");

        home1LiNodes[oldIndex].classList.remove("leftShow");
        home1LiNodes[oldIndex].classList.remove("rightShow");
        home1LiNodes[oldIndex].classList.remove("rightHide");
        //让当前的图从左边进去隐藏
        home1LiNodes[oldIndex].classList.add("leftHide");

        //4让自动轮播 同步 手动轮播的 索引
        oldIndex = autoIndex;
      }, 3000)

    }

    //控制移入事件mouseenter
    homeNode.onmouseover = function () {
      clearInterval(timer)
    }
    //控制移出事件mouseleave
    homeNode.onmouseleave = function () {
      ziDong3D()
    }

  }
}