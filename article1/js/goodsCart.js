define([
    'jquery',
    'jquery-cookie'
], function ($) {

    function header() {
        $(".top").hover(function () {
            $(this).siblings('.bottom').stop().slideToggle(500);
        })
    }
    header();

    function download() {
        $.ajax({
            method: "get",
            url: "../data/goodsCarList.json",
            success: function (obj) {
                console.log(obj);
                var array = obj.data;
                console.log(array);
                for (let index = 0; index < array.length; index++) {
                    $(`<li class="J_xm-recommend-list span4">    
                    <dl> 
                        <dt> 
                            <a href="#"> 
                                <img src="${array[index].image}"  alt="${array[index].name}"> 
                            </a> 
                        </dt> 
                        <dd class="xm-recommend-name"> 
                            <a href="//item.mi.com/1181300007.html"> 
                                ${array[index].name} 
                            </a> 
                        </dd> 
                        <dd class="xm-recommend-price">${array[index].price}元</dd> 
                        <dd class="xm-recommend-tips">   ${array[index].comments}人好评    
                            <a href="javascript:;" class="btn" style="display: none;" id="${array[index].goodsid}">加入购物车</a>  
                        </dd> 
                        <dd class="xm-recommend-notice">

                        </dd> 
                    </dl>  
                </li>`).appendTo('#J_miRecommendBox .xm-recommend ul')
                }
            },
            error: function (msg) {
                console.log(msg);
            }
        })

    }
    //下方图片划入的时候显示加入购物车，滑出的时候显示原来的图片
    function cartHover() {
        $('#J_miRecommendBox .xm-recommend ul').on("mouseenter", '.J_xm-recommend-list', function () {
            $(this).find('.xm-recommend-tips a').show();
        })
        $('#J_miRecommendBox .xm-recommend ul').on("mouseleave", '.J_xm-recommend-list', function () {
            $(this).find('.xm-recommend-tips a').hide();
        })

        //下面小图实现加入购物车效果
        $('#J_miRecommendBox .xm-recommend ul').on('click', '.xm-recommend-tips .btn', function () {
            
            var id = $(this).attr('id');
            console.log(id);
            var first = $.cookie("goods") == null ? true : false;

            //如果是第一次添加
            if (first) {
                var cookieArr = [{ id: id, num: 1 }];
                $.cookie("goods", JSON.stringify(cookieArr), {
                    expires: 7
                })
            } else {
                var same = false;//假设之前没有添加过
                var cookieStr = $.cookie("goods");
                var cookieArr = JSON.parse(cookieStr);
                for (let index = 0; index < cookieArr.length; index++) {
                    if (cookieArr[index].id == id) {
                        same = true;
                        cookieArr[index].num++;
                        break;
                    }
                }
                if (!same) {
                    var obj = { id: id, num: 1 }
                    cookieArr.push(obj)
                }
                $.cookie("goods", JSON.stringify(cookieArr), {
                    expires: 7
                })
                console.log($.cookie("goods"));
            }
            loadCarData();
        })

    }
    //这一块是合并两个json数据的
    function loadCarData() {

        new Promise(function (resolve, reject) {
            $.ajax({
                method: "get",
                url: "../data/goodsCarList.json",
                success: function (obj) {
                    // console.log(obj);
                    resolve(obj.data);
                    //resolve调用的是then这个函数
                    //也就是说从resolve这里就调到了then那里
                },
                error: function (msg) {
                    reject(mag);
                }
            })
        }).then(function (arr1) {
            //then这个地方的函数其实就是上面resolve调用的函数
            //resolve调用的obj.data是实参，then里面的arr1是形参
            //接下来我们下载第二份代码
            return new Promise(function (resolve, reject) {
                console.log(arr1);
                $.ajax({
                    method: "get",
                    url: "../data/goodsList1.json",
                    success: function (arr2) {
                        console.log(arr2);
                        //将arr1和arr2合并
                        var newArr = arr1.concat(arr2);
                        resolve(newArr);
                        console.log(newArr);

                    },
                    error: function (msg) {
                        console.log(msg);
                    }
                })
            })
        }).then(function (arr) {
            //上面这一行表示在执行完function(res){}这个函数后
            //他会返回return new Promise这个函数
            //然后new Promise这个函数就和then方法连起来了
            console.log(arr);
            //现在这个arr是所有商品的信息，list页的和当前页的
            //现在需要通过已经加入购物车的商品，找出这些数据
            //看看哪一些被加载到购物车里了
            //1、在购物车里将所有的数据拿到
            var cookieStr = $.cookie("goods");
            if (cookieStr) {
                var cookieArr = JSON.parse(cookieStr);
                var newArr = [];

                for (let i = 0; i < cookieArr.length; i++) {
                    for (let j = 0; j < arr.length; j++) {
                        if (cookieArr[i].id == arr[j].product_id || cookieArr[i].id == arr[j].goodsid) {
                            //上面这个好比就是拿存储的cookie里面的id来对比查找大数组里面的id
                            //因为前九条，我们插入数据的时候用的是goodsid，
                            //后面十条，我们插入的时候用的是product_id，所以要分别这么写
                            arr[j].num = cookieArr[i].num;
                            //设置商品的id
                            arr[j].id = arr[j].product_id ? arr[j].product_id : arr[j].goodsid;
                            //给能查找到的商品添加这两个信息
                            newArr.push(arr[j]);
                            // console.log(newArr);
                            // /[{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
                            //这是我们现在cookie中的八条数据，
                            //并且这是另外又加了num和id的数据
                        }
                    }
                }
                //现在我们要通过拿到的这八条数据，
                //把购物车内的数据加载到页面上
                //这八条数据就是当前在购物车内的八条数据
                var str = ``;
                for (let i = 0; i < newArr.length; i++) {
                    str += (`
                        <div class="cart-item " id="${newArr[i].id}">
                            <!-- 单选按钮 -->
                            <div class="p-checkbox">
                                <input type="checkbox" name="" id=""  class="j-checkbox">
                            </div>
                            <!-- 图文内容 -->
                            <div class="p-goods">
                                <div class="p-img">
                                     <img src="${newArr[i].image}" alt="${newArr[i].name}"> 
                                </div>
                                <div class="p-msg">${newArr[i].name}</div>
                            </div>
                            <!-- 单价 -->
                            <div class="p-price">￥${newArr[i].price}</div>
                            <!-- 计算数量 -->
                            <div class="p-num">
                                <div class="quantity-form">
                                    <a href="javascript:;" class="decrement">-</a>
                                    <input type="text" class="itxt" value="${newArr[i].num}">
                                    <a href="javascript:;" class="increment">+</a>
                                </div>
                            </div>
                            <!-- 小计 -->
                            <div class="p-sum">￥${(newArr[i].price * newArr[i].num).toFixed(2)}</div>
                            <!-- 删除列 -->
                            <div class="p-action"><a href="javascript:;">删除</a></div>
                        </div>
                   `)
                }
                $(".cart-item-list").html(str)
                //这个地方for循环结束，所有商品根据cookie加载进来
                checkFunc();
               isCheckAll();
            }
          
        })
    }
   
    
    //全选按钮  和  单选按钮添加点击
    function checkFunc() {
        //全选按钮
        $('.checkall').change(function () {
            $('.j-checkbox,.checkall').prop("checked", $(this).prop("checked"));
            isCheckAll()
        })
        //单选按钮
        $('.cart-item-list').on("change", '.j-checkbox', function () {
            //$('.j-checkbox:checked')代表是否选中的个数
            // console.log( $('.checkall').prop("checked"));
            //这句话意思是如果选中的个数等于总个数的话,呢么全选按钮就变为选中状态
            if ($('.j-checkbox:checked').length === $('.j-checkbox').length) {
                $('.checkall').prop("checked", true)
            } else {
                $('.checkall').prop("checked", false)
            }
            isCheckAll()
        })

        //增减商品数量模块  首先声明一个变量，获取当前的商品数量  
        //这个地方是 +  和  -   两个小按钮的操作
        $(".cart-item-list").on('click', '.increment,.decrement', function () {
            var num = $(this).siblings(".itxt").val();
            var id = $(this).parents('.cart-item').attr('id');
            //你要找到当前点击的这个按钮对应的父元素才行
            // var sum = num * price;
            // $(this).parents('.cart-item').find('.p-sum').html(sum);
            var cookieStr = $.cookie("goods");
            var cookieArr = JSON.parse(cookieStr);
            //[{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
            for (let i = 0; i < cookieArr.length; i++) {
                if (cookieArr[i].id == id) {
                    //找到当前的 + 进行操作
                    if (this.className == 'increment') {
                        cookieArr[i].num++;
                        //给商品数量赋值
                        $(this).siblings('.itxt').val(cookieArr[i].num)
                        //取单价
                        var price = $(this).parents('.cart-item').find('.p-price').html().substring(1);
                        //给小计赋值 ，保留两位小数
                        $(this).parents('.cart-item').find('.p-sum').html("￥" + (cookieArr[i].num * price).toFixed(2));
                    } else {
                        cookieArr[i].num == 1 ? alert("数量最少为1") : cookieArr[i].num--;
                        //给商品数量赋值
                        $(this).siblings('.itxt').val(cookieArr[i].num)
                        //取单价
                        var price = $(this).parents('.cart-item').find('.p-price').html().substring(1);
                         //给小计赋值 ，保留两位小数
                        $(this).parents('.cart-item').find('.p-sum').html("￥" + (cookieArr[i].num * price).toFixed(2));
                    }
                    $.cookie("goods", JSON.stringify(cookieArr), {
                        expires: 7
                    })
                }
            }
            // 这里for循环结束
            isCheckAll()
        })

        //注：如果直接在按钮里输入数量，这个地方需要再进行一下处理
        $('.itxt').change(function () {
            console.log(1);
            var cookieStr = $.cookie("goods");
            var cookieArr = JSON.parse(cookieStr);
            var id = $(this).parents('.cart-item').attr('id');
            for (let i = 0; i < cookieArr.length; i++) {
                if (cookieArr[i].id == id) {
                    //这个地方给当前商品在cookie里的数量进行修改
                    //先拿到要修改的值
                    cookieArr[i].num = $(this).val();
                    var price = $(this).parents('.cart-item').find('.p-price').html().substring(1);
                    $(this).parents('.cart-item').find('.p-sum').html("￥" + (cookieArr[i].num * price).toFixed(2));
                    $.cookie("goods", JSON.stringify(cookieArr), {
                        expires: 7
                    })
                }
            }
            isCheckAll()
        })

        //删除按钮
        $('.cart-item-list').on('click', '.p-action', function () {
            //console.log(1);
            var cookieStr = $.cookie("goods");
            var cookieArr = JSON.parse(cookieStr);
            var id = $(this).parents('.cart-item').attr('id');
            for (let i = 0; i < cookieArr.length; i++) {
                if (cookieArr[i].id == id) {
                    cookieArr.splice(i, 1);
                    $(this).parents('.cart-item').remove();
                    break;
                }
            }
            //最后要重新往cookie里存一遍，如果cookie数据没了，呢么就把cookie删掉
            cookieArr.length == 0 ? $.cookie("goods", null) : $.cookie("goods", JSON.stringify(cookieArr), {
                expires: 7
            })
            isCheckAll()
            return false;
        })
        //删除所选的商品
        $('.remove-batch').on('click', function () {
            //console.log(1);
            var cookieStr = $.cookie("goods");
            var cookieArr = JSON.parse(cookieStr);
            var allChecks = $('.cart-item-list').find(".cart-item");
            allChecks.each(function (index, item) {
                //$(item)指的是当前的这一行数据
                if ($(item).find('.j-checkbox').prop('checked')) {
                    var id = $(item).attr('id')
                    for (let i = 0; i < cookieArr.length; i++) {
                        if (cookieArr[i].id == id) {
                            cookieArr.splice(i, 1);
                            $(item).remove();
                            break;
                        }
                    }
                    cookieArr.length == 0 ? $.cookie("goods", null) : $.cookie("goods", JSON.stringify(cookieArr), {
                        expires: 7
                    })
                    isCheckAll()
                }
            })
            if ($('.j-checkbox:checked').length === $('.j-checkbox').length && $('.j-checkbox:checked').length != 0) {
                $('.checkall').prop("checked", true)
            } else {
                $('.checkall').prop("checked", false)
            }
        })
        //全删操作
        $('.clear-all').on('click', function () {
            $('.cart-item-list').empty();
            $.cookie("goods", null);
            $('.j-checkbox,.checkall').prop("checked", false);
            isCheckAll()
        })

        
    }

    /* ---------------------------------------------- */
    //amount-sum做这个模块，也就是总数量及总计模块
    function isCheckAll() {
        var allChecks = $('.cart-item-list').find(".cart-item ");
        var total = 0;//选中商品的合计金额
        var count = 0;//选中商品的总数量
        // var totalCount = 0;//记录总数
        allChecks.each(function (index, item) {
            //console.log($('.j-checkbox:checked'));
            //这里的item代表每一个allChecks每一行元素
            if ($(item).find('.j-checkbox').prop('checked')) {
                total += parseFloat($(item).find('.p-price').html().substring(1)) * parseFloat($(item).find(".itxt").val());
                count += parseInt($(item).find(".itxt").val());
            }
        })
        $('.amount-sum em').html(count);
        $('.number').html(count)
        $('.price-sum em').html(total.toFixed(2));
    }








    return {
        download: download,
        cartHover: cartHover,
        loadCarData: loadCarData,

    }
});