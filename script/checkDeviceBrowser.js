/**
 * Created by janisesheng on 15-7-18.
 */
var checkDevice_Browser = (function (){
    var DeviceSystem = "PC"; //默认是 pc
    var BrowserSystem = "ie"; //默认是chrome
    var fastCkeckDevice = function () {
        var system = {
            win: false,
            mac: false,
            xll: false,
            ipad: false
        };
        //检测平台
        var p = navigator.platform;
        system.win = p.indexOf("Win") >= 0;
        system.mac = p.indexOf("Mac") >= 0;
        system.x11 = (p == "X11") || (p.indexOf("Linux") >= 0);
        system.ipad = (navigator.userAgent.match(/iPad/i) != null) ? true : false;

        //识别所有win,mac,X11系统,认为是pc端 反之 是手机端  这里是PC端
        if (system.win || system.mac || system.xll) {
            DeviceSystem= "pc" ;

        }
        //手机端 和 平板端
        else {
            //pad端
            if ( system.ipad) {
                DeviceSystem= "pad";
            }
            DeviceSystem = "mobile";
        }

        return DeviceSystem;
    }

    var fastCheckBrowser = function (){
        var userAgent = navigator ? navigator.userAgent.toLowerCase() : "other";
        if(userAgent.indexOf("chrome") > -1){
            BrowserSystem="chrome";
        }
        else if(userAgent.indexOf("safari") > -1){
            BrowserSystem="safari";
        }
        else if(userAgent.indexOf("firefox") > -1){
            BrowserSystem="firefox";
        }
        else if(userAgent.indexOf("msie") > -1){
            BrowserSystem="ie7Low";
        }
        else if(userAgent.indexOf("trident/4.0") > -1){
            BrowserSystem="ie8";
        }
        else if(userAgent.indexOf("trident/5.0") > -1){
            BrowserSystem="ie9";
        }
        else if(userAgent.indexOf("trident/6.0") > -1){
            BrowserSystem="ie10";
        }
        else if(userAgent.indexOf("trident/7.0") > -1){
            BrowserSystem="ie11";
        }

        return BrowserSystem;
    }


    return {
        fastCkeckDevice:fastCkeckDevice,
        fastCheckBrowser:fastCheckBrowser,
        DeviceSystem:DeviceSystem,
        BrowserSystem:BrowserSystem

    }
})();

