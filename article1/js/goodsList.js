define(["jquery", "jquery-cookie"], function ($) {

    function header() {
        $(".top").hover(function () {
            $(this).siblings('.bottom').stop().slideToggle(500);
        })
    }

    /* 侧边栏 */
    function download() {
        $.ajax({
            type: "get",
            url: "data/21.json",
            success: function (arr) {
                console.log(arr);
                console.log(arr[0].name);
                for (var i = 0; i < arr.length; i++) {
                    //arr这个数组里有10条数据，然后进行遍历
                    var node = $(`
                    <li class="nav-item">
                        <span class="nav-item-span">${arr[i].name[0]}</span>
                        <span>/</span>
                        <span class="nav-item-span">${arr[i].name[1]}</span>
                        <div class="children clearfix">
                            </div>
                    </li>`)
                    node.appendTo('.nav-container .nav-list');

                    var childArr = arr[i].child;
                    var col = Math.ceil(childArr.length / 6);
                    node.find('.children').addClass("children-col-" + col);
                    for (var j = 0; j < childArr.length; j++) {
                        if (j % 6 == 0) {
                            var newUl = $(
                                `<ul class="children-list children-list-col children-list-col-${parseInt(j / 6)}"></ul>`
                            )
                            newUl.appendTo(node.find('.children'));
                        }
                        $(`<li>
                        <a href="javascript:;">
                            <img src="${childArr[j].img}" alt="">
                            <span>${childArr[j].title}</span>
                        </a>
                    </li>`).appendTo(newUl)
                    }
                }
            },
            error: function (msg) {
                console.log(msg);
            }
        })
    }

    function download11() {
        $.ajax({
            type: "get",
            url: "data/21.json",
            success: function (arr) {
                console.log(arr);
                console.log(arr[0].name);
                for (var i = 0; i < arr.length; i++) {
                    //arr这个数组里有10条数据，然后进行遍历
                    var node = $(".m-header .nav-item").eq(i)
                    var childArr = arr[i].child;
                    var col = Math.ceil(childArr.length / 6);
                    node.find('.children').addClass("children-col-" + col);
                    for (var j = 0; j < childArr.length; j++) {
                        if (j % 6 == 0) {
                            var newUl = $(
                                `<ul class="children-list children-list-col children-list-col-${parseInt(j / 6)}"></ul>`
                            )
                            newUl.appendTo(node.find('.children'));
                        }
                        $(`<li>
                        <a href="javascript:;">
                            <img src="${childArr[j].img}" alt="">
                            <span>${childArr[j].title}</span>
                        </a>
                    </li>`).appendTo(newUl)
                    }
                }
            },
            error: function (msg) {
                console.log(msg);
            }
        })
    }


    /* 侧边栏切换 */
    function navtoggle() {
        $(".nav-list").on("mouseenter mouseleave", '.nav-item', function () {
            $(this).find('.children').stop().slideToggle(500);
        });
    }
    /* 轮播图制作 */
    function bannerdownload() {
        $.ajax({
            type: "get",
            url: "data/2.json",
            success: function (arr) {
                console.log(arr);

                for (var i = 0; i < arr.length; i++) {
                    $(`
                    <a href="javascript:;" class="ban">
                        <img src="${arr[i].images}" alt="">
                    </a>`).appendTo(".banner-box .swiper-wrapper");
                    //加小圆点的
                    var node = $(`<span class="bullet"></span>`);
                    if (i == 0) {
                        node.addClass("active")
                    }
                    node.appendTo(".swiper-pagination");
                }
            },
            error: function (msg) {
                console.log(msg);

            }
        })
    }
    /* 轮播图切换 */
    function banner() {

        var iNow = 0; //当前显示的图片的下标
        var aImgs = null; // 记录图片
        var aBtns = null; //记录小圆圈
        
        var timer = setInterval(function () {
            iNow++;
            tab();
        }, 2500)

        function tab() {
            if (!aImgs) {
                aImgs = $(".swiper-container .swiper-wrapper").find("a");
            }
            if (!aBtns) {
                aBtns = $(".swiper-pagination").find(".bullet");
            }
            //他是先加，然后到了6的话就变成0，然后执行下面的代码
            if (iNow == 6) {
                iNow = 0;
            }
            //图片切换
            aImgs.hide().css("opacity", 0.2).eq(iNow).show().animate({ opacity: 1 }, 500);
            //小圆点按钮的切换
            aBtns.removeClass("active").eq(iNow).addClass("active");
        }

        //添加鼠标移入移出
        $(".swiper-wrapper,.swiper-buttonnext span,.swiper-buttonprev span").mouseenter(function () {
            clearInterval(timer);
        }).mouseleave(function () {
            timer = setInterval(function () {
                iNow++;
                tab();
            }, 2500);
        });

        $(".swiper-pagination").on('click', '.bullet', function () {
            iNow = $(this).index();
            tab();
            //阻止a标签默认行为是return false;
        })

        $(".swiper-buttonnext .iconfont,.swiper-buttonprev .iconfont").on('click', function () {
            // alert('1')
            if (this.className == "iconfont a") {
                // alert(1)
                if (iNow == 0) {
                    iNow = 6;
                }
                iNow--;
            } else {
                iNow++;
            }
            tab();
            console.log(iNow);
        })
    }


    /* 顶部通栏 topnav */
    // function topnav() {
    //     var navpart = document.querySelector('.nav-part');
    //     var headerson = document.querySelector('.m-header>div')
    //     //获取当前滚动距离
    //     $(".nav-arrow-container").on("click", function () {
    //         $(this).find('.nav-container').stop().toggle();
    //     })
    // }


    function allGoodsTab(){
        $(".m-header").on("mouseenter", ".nav-arrow-container", function(){
            $(this).find(".nav-container").css("display", 'block');
        })
        
        $(".m-header").on("mouseleave", ".nav-arrow-container", function(){
            $(this).find(".nav-container").css("display", 'none');
        })
    }

    function topNavDownload(){
        $.ajax({
            url: "../data/topnav.json",
            success: function(data){
                //第三部分实现顶部导航
                var topNavArr = data;
                for(var i = 0; i < topNavArr.length; i++){
                    $(`<li data-index="${i}" class="nav-item">
                        <a href="#" >
                            <span class="text">${topNavArr[i].title}</span>
                        </a> 
                    </li>`).appendTo(".m-header .tab-list");


                    var node = $(`<ul class = 'children-list clearfn' style = "display: ${i == 0 ? 'block' : 'none'}">
                    </ul>`);
                    node.appendTo("#J_navMenu .container")
                    //取出所有的子菜单选项
                    if(topNavArr[i].childs){
                        var childsArr = topNavArr[i].childs;
                        for(var j = 0; j < childsArr.length; j++){
                            $(`<li>
                                <a href="#">
                                    <div class = 'figure figure-thumb'>
                                        <img src="${childsArr[j].img}" alt=""/>
                                    </div>
                                    <div class = 'title'>${childsArr[j].a}</div>
                                    <p class = 'price'>${childsArr[j].i}</p>
                                </a>
                            </li>`).appendTo(node);
                        }
                    }
                }
            },
            error: function(msg){
                console.log(msg);
            }
        })
    }
    
    //顶部导航添加移入移出效果
    function topNavTab(){

        $(".m-header .tab-list").on("mouseenter",".nav-item", function(){
            $(this).addClass("nav-item-active");
            var index = $(this).index();
            $(this).find('a').addClass('link')
            if(index >= 0 && index <= 6){
                $("#J_navMenu").css({display: "block"}).removeClass("slide-up").addClass("slide-down");
                $("#J_navMenu .container").find("ul").eq(index).css("display", 'block').siblings("ul").css("display", "none");                ;
            }
        })
        $(".m-header .tab-list").on("mouseleave", ".nav-item", function(){
            $(this).removeClass("nav-item-active");
            $(this).find('a').removeClass('link')
        })


        //移出的时候取消下拉菜单
        $(".m-header").mouseleave(function(){
            $("#J_navMenu").css({display: "block"}).removeClass("slide-down").addClass("slide-up");
        })

        // $("#J_navMenu").hover(function () {
        //     $(this).find('.nav-item').stop().slideToggle(500);
        // })
    }

    


    return {
        header,
        download,
        navtoggle,
        bannerdownload,
        banner,
        allGoodsTab,
        topNavDownload,
        topNavTab
    }
});