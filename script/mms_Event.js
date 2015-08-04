/**
 * Created by janisesheng on 15-7-20.
 */

$(document).ready(function() {
    //检测是否使手机 或 pc

});

var markSmallScreen = 0 ; //0是大雨991 1 小于991

var is991=true;
var is992=true;
$(window).resize(function () {          //当浏览器大小变化时
    var clintwidth = document.body.clientWidth;
    if(clintwidth<=991){
        if(is991){
            markSmallScreen=1;
            ismenu=true;
            console.log("1231");
            //manualLoadMenu991();
            mmsEvent.autoLoadMenu();
            is991=!is991;
        }

        is992=true;
    }else{
        if(is992){
            markSmallScreen=0;
            console.log("12322");
           // manualLoadMenu992();
            mmsEvent.autoLoadMenu();
            is992=!is992;
        }
        is991=true;
    }
});


var ismenu = true ;
var mmsEvent = (function(){
    //----------------------help menu点击切换section----------------------------

    //htlp页面中 左侧menu菜单超出屏幕之前固定
    var helpMenuFixed = function (){
        var elm = $('.help-menu');
        var startPos = $(elm).offset().top;

        var scrollY =0; //滚动的定义初始值 默认是0
        $("body").on("update", function(event, values){
            scrollY = values.position;
            console.log(scrollY);
            $(elm).css('position', ((scrollY+70) > startPos) ? 'fixed' : 'relative');
            $(elm).css('top', ((scrollY) > startPos) ? '70px' : '');
        });
    }

    var helpMenuFixedMobile = function (){
        $("#fastMenu").off('click').on('click',function () {
            if(ismenu){
                menuDisplay();
            }else{
                menuNone();
            }
            ismenu=!ismenu;
        });
        $(".help-list,.scrolltop").on('click',function (){
            debugger;
            menuNone();
            ismenu = true ;
        });

    }

    //点击menu 滚动切换section的内容
    var helpSectionScroll = function (){
        //初始获取每个section离顶部的距离
        var sectionTop = [] ;
        var offestTop = 70 ; //偏移量
        $(".help-menu ul li").each(function(i){
            sectionTop[i]=$("#section"+i+"").offset().top-offestTop;
            $(".help-list").eq(i).attr("date_Y", sectionTop[i]);
        });
        console.log(sectionTop);

        sectionTop[0]=sectionTop[0]-90;
        $(".help-list").eq(0).attr("date_Y", sectionTop[0]);

        $(".help-list").off('click').on('click',function () {
            var sectionTop =$(this).attr("date_Y");
            $('#ws-container').animate({scrollTop: sectionTop});
            if(markSmallScreen=="0"){
                menuDisplay();
            }else{
                menuNone();
            }
            ismenu=true;
        });

        $(".scrolltop").off('click').on('click',function () {

            $('#ws-container').animate({scrollTop: "0"});
            if(markSmallScreen=="1"){
                menuNone();
            }else{
                menuDisplay();
            }

            ismenu=true;
        });
    }


    //点击menu切换内容
/*    var helpSectionScroll = function (){
        //获取当前点击的对象
        $(".help-list").click(function () {
            var sectionTop =$(this).attr("rel");
            $(".nano").nanoScroller({ destroy: true });
            $(".nano").nanoScroller({ flashDelay: 1000 });
            $(".nano").nanoScroller({ scrollTo: $('#'+sectionTop)},"100ms");
            $(this).css("color","#2DC530");
        });
        $(".scrolltop").click(function () {
            $(".nano").nanoScroller({ scroll: 'top' });
        });
    }*/

    //自动加载menu
    var autoLoadMenu = function (){
        $("#mmsMenu").html("");
        $("#mmsMenu").load('content/help_menu.html',function(){
            $('#ws-container').animate({scrollTop: "0"},function(){
                if(checkDevice_Browser.fastCkeckDevice()=="pc"){
                    var clintwidth = document.body.clientWidth;
                    if(clintwidth>991){
                        markSmallScreen=0;
                        mmsEvent.helpMenuFixed();
                        mmsEvent.helpSectionScroll();
                    }else{
                        markSmallScreen=1;
                        mmsEvent.helpMenuFixedMobile();
                        mmsEvent.helpSectionScroll();
                    }
                }
                else{
                    markSmallScreen=1;
                    mmsEvent.helpMenuFixedMobile();
                    mmsEvent.helpSectionScroll();
                }
            });


        });
    };



    return {
        helpMenuFixed:helpMenuFixed,
        helpSectionScroll:helpSectionScroll,
        helpMenuFixedMobile:helpMenuFixedMobile,
        autoLoadMenu:autoLoadMenu
    }
})();

var menuDisplay = function (){
    $(".help-menu").css({"opacity":"1",
        "left":"0"});
}
var menuNone = function (){
    $(".help-menu").css({"opacity":"0",
        "left":"-100%"});
}
//手动加载menu
var manualLoadMenu992 = function (){
    $("#mmsMenu").html("");
    $("#mmsMenu").load('content/help_menu.html',function(){
        $('#ws-container').animate({scrollTop: "0"},function(){
            mmsEvent.helpMenuFixed();
            mmsEvent.helpSectionScroll();
        });

    });
};

var manualLoadMenu991 = function (){
    $("#mmsMenu").html("");
    $("#mmsMenu").load('content/help_menu.html',function(){
        $('#ws-container').animate({scrollTop: "0"},function(){
            mmsEvent.helpMenuFixedMobile();
            mmsEvent.helpSectionScroll();
        });

    });
};