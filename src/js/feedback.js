$(function () {
    $('input[type="text"], textarea').placeholder();
});

//提示框里的信息
var message = [{
    default: "请输入姓名",
    wrong: "格式不正确",
    isRight: "false"
}, {
    default: "请输入电话",
    wrong: "格式不正确",
    isRight: "false"
}, {
    default: "请输入邮箱",
    wrong: "格式不正确",
    isRight: "false"
}, {
    default: "请留言",
    wrong: "格式不正确",
    isRight: "false"
}];

//dom
var $messageInp = $(".message-input"); //dom：可输入的文本
var $reminds = $(".customer-remind li"); //dom：右边的提示框
var $submit = $(".submit"); //dom：提交按钮

//函数：表单验证、过滤
function regValue(ele) {
    var index = 0;
    var val = $.trim($(ele).val());
    var flag = false;
    switch (ele) {
        case $messageInp.get(0):
            flag = /^[\u4e00-\u9fa5a-zA-Z]+$/.test(val);
            index = 0;
            break;
        case $messageInp.get(1):
            flag = /^1[34578]\d{9}$/.test(val);
            index = 1;
            break;
        case $messageInp.get(2):
            flag = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(val);
            index = 2;
            break;
        case $messageInp.get(3):
            flag = /^[\u4e00-\u9fa5a-zA-Z]+$/.test(val);
            index = 3;
            break;
    }
    
    if (flag) {
        $reminds.eq(index).removeClass().addClass("message-input right").html("");
        message[index].isRight = "true";
    } else {
        $reminds.eq(index).html(message[index].wrong).removeClass().addClass("message-input wrong");
        message[index].isRight = "false";
    }
}

//事件：为所有的输入框添加事件
$messageInp.on({
    focus: function focus() {
        var index = $messageInp.index($(this));
        $reminds.eq(index).removeClass().addClass("message-input focus").html(message[index].default);
    },
    blur: function blur(event) {
        regValue(event.target);
    }
});

//事件：为提交按钮添加事件
$submit.click(function (event) {
    var e = event || window.event;
    e.preventDefault();
    var flag = "false";
    for( var i=0,len=message.length;i<len;i++ ){
        if(message[i].isRight === "false"){
            flag = "false";
            return;
        }
       flag = "true"; 
    }
    if(flag){
        $.ajax({
            type: "POST",
            url: url,
            dataType : json,
            data : $('.section form').serialize(),
            success: function (data) {
                if (data == 1) {
                    return true;
                }
                else {
                    $messageInp.val("");
                    $messageInp.eq(0).focus();
                }
            }
        })
    }
});