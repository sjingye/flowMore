"use strict";

//顶部的轮播图
$(function () {
    reloadBannerHeight();
    function reloadBannerHeight() {
        var bannerHeight = $(".swiper-slide").height();
        $(".swiper-wrapper").height(bannerHeight);
    };
    var bannerSwiper = new Swiper('.swiper-container', {
        loop: true,
        autoplay: 3000,
        speed: 500,
        // 分页器
        pagination: '.swiper-pagination',
        grabCursor: true,
        paginationClickable: true
        // 前进后退按钮
        /*nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',*/
    });
    $(window).resize(function () {
        reloadBannerHeight();
    });
});

//DOM
var $topGuides = $(".top-guide ul li"); //dom:顶部的按钮
var $news = $(".container ul"); //dom:下面对应的四个ul

var index = 0;
//点击顶部的导航栏，切换显示
$topGuides.click(function () {
    tabNews($(this));
});

function tabNews(curr) {
    index = $topGuides.index(curr) || 0;
    curr.addClass('active').siblings('li').removeClass('active');

    var $currNews = $news.eq(index);
    $currNews.addClass('active').siblings('ul').removeClass('active');

    return index;
}
//根据page得到的数据接口
var userUrl = "https:/api//";
//根据估值历史的id得到的估值历史数据
var itemUrl = "https:/api//";
//根据后台返回的数据总条数得出页数
var getPageNum = function getPageNum(count, itemLength) {
    return Math.ceil(parseInt(count) / parseInt(itemLength));
};

//根据后台返回的数据得到innerHTML
function packagData(data) {
    var html = "";
    for (var i = 0; i < data.page.length; i++) {
        html += "<li>\n                    <a href=" + data.page[i].href + ">\n                        <img src=\"./images/\"+" + data.page[i].src + "  alt=\"\u65B0\u95FB\u680F\u56FE\u7247\">\n                        <div>\n                            <h3>" + data.page[i].title + "</h3>\n                            <p>\n                                " + data.page[i].content + "\n                            </p>\n                            <p class=\"date\">\n                                \u53D1\u5E03\u65F6\u95F4\uFF1A\n                                <span>" + data.page[i].date + "</span>\n                            </p>\n                        </div>\n                    </a>\n                </li>";
    }
    return html;
}

function paginator(curr) {
    var pageSize = 4;
    $.getJSON(userUrl, {
        item: index || 0,
        pageSize: pageSize, //向服务端传的一页的信息条数
        page: curr || 1 //向服务端传的当前页面
    }, function (data) {
        var count = data.count; //对应的新闻内容总数
        var pageNum = getPageNum(count, pageSize); //总共的页数
        var $currUL = $news.eq(index); //dom:当前处于显示状态的ul
        var resultHtml = packagData(data);
        $currUL.html(resultHtml);
        //显示分页
        laypage({
            cont: 'paginate-container', //容器
            pages: getPageNum(count, pageSize), //通过后台拿到的总页数
            curr: curr || 1, //当前页
            skin: '#F5674B',
            first: 1, //将首页显示为数字1,若不显示，设置false即可
            last: pageNum, //将尾页显示为总页数。若不显示，设置false即可
            prev: '上一页', //若不显示，设置false即可
            next: '下一页', //若不显示，设置false即可
            jump: function jump(obj, first) {
                //触发分页后的回调
                if (!first) {
                    //点击跳页触发函数自身，并传递当前页：obj.curr
                    paginator(obj.curr);
                }
            }
        });
    }); //end function
};

$(function () {
    paginator();
});