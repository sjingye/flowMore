"use strict";

$(function () {
    $('input, textarea').placeholder();
});

var $dropDownBox = $(".drop-down-box");
var $dropDownBoxLis = $(".drop-down-box li");
var $feedInInp = $(".feed-in .inp");
var $feedInButton = $(".feed-in a");
var $secLis = $(".main ul li");
var stages = ["初创企业估值", "成长企业估值", "成熟企业估值"];
var urls = ["junior-valuation-stage.html", "senior-valuation-methods.html", "grownup-valuation-methods.html"];

$(function () {
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (elt /*, from*/) {
            var len = this.length >>> 0;
            var from = Number(arguments[1]) || 0;
            from = from < 0 ? Math.ceil(from) : Math.floor(from);
            if (from < 0) from += len;
            for (; from < len; from++) {
                if (from in this && this[from] === elt) return from;
            }
            return -1;
        };
    }
});

$feedInInp.on("focus", function (event) {
    event.stopPropagation();
    $dropDownBox.show();
});

$dropDownBox.click(function (event) {
    event.stopPropagation();
    var $target = $(event.target);
    if ($target.is("li")) {
        $feedInInp.val($target.html());
        $(this).hide();
    }
});

$feedInButton.click(function (event) {
    // event.stopPropagation();
    var val = $.trim($feedInInp.val());
    if (!val || stages.indexOf(val) === -1) {
        return;
    } else {
        //根据val给a标签指定href

        var url = urls[stages.indexOf(val)];
        $feedInButton.attr('href', "./" + url);
    }
});

//为下部分的展示区域加上样式
// $secLis.mouseover(function(event) {
//     /* Act on the event */
//     $(this).siblings().removeClass("over").end().addClass('over');
// });