"use strict";

$(function () {
    $('input, textarea').placeholder();
});

//提示框里的信息
var message = {
    "old-phone": {
        default: "请输入原手机号",
        wrong: "手机号格式不正确",
        isRight: "false"
    },
    "verification-code-old": {
        default: "请输入原手机号获取的验证码",
        wrong: "验证码格式不正确",
        isRight: "false"
    },
    "new-phone": {
        default: "请输入新手机号",
        wrong: "手机号格式不正确",
        isRight: "false"
    },
    "verification-code-new": {
        default: "请输入新手机号获取的验证码",
        wrong: "验证码格式不正确",
        isRight: "false"
    }
};

//dom
var $textInp = $(".modify-details-wrap input[type='text']"); //dom：输入框内的input[type='text']
var $reminds = $(".remind li"); //dom：右边的提示框
var $submitButton = $(".submit-button"); //dom：提交按钮
var classnames = ["old-phone", "verification-code-old", "new-phone", "verification-code-new"];

//函数：表单验证、提醒、数据交互
function regValue(classname) {
    var $text = $("." + classname);
    var $remind = $("#" + classname + "-remind");
    var val = $.trim($text.val());
    var flag = false;

    switch (classname) {
        case "old-phone":
            flag = /^1[34578]\d{9}$/.test(val);
            break;
        case "verification-code-old":
            //校验用户输入的验证码与运营商发给用户的是否一样
            flag = /^\d{4}$/.test(val);
            break;
        case "new-phone":
            flag = /^1[34578]\d{9}$/.test(val);
            break;
        case "verification-code-new":
            flag = /^\d{4}$/.test(val);
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
$textInp.on({
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
$submitButton.click(function (event) {
    var e = event || window.event;
    e.preventDefault();
    var flag = classnames.every(function (item, index) {
        return message[index].isRight === "true";
    });
    if (flag) {
        $.ajax({
            type: "POST",
            url: "userLogin.java",
            dataType: 'json',
            success: function success(data) {
                if (data == 1) {
                    // location.href = "index.jsp";
                    return true;
                } else {
                    alert("修改失败");
                    $textInp.val("");
                    $textInp.eq(0).focus();
                    return false;
                }
            }
        });
    }
});