"use strict";

var $guide = $(".guide");
$(function () {
    //调整窗口大小的时候让guide侧边导航始终随着屏幕移动到固定位置
    var disX = ($(document.body).width() - 1160) / 2 + 10;
    $guide.css("right", disX + "px");
    window.onresize = function () {
        disX = ($(document.body).width() - 1160) / 2 + 10;
        $guide.css("right", disX + "px");
    };
});