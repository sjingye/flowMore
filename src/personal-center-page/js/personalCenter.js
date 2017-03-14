//DOM
var $fixInfomations = $(".wrap .fixInfomation");   //个人中心右侧的修改栏目，默认隐藏
var $fixButtons = $(".personal-information ul li em"); //个人中心右侧的修改按钮

// 事件：点击标签切换显示
$fixButtons.click(function(){
    var index = $fixButtons.index(this);
    $fixInfomations.hide();
    $fixInfomations.eq(index).show();
})