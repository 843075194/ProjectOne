console.log("加载成功111");
/*
  配置要引入的模块的路径 jquery也遵从AMD规范
*/
require.config({
  paths: {
    jquery: "jquery-1.11.3",
    "jquery-cookie": "jquery.cookie",
    index: "index",
    animate:'animate',
    slide:'slide'
  },
  //jquery-cookie 是依赖于jquery开发
  shim: {
    //设置依赖关系
    "jquery-cookie": ["jquery"],
    "animate": {
			exports: "_"
    }
  }
});


/*
  好处：模块和模块之间的关系清晰，所以的代码的，其中一个模块有问题，其他代码不受影响。
*/
require(["index","slide"], function(index,slide){
 index.header();
 index.download();
 index.navtoggle();
 index.bannerdownload();
 index.banner();
 index.navdownload();
 index.container();
 index.containertab();
 index.containertab1();
 index.download11();
 index.topnav();
 slide.countDown();
 slide.categorydownload();
 slide.returntop();
 
})
