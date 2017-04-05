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
    //改变标题内容
    var $containerTitle = $(".container-title");
    $containerTitle.html("初创阶段估值");
    //改变公司基本信息部分的内容
    var $headerTbody = $("#company-base-infomation tbody");
    var str = "<tr>\n                    <td>\n                       <label for=\"\">\u4F01\u4E1A\u540D\u79F0\uFF1A</label> \n                    </td>\n                    <td>\n                        <input type=\"text\" placeholder=\"\u8BF7\u8F93\u5165\u4F01\u4E1A\u540D\u79F0\">\n                    </td>\n                    <td class=\"top-remind\"></td>\n                </tr>\n                <tr>\n                    <td>\n                       <label for=\"\">\u884C\u4E1A\u9009\u62E9\uFF1A</label> \n                    </td>\n                    <td>\n                        <select class=\"\" id=\"\">\n                            <option value=\"bj\">IT</option>\n                            <option value=\"sh\">\u755C\u7267\u4E1A</option>\n                            <option value=\"hz\">\u519C\u4E1A</option>\n                            <option value=\"bj\">\u517B\u6B96\u4E1A</option>\n                            <option value=\"sh\">\u755C\u7267\u4E1A</option>\n                            <option value=\"hz\">\u519C\u4E1A</option>\n                        </select>\n                    </td>\n                    <td></td>\n                </tr>";
    $headerTbody.html(str);
    $('input[type="text"]').placeholder();
});