var $viewDetailLis = $(".soft-competitiveness ul li");     //dom:竞争力下部的点击按钮li
var $viewDetailUl = $(".soft-competitiveness ul");          //dom:竞争力下部的点击ul
var $mask = $(".mask")              //dom:遮罩层
var $popups = $(".pop-up")              //dom:弹出层

//利用事件委托绑定点击事件，弹出框出现,显示对应的内容
$viewDetailUl.click(function(event){
    var $target = $(event.target);
    if($target.is("li") && $target.hasClass('active')){
        var index = $viewDetailLis.index($target);
        var $popup = $popups.eq(index);                 //dom:出现的对应的弹出框
        var $popUpHeaderClose = $popup.find("p span");      //dom:出现的弹出框的标题里的关闭按钮
        $popup.show();
        $mask.show();
        $popUpHeaderClose.click(function(event){
            event.stopPropagation();
            $mask.hide();
            $popup.hide();
        })  
        $mask.click(function(event){
            event.stopPropagation();
            $mask.hide();
            $popup.hide();
        });
    };
});
