$(function(){
    //改标题背景图
    var $headerBg = $(".wrap-header em");
    $headerBg.css("background","url(./images/valuation-stage-senior-bg.png) 0 0 no-repeat");

    //改题目
    var $containerTitle = $(".container-title");
    $containerTitle.html("成长阶段估值");

    //改变a标签的指向
    var $as = $(".valuation-methods-list a");

    $as.eq(0).attr("href","./senior-valuation-stage-quick.html");
    $as.eq(1).attr("href","./senior-valuation-stage-professional.html");
});