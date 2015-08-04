//htlp页面中 左侧menu菜单超出屏幕之前固定

var zyApp = angular.module("myapp", ["ui.router"])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider
         .when("", "/h")
         .otherwise("/h");
        $stateProvider
         .state("h", {//帮助索引
             url: "/h",
             templateUrl: "/Content/ws/help-center/help-spotlight.html",

         })
         .state("s", {///快速开始
             url: "/s/:index",
             templateUrl: "/Content/ws/help-center/help-content.html",
             controller:"QuickStartCtrl"

         })
         .state("v", {///视频索引
             url: "/v",
             templateUrl: "/Content/ws/help-center/video-tutorials.html",

         }).state("vc", {///视频内容页面
             url: "/vc",
             templateUrl: "/Content/ws/help-center/play-video.html",

         });
    }])
    .controller("QuickStartCtrl", ["$scope", "$location", "$stateParams", function ($scope, $location, $stateParams) {
        $('#ws-container').animate({ scrollTop: "0" },0,function () {
            wsOtherEvent.helpMenuFixed();
            wsOtherEvent.helpSectionScroll();
            var index = $stateParams.index;
            if (index) {
                $("[rel=section" + index + "]").click();
            }
        });
        
    }])