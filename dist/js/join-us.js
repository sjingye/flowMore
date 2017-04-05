'use strict';

var $recruitingItemHeaders = $(".recruiting-item-header");

$recruitingItemHeaders.click(function () {
    var $parent = $(this).parent();
    $parent.siblings('.recruiting-item').removeClass('active').end().toggleClass("active");
});