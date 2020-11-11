console.log("desc详情页加载成功");

require.config({
    paths:{
        jquery:"jquery-1.11.3",
        "jquery-cookie":"jquery.cookie",
        goodsList:"goodsList",
        slide:"slide",
        detail:"detail",
        goodsDesc:"goodsDesc"
    },
    shim:{
        "jquery-cookie":["jquery"]
    }
});



require(["goodsList","slide","detail","goodsDesc"],function (goodsList,slide,detail,goodsDesc) {  
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



    