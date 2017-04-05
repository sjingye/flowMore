var $guide = $(".guide");
$(function() {
    //调整窗口大小的时候让guide侧边导航始终随着屏幕移动到固定位置
    resizeL();
    resizeT();
    window.onresize = function() {
        resizeL();
        resizeT();
    };

    function resizeL() {
        var offL = ($(document.body).width() - 1160) / 2;
        if (offL < 0) {
            offL = 0;
        }
        var disX = offL + 10;
        $guide.css("right", disX + "px");
    }

    function resizeT() {
        var offT1 = $(window).height() - $(".footer").height() - parseInt($(".wrap").css("margin-bottom")) - $(".guide").height();
        var offT2 = $(".nav").height() + $(".wrap-header").height();
        var offT = offT2 + 100;
        $guide.css("top", offT + "px");
        $(window).scroll(function() {
            var scrollMax = $(document).height() - $(window).height();
            if ($(document).scrollTop() > scrollMax - offT2 - 50) {
                // $(window).scrollTop(scrollMax - offT2 - 50);
                offT = 50;
            }
            if ($(document).scrollTop() < offT2 + 50) {
                offT = offT2 + 100;
            }
            $guide.css("top", offT + "px");
        });
    }

    //dom
    var $titles = $(".valuation-item");
    var $guideLis = $(".guide ul li a");
    // console.log($titles.eq(0).height())
    $(window).scroll(function() {
        var num = [];
        for (let i = 0, len = $titles.length; i < len; i++) {
            var $currEle = $titles.eq(i);
            if ($currEle.offset().top + $currEle.height() < $(window).scrollTop() + $(window).height() && num.indexOf(i) === -1) {
                num.push(i);
                $guideLis.removeClass("hover");
                $guideLis.eq(num[num.length - 1]).addClass("hover");

            }
        }
    })
});