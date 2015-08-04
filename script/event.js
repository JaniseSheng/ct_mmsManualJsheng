//FastClick
$(function () {
    FastClick.attach(document.body);
});

$(document).ready(function() {
    wsEventScripts.isDevice();
    wsEventScripts.isBrowser();
    //给视频播放按钮加上播放事件
    playHelpsVideo.wsPlayerVideo();
});

var systemDevice ; //0是pc  1手机 2是pad

function SendMail() {
    $("#emilsucc").css("display", "none");
    $("#emailfail").css("display", "none");
    var issave = true;
    if ($("#name").val() != "") {
        $("#name").removeClass("input_border_red");
    } else {
        issave = false;
        $("#name").attr("class", "input_border_red");
    }
    if ($("#email-2").val() != "") {
        $("#email-2").removeClass("input_border_red");
    } else {
        issave = false;
        $("#email-2").attr("class", "input_border_red");
    }
    if ($("#field").val() != "") {
        $("#field").removeClass("input_border_red");
    } else {
        issave = false;
        $("#field").attr("class", "input_border_red");
    }
    if ($("#email").val() != "") {
        $("#email").removeClass("input_border_red");
    } else {
        issave = false;
        $("#email").attr("class", "input_border_red");
    }
    var pattern = /\w@\w*\.\w/;
    if (!pattern.test($("#email").val())) {
        issave = false;
        $("#email").attr("class", "input_border_red");
    }

    if (!issave) {
        return;
    }
    $.ajax({
        type: "POST",
        url: "/Home/SendContactUsEMail",
        data: {
            name: $("#name").val(),
            title: $("#email-2").val(),
            email: $("#email").val(),
            content: $("#field").val(),
        },
        dataType: "json",
        error: function (e)//出错处理
        {
            ErrAlert(e, "操作失败!");
        },
        success: function (data) {

            if (data.IsTrue) {
                $("#name").val("");
                $("#email-2").val("");
                $("#email").val("");
                $("#field").val("");
                $("#emilsucc").css("display", "block");
            }
            else {
                $("#emailfail").css("display", "block");
            }

        }

    });
}


var wsEventScripts = (function(){
//headNaV下拉动画自定义样式
    var imgStype= {
        transtionStypeTop : {
            'transition': 'top 500ms ease-in-out',
            '-webkit-transition': 'top 500ms ease-in-out',
            '-ms-transition': 'top 500ms ease-in-out',
            '-moz-transition': 'top 500ms ease-in-out',
            '-o-transition': 'top 500ms ease-in-out'}
    }
    var featuresTop=1000;

    var displayNavEvent= function (){
        //var windowsHeight =($(window).height())/2;//获取屏幕一半的高度
        featuresTop= $("#features").offset().top;
        console.log(featuresTop);
        if(featuresTop<=10){
            $(".navbar-scroll").css('top','0');
            $(".navbar-scroll .w-container").css('opacity','1');
        }else{
            $(".navbar-scroll").css('top','-68px');
            $(".navbar-scroll .w-container").css('opacity','0');
        }
    }
    //设置Nav下拉自定义动画
    var scrollAddNav = function (){
        $(".navbar-scroll").css(imgStype.transtionStypeTop);
/*        $("#ws-container").scroll(function() {
            displayNavEvent();
        });*/
        var scrollY =0; //滚动的定义初始值 默认是0
        var featuresY = $("#features").offset().top;
        $("body").on("update", function(event, values){
            scrollY = values.position;
           if(scrollY<=featuresY+20){
               $(".navbar-scroll").css('top','-68px');
               $(".navbar-scroll .w-container").css('opacity','0');
           }else{
               $(".navbar-scroll").css('top','0');
               $(".navbar-scroll .w-container").css('opacity','1');
           }
        });
    }

    //设置图片的动画效果
    var addAnimation = function (){
        window.sr = new scrollReveal( config );
    }

    //在手机端的时候,添加link css 样式功能
    var addlink = function (cssname) {
        var head = document.head || document.getElementsByTagName('head')[0],
            style = document.createElement('link');
        style.type = 'text/css';
        style.setAttribute("rel", "stylesheet")
        style.setAttribute("href", cssname);
        head.appendChild(style);
    }

    //当浏览器不是Chrome或safari 时提示浏览器警告

    var addBorwerWarning = function () {
        $("#Browser-low").css("display","block");
    }

    //当浏览器是Chrome或safari 时去除浏览器警告
    var removeBorwerWarning = function () {
        $("#Browser-low").css("display","none");
    }
    //添加手机触摸时间
    var ipoEvent =function () {
        //document.addEventListener('touchstart', touchSatrtFunc, false);
        document.addEventListener('touchmove', touchMoveFunc, false);
        document.addEventListener('touchend', touchendFunc, false);
    }
    //触摸中事件
    var  touchMoveFunc = function (){
        displayNavEvent();
    }

    //触摸结束事件
    var  touchendFunc = function (){
        displayNavEvent();
    }

    var isDevice = function (){
        var deviceSystem = checkDevice_Browser.fastCkeckDevice(); //获取设备类型"pc","mobile","pad"等
        console.log(deviceSystem);
        if(deviceSystem=="pc"){
            $(".survey-screen").css("overflow-y", "hidden");
            wsEventScripts.scrollAddNav();
            wsEventScripts.addAnimation();
            systemDevice=0;
        }
        if(deviceSystem=="mobile"){
            $(".survey-screen").css("overflow-y", "scroll");
            wsEventScripts.addlink("../../css/ws-mobile.css");
            $("#Browser-low").css("display","none");
            //添加手机端触摸事件
            wsEventScripts.ipoEvent();
            systemDevice=1;
        }
        if(deviceSystem=="pad"){
            //wsEventScripts.scrollAddNav();
            systemDevice=2;
        }
    }

    var isBrowser = function (){

        var browserSystem = checkDevice_Browser.fastCheckBrowser();
        console.log(browserSystem);
        if((browserSystem=="chrome")||(browserSystem=="safari")){
            wsEventScripts.removeBorwerWarning();
        }
    }

    //乐视视频加载
    return {
        scrollAddNav:scrollAddNav,
        addlink:addlink,
        addAnimation:addAnimation,
        ipoEvent:ipoEvent,
        addBorwerWarning:addBorwerWarning,
        removeBorwerWarning:removeBorwerWarning,
        isDevice:isDevice,
        isBrowser:isBrowser
    }
})();
