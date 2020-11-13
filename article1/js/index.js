//一个模块实现一个块的功能
define(["animate","jquery", "jquery-cookie"], function (animate,$) {
    /* 登陆菜单栏简单切换 */
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
                for (var i = 0; i < arr.length; i++) {
                    $(`
                    <a href="./list.html" class="ban">
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

    /* 轮播图下面的五张图片导入 */
    function navdownload() {
        $.ajax({
            type: "get",
            url: "../data/22.json",
            success: function (arr) {
                console.log(arr);
                for (var i = 0; i < arr.length; i++) {
                    var node = $(`
                    <li>
                        <div>
                            <img src="${arr[i].images}" alt="">
                        </div>
                        <p>${arr[i].name}</p>
                    </li>
                    `)
                    node.appendTo('.p-hreo-nav');
                }
            },
            error: function (msg) {
                console.log(msg);
            }
        })
    }

    /* container 八张图片一张一张切换的 */
    function container() {
        $.ajax({
            type: "get",
            url: "../data/23.json",
            success: function (arr) {
                console.log(arr);
                var str = ``;
                for (var i = 0; i < arr.length; i++) {
                   str += `
                    <div class="swiper-slide">
                        <div class="bigtrap-img-tag-container">
                            <div class="small-item-img">
                                <img src="${arr[i].images}" alt="">
                            </div>
                        </div>
                        <div class="bigtrap-box">
                            <p class="pro-info">${arr[i].name}</p>
                            <p class="pro-price">
                                <span class="pro-unit">¥</span>
                                <span class="m-num">${arr[i].price}</span>
                                <span class="pro-flag">起</span>
                                <span class="market-price">
                                    <span class="pro-unit">¥</span>
                                    <span class="m-num">${arr[i].oldprice}</span>
                                </span>
                            </p>
                        </div>
                    </div>
                    `
                }
                $('.p-trap-wrap').find('.aaa').html(str);
                $('.h-new-sec').find('.swiper-wrapper').html(str);
            },
            error:function (msg) {  
                console.log(msg);  
            }
        })
    }

    function containertab() {
        var num =0;
        var swiper = document.getElementsByClassName('swiper-wrapper aaa')
        $('.swiper-buttonnext1 .a,.swiper-buttonprev1 .b').on("click", function () {
             if(this.className == "iconfont a"){
                 num--;
             }else{
                 num++;
             }
             //console.log(num); 
             if(num <=0){
                num=0;
                $(".p-trap-wrap .swiper-buttonnext1 span,.p-trap-wrap .swiper-buttonprev1 span").css('color','gray');
                $(".p-trap-wrap .swiper-wrapper").css('left',0);

             }else if(num >=4){
                num=4;
                $(".p-trap-wrap .swiper-buttonnext1 span,.p-trap-wrap .swiper-buttonprev1 span").css('color','gray')
             }else{
                $(".p-trap-wrap .swiper-wrapper").css('left',-num*271)
                $(".p-trap-wrap .swiper-buttonnext1 span,.p-trap-wrap .swiper-buttonprev1 span").css('color','white')

             }
             console.log(num); 
        });
    }
        function containertab1() {
            var num =0;
            var swiper = document.getElementsByClassName('swiper-wrapper aaa')
            $('.swiper-buttonnext1 .c,.swiper-buttonprev1 .d').on("click", function () {
                 if(this.className == "iconfont c"){
                     num--;
                 }else{
                     num++;
                 }
                 //console.log(num); 
                 if(num <=0){
                    num=0;
                    $(".h-new-sec .swiper-buttonnext1 span,.h-new-sec .swiper-buttonprev1 span").css('color','gray');
                    $(".h-new-sec .swiper-wrapper").css('left',0);
    
                 }else if(num >=4){
                    num=4;
                    $(".h-new-sec .swiper-buttonnext1 span,.h-new-sec .swiper-buttonprev1 span").css('color','gray')
                    $(".h-new-sec .swiper-wrapper").css('left',-num*271)
                 }else{
                    $(".h-new-sec .swiper-wrapper").css('left',-num*271)
                    $(".h-new-sec .swiper-buttonnext1 span,.h-new-sec .swiper-buttonprev1 span").css('color','white')
    
                 }
                 console.log(num); 
            });
        

      }
      /* 顶部通栏 topnav */
      function topnav() { 
        var navpart = document.querySelector('.nav-part');
        var headerson = document.querySelector('.m-header>div')
        window.onscroll=function(){
            //获取当前滚动距离
           var top1=document.body.scrollTop || document.documentElement.scrollTop;
            // console.log(top1);
            if(top1>577){
                navpart.style.display='block';  
                headerson.className='m-header-fixed';
               /*  $(".nav-arrow-container").on("click",function () {
                    $(this).find('.nav-container').stop().toggle();
                }) */
                 $(".nav-arrow-container").hover(function () {
                $(this).find('#nav-container').stop().slideToggle(500);
        })
            }else{
                navpart.style.display='none';
                headerson.className='';
            }
        }
       }


    return {
        header,
        download,
        navtoggle,
        bannerdownload,
        banner,
        navdownload,
        container,
        containertab,
        download11,
        topnav,
        containertab1
    }

})