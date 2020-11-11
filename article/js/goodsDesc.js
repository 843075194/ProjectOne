define([
    'detail',
    'slide',
    'jquery',
    'jquery-cookie'
], function (detail, slide, $) {
    //这个函数是为了获取地址后面内容的
    function valueByName(search, name) {
        //name1=value1&name2=value2&name3=value3 
        //start表示开始的索引
        var start = search.indexOf(name + "=");
        //如果是-1说明找不到
        if (start == -1) {
            return null;
        } else {
            var end = search.indexOf("&", start);
            //从start的位置开始寻找&符号
            //end=-1的时候就表示他search寻找的是最后一项
            //所以下标的话就是最后一项的索引了
            if (end == -1) {
                end = search.length
            }
            var str = search.substring(start, end);
            var arr = str.split("=")
            //这一步是[name1,value1]
            //然后我们要拿到value所以取arr[1]
            return arr[1];
        }
    }

    function download() {
        var product_id = valueByName(location.search, "product_id");
        console.log(product_id);
        $.ajax({
            method: "get",
            url: "../data/goodsList.json",
            success: function (arr) {
                console.log(arr);
                //goodsMsg这是从json中找到对应的那一条数据
                var goodsMsg = arr.find(item => item.product_id == product_id);
                console.log(goodsMsg);
                var node = $(`
                 <!-- 预览区域 -->
             <div class="preview_wrap fl">
                <div class="preview_img">


                </div>
                <div class="preview_list">
                    <a href="#" class="arrow_prev"></a>
                    <a href="#" class="arrow_next"></a>
                    <ul class="list_item">
                        

                    </ul>
                </div>
            </div> 
            <!-- 产品详细信息 -->
             <div class="itemInfo_wrap fr">
                <div class="sku_name">
                    ${goodsMsg.name}
                </div>
                <div class="news">
                    ${goodsMsg.product_desc_ext}
                </div>
                <div class="summary">
                    <dl class="summary_price">
                        <dt>价格：</dt>
                        <dd>
                            <p class="pro-price">
                                <span class="pro-unit">¥</span>
                                <span class="m-num">${goodsMsg.price_min}</span>
                                <span class="pro-flag">起</span>
                                <span class="market-price">
                                    <span class="pro-unit">¥</span>
                                    <span class="m-num">${goodsMsg.market_price_max}</span>
                                </span>
                            </p>
                        </dd>
                    </dl>
                    <dl class="summary_promotion p-trap-wrap">
                        <dt ">
                            每日秒杀
                            <span class="timestr">
                                <span class="iconfont">&#xe614;</span>
                                <span>14:00场</span>
                            </span>
                        </dt>
                        <dd class="countdown ">
                            <span class="time-item-home hour">23</span>
                            <span class="m-countdown-dot-home">:</span>
                            <span class="time-item-home minute">23</span>
                            <span class="m-countdown-dot-home">:</span>
                            <span class="time-item-home second">11</span>
                        </dd>
                    </dl>
                    <dl class="summary_support">
                        <dt>详情内容</dt>
                        <dd>以旧换新，闲置手机回收 4G套餐超值抢 礼品购</dd>
                    </dl>
                    <dl class="choose_color">
                        <dt>选择颜色</dt>
                        <dd>
                            <a href="javascript:;" class="current">玫瑰金</a>
                            <a href="javascript:;">金色</a>
                            <a href="javascript:;">白色</a>
                            <a href="javascript:;">土豪色</a>
                        </dd>
                    </dl>
                    <dl class="choose_version">
                        <dt>选择版本</dt>
                        <dd>
                            <a href="javascript:;" class="current">公开版</a>
                            <a href="javascript:;">移动4G</a>
                        </dd>
                    </dl>
                    <dl class="choose_type">
                        <dt>购买方式</dt>
                        <dd>
                            <a href="javascript:;" class="current">官方标配</a>
                            <a href="javascript:;">移动优惠购</a>
                            <a href="javascript:;">电信优惠购</a>
                        </dd>
                    </dl>
                    <div class="choose_btns">
                        <div class="choose_amount">
                            <input type="text" value="1" id="input">
                            <a href="javascript:;" class="add">+</a>
                            <a href="javascript:;" class="reduce">-</a>
                        </div>
                        <a href="javascript:;" class="addcar" id = "${goodsMsg.product_id}">加入购物车</a>
                        <a href="./goodsCar.html" class="viewcar">查看购物车</a>                    </div>
                </div>
            </div>`)
                node.appendTo('#containerbox .product_intro');
                var aImages = goodsMsg.images;
                if (aImages.length == 1) {
                    $(`
                    <img src="${aImages[0]}" alt="" class="picture">
                    <div class="mask"></div>
                    <div class="big">
                        <img src="${aImages[0]}" alt="" class="bigImg">
                    </div>
                    `).appendTo(node.find('.preview_img'));
                    node.find(".preview_list").hide();
                } else {
                    for (let index = 0; index < aImages.length; index++) {
                        //const element = array[index];
                        $(`
                        <li class="abc">
                            <img src="${aImages[index]}" alt="">
                        </li>
                        `).appendTo(node.find('.list_item'));
                        $(`
                        <img src="${aImages[index]}" alt="" class="picture">
                        <div class="mask"></div>
                        <div class="big">
                            <img src="${aImages[index]}" alt="" class="bigImg">
                        </div>
                        `).appendTo(node.find('.preview_img'));
                        //默认让第一个小图片高亮显示
                        if (index == 0) {
                            $('#containerbox').find('.preview_list .list_item .abc').addClass('active');
                        }
                    }
                }
                slide.countDown();
                sc_num();
                detail.magnifyingglass();
                add();
            },
            error: function (msg) {
                console.log(msg);

            }
        })
    }

    //轮播图主题
    function bannermain() {
        var iNow = 0;  //默认让第一张大图片显示
        var aBtns = null;  //获取大图下面的小图片
        var aImgs = null;  //获取所有的图片
        var aBigbox = null;//获取大图片右边大图片的盒子
        var aBigTmgs = null;//获取大图片右边的大图片
        var timer = null; //定时器，轮播图
        $("#containerbox .product_intro").on('mouseover', '.preview_list .list_item .abc', function () {
            iNow = $(this).index();
            bannertab();
            //return false;  如果这里是a标签的话，需要加这句
        })

        timer = setInterval(function () {
            iNow++;
            bannertab();
            aBigbox.hide();
        }, 2000)

        //轮播图的切换
        function bannertab() {
            // console.log(1);
            if (!aImgs) {
                aImgs = $('#containerbox ').find('.preview_img>img');
            }
            if (!aBtns) {
                aBtns = $('#containerbox').find('.preview_list .list_item .abc')
            }
            if (!aBigbox) {
                aBigbox = $('#containerbox').find('.preview_img .big ')
            }
            if (!aBigTmgs) {
                aBigTmgs = $('#containerbox').find('.preview_img .big .bigImg')
            }

            if (aImgs.size() == 1) {
                clearInterval(timer)
            } else {
                if (iNow == 5) {
                    iNow = 0;
                }
            }

            aBtns.removeClass("active").eq(iNow).addClass('active');
            aImgs.hide().eq(iNow).show();
            aBigTmgs.hide().eq(iNow).show();
            aBigbox.hide().eq(iNow).show();

        }

        //添加鼠标移入移出操作
        $('#containerbox').on('mouseenter', '.preview_wrap .preview_img,.arrow_prev,.arrow_next,.list_item .abc', function () {
            clearInterval(timer);
        })
        $('#containerbox').on('mouseleave', '.preview_wrap .preview_img,.arrow_prev,.arrow_next,.list_item .abc', function () {
            timer = setInterval(function () {
                iNow++;
                bannertab();
                aBigbox.hide();
            }, 2000)
        })
        //添加上一张和下一张画面的切换
        $('#containerbox').on('click', '.arrow_prev,.arrow_next', function () {
            if (this.className == 'arrow_prev') {
                iNow--;
                if (iNow == -1) {
                    iNow = 4;
                }
            } else {
                iNow++
            }
            //上面这个主要是判断下标的，
            //然后再通过bannertab轮播图切换的函数进行切换
            bannertab();
            return false;//因为要阻止a标签的默认行为，所以要加这句
        })

    }
    //存储cookie，点击加入购物车操作
    function shopping() {
        sc_num();
        $('#containerbox').on('click', '.addcar', function () {
            var id = this.id
            //alert(id) 获取当前加入购物车按钮的id
            //进行购物车操作   goods为键，json格式字符串为值
            //1、先去判断cookie中是否存在商品信息
            var first = $.cookie("goods") == null ? true : false;
            //2、判断是否是第一次添加
            if (first) {
                //直接创建cookie
                var cookieArr = [{ id: id, num: 1 }];
                $.cookie("goods", JSON.stringify(cookieArr), {
                    expires: 7
                });
            } else {
                var same = false;
                var cookieArr = JSON.parse($.cookie("goods"));
                //3、如果不是第一次添加，判断之前是否添加过
                for (var i = 0; i < cookieArr.length; i++) {
                    if (cookieArr[i].id == id) {
                        same = true;
                        cookieArr[i].num++;
                        break;
                    }
                }
                if (!same) {
                    var obj = { id: id, num: 1 };
                    cookieArr.push(obj)
                }
                //最后存回cookie中
                $.cookie("goods", JSON.stringify(cookieArr), {
                    expires: 7
                });
            }
            console.log($.cookie("goods"));
            sc_num()
            // $("#input").val(cookieArr[index].num);

        })
    }

    function sc_num() {
        var cookieArr = JSON.parse($.cookie("goods"));
        var id = valueByName(location.search, "product_id");
        var sum = 0;
        if (cookieArr) {
            for (let index = 0; index < cookieArr.length; index++) {
                if (cookieArr[index].id == id) {
                    $("#input").val(cookieArr[index].num);
                    $.cookie("goods", JSON.stringify(cookieArr), {
                        expires: 7
                    });
                }
            }
        }
    }
    function add() {
        $('#containerbox').on('click', '.choose_amount a', function () {
            var id = $(this).parent().siblings('.addcar').attr('id');
            // console.log(id);
            //10000150这个id就是
            //var product_id = valueByName(location.search, "product_id");
            var cookieArr = JSON.parse($.cookie("goods"));
            for (let index = 0; index < cookieArr.length; index++) {
                if (cookieArr[index].id == id) {
                    if (this.innerHTML == "+") {
                        cookieArr[index].num++;
                    } else {
                        cookieArr[index].num == 1 ? alert("数量最少为1") : cookieArr[index].num--;
                    }
                    $.cookie("goods", JSON.stringify(cookieArr), {
                        expires: 7
                    });
                }
                // $("#input").val(cookieArr[index].num);
            }
            sc_num();

        })
    }






    return {
        download,
        bannermain,
        shopping,
        add
    }

});