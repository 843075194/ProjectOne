window.onload = function () {
    //吸顶效果
    window.addEventListener('scroll', function () {
        let t = $('body, html').scrollTop();   // 目前监听的是整个body的滚动条距离
        if (t > 0) {
            $('.sub-nav').addClass('sub-nav-active')
        } else {
            $('.sub-nav').removeClass('sub-nav-active')
        }
    })

    //放大镜
    $(function () {
        //让遮罩层移入的时候显示，移出的时候隐藏
        $("#small").mouseenter(function () {
            $("#mark,#big").show();
        }).mouseleave(function () {
            $("#mark,#big").hide();
            //鼠标移动的时候让遮罩层跟着移动，
        }).mousemove(function (ev) {
            //改变遮罩层的位置
            //遮罩层当前距左的位置=鼠标移动的位置-遮罩层距左的距离-遮罩层一半的长度（为了鼠标在遮罩层的中间）
            var l = ev.pageX - $(this).offset().left - 50;
            if (l <= 60) {
                l = 60;
            }
            //150是指#small宽250-遮罩层的100
            if (l >= 200) {
                l = 200;
            }
            //遮罩层当前距上的位置=鼠标移动的位置-遮罩层距上的距离-遮罩层一半的长度（为了鼠标在遮罩层的中间）
            var t = ev.pageY - $(this).offset().top - 50;
            if (t <= 0) {
                t = 0;
            }
            //265是指#small高365-遮罩层的100
            if (t >= 265) {
                t = 265;
            }
            $("#mark").css({
                left: l,
                top: t
            })

            //让big下面的图片，反方向，对应倍数移动
            $("#big img").css({
                left: -2 * l,
                top: -2 * t
            })
        })



    });

    //侧边栏固定滚动效果
    $(document).ready(function () {
        $(window).scroll(function () {
            var top = $(document).scrollTop();          //定义变量，获取滚动条的高度
            var menu = $("#menu");                      //定义变量，抓取#menu
            var items = $(".p-content").find(".item");    //定义变量，查找.item

            var curId = "";                             //定义变量，当前所在的楼层item #id 

            items.each(function () {
                var m = $(this);                        //定义变量，获取当前类
                var itemsTop = m.offset().top;        //定义变量，获取当前类的top偏移量
                if (top > itemsTop - 100) {
                    curId = "#" + m.attr("id");
                } else {
                    return false;
                }
            });

            //给相应的楼层设置cur,取消其他楼层的cur
            var curLink = menu.find(".cur");
            if (curId && curLink.attr("href") != curId) {
                curLink.removeClass("cur");
                menu.find("[href=" + curId + "]").addClass("cur");
            }
            // console.log(top);
        });
    });

    // 侧边栏距离底部距离700时隐藏
    window.addEventListener('scroll', function () {
        let t = $('body, html').scrollTop();
        var doc = document,
            win = window,
            $ScrollBottom = $(doc).height() - $(win).height() - $(win).scrollTop();
        if ($ScrollBottom < 700) {
            $(".sidebar").css("display", 'none');
        } else {
            $(".sidebar").css("display", 'block');
        }

    })


    //  3.中间手机模块，颜色切换
    $(function () {
        $(".bx-pager a").each(function (index) { //带参数遍历各个选项卡
            $(this).click(function () { //注册每个选卡的单击事件
                $(".bxslider li.tabFocus").removeClass("tabFocus"); //移除已选中的样式
                $(this).addClass("tabFocus"); //增加当前选中项的样式
                //显示选项卡对应的内容并隐藏未被选中的内容
                $(".bxslider li:eq(" + index + ")").show()
                    .siblings().hide()
                    ;//#menu与#content在html层没有嵌套关联，但因为其ul序列相同，用index值可以巧妙的将两者关联。
            });
        });
    })
    //点击第一个黑色图片的时候
    //坐标改变切换到带文字的图片
    $(".selected-1").click(function () {
        $(this).css({ "background-position": "-8px -205px", "height": "90px", "margin-bottom": "0" });
        //相对应的模块显示
        //其他模块隐藏，图片坐标复原
        $(".selected-2").css({ "background-position": "-71px -0px", "height": "60px", "margin-bottom": "0" });
        $(".selected-3").css({ "background-position": "-131px -0px", "height": "60px", "margin-bottom": "0" });

    })

    //点击第二个的时候
    $(".selected-2").click(function () {
        $(this).css({ "background-position": "-71px -205px", "height": "90px", "margin-bottom": "0" });
        //其他
        $(".selected-1").css({ "background-position": "-8px -0px", "height": "60px", "margin-bottom": "0" });
        $(".selected-3").css({ "background-position": "-131px -0px", "height": "60px", "margin-bottom": "0" });
    })

    //点击第3个的时候
    $(".selected-3").click(function () {
        $(this).css({ "background-position": "-131px -205px", "height": "90px", "margin-bottom": "0" });
        //其他
        $(".selected-1").css({ "background-position": "-8px -0px", "height": "60px", "margin-bottom": "0" });
        $(".selected-2").css({ "background-position": "-71px -0px", "height": "60px", "margin-bottom": "0" });
    })


}

