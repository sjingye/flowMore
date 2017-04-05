"use strict";

var $guides = $(".top-guide ul li");
var $containers = $(".wrap ul");

$guides.click(function () {
    $(this).siblings().removeClass('active').end().addClass('active');

    var index = $guides.index($(this));
    var $curr = $containers.eq(index);
    $curr.siblings().removeClass('active').end().addClass('active');
});