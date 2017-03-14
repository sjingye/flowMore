//DOM
var $rightMenus = $(".wrap .fixInfomation"); //个人中心左侧的ul里的li
var $fixButtons = $(".personal-information ul li em");
// 事件：点击标签切换显示
$fixButtons.click(function(){
    var index = $fixButtons.index(this);
    console.log(index)
    var $curMenu = $rightMenus.eq(index);
    $rightMenus.removeClass('active');
    $curMenu.addClass('active');
})