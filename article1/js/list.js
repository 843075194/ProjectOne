console.log("加载成功");

require.config({
    paths:{
        jquery: "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",
        goodsList:"goodsList",
        goodsList1:"goodsList1",
    },
    shim:{
        "jquery-cookie": ["jquery"]
    }
});







require(["goodsList","goodsList1"],function (goodsList,goodsList1) {  
    goodsList.header();
    goodsList.download();
    goodsList.navtoggle();
    goodsList.bannerdownload();
    goodsList.banner();
    goodsList.allGoodsTab();
    goodsList.topNavDownload();
    goodsList.topNavTab();
    goodsList1.download();
})