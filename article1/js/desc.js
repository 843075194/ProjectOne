console.log("desc详情页加载成功");

require.config({
    paths:{
        jquery:"jquery-1.11.3",
        "jquery-cookie":"jquery.cookie",
        goodsList:"goodsList",
        slide:"slide",
        detail:"detail",
        goodsDesc:"goodsDesc",
        index:"index",
        parabola:'parabola'
    },
    shim:{
        //设置依赖关系  先引入jquery.js  然后在隐去jquery-cookie
        "jquery-cookie": ["jquery"],
        //声明当前模块不遵从AMD
        "parabola": {
			exports: "_"
		}
    }
});



require(["goodsList","slide","detail","goodsDesc","index"],function (goodsList,slide,detail,goodsDesc,index) {  
    goodsList.topNavDownload();
    goodsList.topNavTab();
    goodsList.download();
    goodsList.navtoggle();
    goodsList.allGoodsTab();
    goodsDesc.download();
    goodsDesc.bannermain();
    goodsDesc.shopping();
    //goodsDesc.add();
    //detail.magnifyingglass();
})



    