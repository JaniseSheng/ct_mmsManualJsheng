/**
 * Created by janisesheng on 15-7-20.
 */
var wsOtherEvent = (function(){
    //----------------------tabs 切换 (服务条款,隐私条款切换)----------------------------
    //tabsSwitch (tab_name,closename);
    var tabsSwitch = function (tab_name,closename){
            $(tab_name).on('click', function() {
                var $panel = $(this).closest(closename);
                $panel.find(tab_name).removeClass('activ');
                $(this).addClass('activ');
                var panelToShow = $(this).attr('rel');
                $('#'+panelToShow).siblings(".activ").removeClass('activ');
                $('#'+panelToShow).addClass("activ");
                $(".nano").nanoScroller();
            });

    }

    //----------------------help menu点击切换section----------------------------

    //htlp页面中 左侧menu菜单超出屏幕之前固定
    var helpMenuFixed = function (){
        var elm = $('.help-menu');
        var startPos = $(elm).offset().top;

        var scrollY =0; //滚动的定义初始值 默认是0
        $("body").on("update", function(event, values){
            scrollY = values.position;
            $(elm).css('position', ((scrollY) > startPos) ? 'fixed' : 'relative');
            $(elm).css('top', ((scrollY) > startPos) ? '0px' : '');
        });
    }

    //点击menu 滚动切换section的内容
    var helpSectionScroll = function (){
        //初始获取每个section离顶部的距离
        var sectionTop = [] ;
        $(".help-menu ul li").each(function(i){
            sectionTop[i]=$("#section"+i+"").offset().top;
            $(".help-list").eq(i).attr("date_Y", sectionTop[i]);
        });

        sectionTop[0]=sectionTop[0]-90;
        $(".help-list").eq(0).attr("date_Y", sectionTop[0]);

        $(".help-list").click(function () {
            var sectionTop =$(this).attr("date_Y");
            $('#ws-container').animate({scrollTop: sectionTop});
        });

        $(".scrolltop").click(function () {
            $('#ws-container').animate({scrollTop: "0"});
        });
    }

    //获取vedio的长度和宽度
    var getVedioClient = function(){
        var str= {
            width:"",
            height:""
        }
        str.width=$(".w-container .vedio").innerWidth();
        str.height=$(".w-container .vedio").innerHeight();

        return str;
    }

    return {
        tabsSwitch:tabsSwitch,
        helpMenuFixed:helpMenuFixed,
        helpSectionScroll:helpSectionScroll,
        getVedioClient:getVedioClient
    }
})();

