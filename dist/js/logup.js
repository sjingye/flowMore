"use strict";

$(function () {
    $('input, textarea').placeholder();
});

//提示框里的信息
var message = {
    "logup-inp-phone": {
        default: "请输入中国大陆手机号",
        wrong: "手机号格式不正确",
        isRight: "false"
    },
    "logup-inp-identifying-code": {
        default: "请输入验证码",
        wrong: "验证码格式不正确",
        isRight: "false"
    },
    "logup-inp-phone-code": {
        default: "请输入手机验证码",
        wrong: "手机验证码格式不正确",
        isRight: "false"
    },
    "logup-inp-code": {
        default: "长度为4到16个字符，支持大小写字母、数字，不允许有空格",
        wrong: "密码格式不正确",
        isRight: "false"
    },
    "logup-inp-code-qy": {
        default: "请输入与上次相同的密码",
        wrong: "两次密码不一致",
        isRight: "false"
    }
};

//dom
var $logupInp = $(".form-inline .form-group input[type='text']"); //dom：输入框内的input[type='text']
var $reminds = $(".logup-box ul li"); //dom：右边的提示框
var $loginButton = $(".logup-box .logup-button"); //dom：注册按钮
var classnames = ["logup-inp-phone", "logup-inp-identifying-code", "logup-inp-phone-code", "logup-inp-code", "logup-inp-code-qy"];

//函数：表单验证、过滤
function regValue(classname) {
    var $text = $("." + classname);
    var $remind = $("#" + classname + "-remind");
    var val = $.trim($text.val());
    var flag = false;

    switch (classname) {
        case classnames[0]:
            flag = /^1[34578]\d{9}$/.test(val);
            break;
        case classnames[1]:
            // flag = checkidcode();
            flag = true;
            break;
        case classnames[2]:
            flag = /^\d{4}$/.test(val);
            break;
        case classnames[3]:
            flag = /^[A-Za-z0-9]{4,16}$/.test(val);
            break;
        case classnames[4]:
            flag = !!($.trim($logupInp.eq(3).val()) === val);
            break;
    }

    if (flag) {
        $remind.removeClass().addClass("right").html("");
        message[classname].isRight = "true";
    } else {
        $remind.html(message[classname].wrong).removeClass().addClass("wrong");
        message[classname].isRight = "false";
    }
}

//事件：为所有的输入框添加事件
$logupInp.on({
    focus: function focus() {
        var allClass = this.className.split(" ");
        var curClass = classnames[0];
        for (var i = 0; i < allClass.length; i++) {
            if (classnames.indexOf(allClass[i]) != -1) {
                curClass = allClass[i];
            }
        }
        var $remind = $("#" + curClass + "-remind");
        $remind.removeClass().addClass("focus").html(message[curClass].default);
    },
    blur: function blur() {
        var allClass = this.className.split(" ");
        var curClass = classnames[0];
        for (var i = 0; i < allClass.length; i++) {
            if (classnames.indexOf(allClass[i]) > -1) {
                curClass = allClass[i];
            }
        }
        regValue(curClass);
    }
});

//事件：为注册按钮添加事件
$loginButton.click(function (event) {
    var e = event || window.event;
    e.preventDefault();
    var flag = [0, 1, 2, 3, 4].every(function (item, index) {
        return message[index].isRight === "true";
    });
    if (flag) {
        $.ajax({
            type: "POST",
            url: "userLogin.java",
            dataType: 'text',
            data: $('.logup-box form').serialize(),
            success: function success(data) {
                if (data == 1) {
                    // location.href = "index.jsp";
                    return true;
                } else {
                    alert("注册失败");
                    $logupInp.val("");
                    $logupInp.eq(0).focus();
                    return false;
                }
            }
        });
    }
});

//事件：协议的弹出层切换显示
var $aboutLogupAs = $(".about-logup p a"); //dom:可点击标签
var $popupBoxs = $(".popup-box");
var $items = $(".popup-box item");
var $registrationGreement = $(".registration-greement"); //dom:注册协议
var $disclaimer = $(".disclaimer"); //dom:免费申明
var $mask = $(".mask"); //遮罩层
var $closes = $(".popup-box .close");

//事件：点击按钮对应遮罩层显示
$aboutLogupAs.click(function () {
    var index = $aboutLogupAs.index(this);
    $popupBoxs.eq(index).show().siblings().hide();
    $mask.show();
});
//事件：点击遮罩层mask弹出层全部关闭
$mask.click(function (event) {
    event.stopPropagation();
    $mask.hide();
    $popupBoxs.hide();
});
//事件：点击关闭按钮弹出层关闭
$closes.click(function () {
    $(this).parent().parent().hide();
    $mask.hide();
});

//弹出窗内部滚动的时候禁止冒泡
/*$items.scroll(function (event) {
   event.stopPropagation();
})*/