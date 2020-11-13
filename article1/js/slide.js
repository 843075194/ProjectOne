define(['animate', 'jquery'], function (animate, $) {

    //getFullYear() 年
    //getMonth()月  0 代表一月份，1 代表二月份
    //getDate()日  返回一个1 到 31的整数值
    //getDay() 天，返回一周的第几天，0 表示星期天。
    //getHours()时
    //getMinutes()分
    //getSeconds()秒
    //getMilliseconds() 毫秒

    //定时器倒计时，每天14:00开枪，每天22:00开枪
    function countDown() {
        //当前时间
        var nowDate = new Date();
        var hour = nowDate.getHours();
        var date = nowDate.getDate();
        //这个要获取的是设置后的时间，推迟时间
        var afterDate = new Date();

        //计算倒计时时间间隔
        if (hour < 14) {
            afterDate.setHours(14);
            $('.p-trap-wrap .timestr span').eq(1).html("14:00 场");
            // $("#containerbox").find('.p-trap-wrap .timestr span').eq(1).html("14:00 场");
        } else if (hour >= 14 && hour < 22) {
            afterDate.setHours(22);
            $('.p-trap-wrap .timestr span').eq(1).html("22:00 场");
            // $("#containerbox").find('.p-trap-wrap .timestr span').eq(1).html("22:00 场");
        } else {
            $('.p-trap-wrap .timestr span').eq(1).html("明日14:00 场");
            // $("#containerbox").find('.p-trap-wrap .timestr span').eq(1).html("明日14:00 场");
            afterDate.setHours(14);
            afterDate.setDate(date + 1);
        }
        afterDate.setMilliseconds(0);
        afterDate.setSeconds(0);
        afterDate.setUTCMilliseconds(0);

        //计算倒计时总秒数
        //设置后的时间 - 当前的时间  得出倒计时的总秒数
        var count = parseInt((afterDate.getTime() - nowDate.getTime()) / 1000);
        var aSpans = $('.p-trap-wrap .countdown span');

        var timer = setInterval(function () {
            count--;
            //doubleNum是下面写的函数
            aSpans.eq(4).html(doubleNum(count % 60));
            aSpans.eq(2).html(doubleNum(parseInt(count / 60) % 60));
            aSpans.eq(0).html(doubleNum(parseInt(count / 3600) % 24));
            if (count == 0) {
                clearInterval(timer);
                $('.p-trap-wrap .timestr span').eq(1).html("本次活动结束,敬请期待~");
                // $("#containerbox").find('.p-trap-wrap .timestr span').eq(1).html("本次活动结束,敬请期待~");

            }
        }, 1000)
    }
    function doubleNum(num) {
        if (num < 10) {
            return "0" + num;
        } else {
            return num;
        }
    }

    /* 专属推荐获取数据 */
    function categorydownload() {
        $.ajax({
            type: "get",
            url: "../data/daily.json",
            success: function (arr) {
                console.log(arr);
                var str = ``;
                for (var i = 0; i < arr.length; i++) {
                    str += `
                   <div class="swiper-slide">
                        <div class="m-goods-pro-tag-con">2色可选</div>
                        <div class="category-img-container">
                            <div class="product-img">
                                <div class="m-product-image-container">
                                    <div class="img-container">
                                        <img src="${arr[i].images}" alt="">
                                    </div>
                                </div>
                            </div>
                            <p class="pro-desc">${arr[i].name}</p>
                        </div>

                        <div class="bigtrap-box">
                            <div class="m-goods-common-tag-con">
                                <span class="common-tag-text">${arr[i].span1}</span>
                                <span class="common-tag-text">${arr[i].span2}</span>
                            </div>
                            <p class="pro-info">${arr[i].expatiate}</p>
                            <p class="pro-price">
                                <span class="pro-unit">¥</span>
                                <span class="m-num">${arr[i].price}</span>
                                <span class="pro-flag">起</span>
                            </p>
                        </div>
                    </div>
                    `
                }
                $('.h-category-sec').find('.pro-item-category').html(str);

            },
            error: function (msg) {
                console.log(msg);
            }
        })
    }

    /*      固定侧边导航列    */
    // function returntop() { 
    //     var timer;
    //     window.onscroll = function () {
    //     var top = document.body.scrollTop || document.documentElement.scrollTop;
    //     var returntop = document.querySelector('.texttop');
    //     returntop.onclick = function () {
    //         timer = setInterval(function () {
    //             console.log(top);
    //            var speed = Math.ceil(top/10);
    //            if (top<=0) {
    //                clearInterval(timer)
    //            }
    //            document.body.scrollTop=top-speed;
    //          },50)
    //       }
    //     }
    //  }
    //上面这个方法有点卡
    function returntop() {
            $('.m-fixedBar li').eq(4).on('click',function () {
               var timer = setInterval(function () { 
                var top=document.documentElement.scrollTop;
                var speed = Math.ceil(top/10);
                document.documentElement.scrollTop=top-speed;
                },50)
                if(top<=0){
                    clearInterval(timer)
                }
            }, function () { 
                document.documentElement.scrollTop=top;
             })  
            

    }

    return {
        countDown,
        categorydownload,
        returntop
    }

})