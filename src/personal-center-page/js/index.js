var $dropDownBox = $(".drop-down-box");
var $dropDownBoxLis = $(".drop-down-box li");
var $feedInInp = $(".feed-in .inp");
var $feedInInpButton = $(".feed-in .inp-button");

$feedInInp.on("focus",function(){
	$dropDownBox.show();
});

$dropDownBox.click(function(event){
	var $target = $(event.target);
	if( $target.is("li") ) {
	    $feedInInp.val($target.html());
	    $(this).hide();
	}
});

$feedInInpButton.click(function(){
	var val = $.trim($feedInInp.val());
	if(!val){
		return
	}
	//根据val跳转
	// window.location.href = val + ""
})