"use strict";

$(function () {
    $('input, textarea').placeholder();
});

//提示框里的信息
var message = {
    "old-code": {
        default: "请输入原密码",
        wrong: "密码格式不正确",
        isRight: "false"
    },
    "new-code": {
        default: "长度为4到16个字符，支持大小写字母、数字，不允许有空格",
        wrong: "密码格式不正确",
        isRight: "false"
    },
    "new-code-qy": {
        default: "请输入与上面密码相同的密码",
        wrong: "两次密码不一致",
        isRight: "false"
    }
};

//dom
var $textInp = $(".modify-details-wrap input[type='text']"); //dom：输入框内的input[type='text']
var $reminds = $(".remind li"); //dom：右边的提示框
var $submitButton = $(".submit-button"); //dom：提交按钮
var classnames = ["old-code", "new-code", "new-code-qy"];

//函数：表单验证、提醒、数据交互
function regValue(classname) {
    var $text = $("." + classname);
    var $remind = $("#" + classname + "-remind");
    var val = $.trim($text.val());
    var flag = false;

    switch (classname) {
        case classnames[0]:
            //校验密码是否满足格式要求
            flag = /^[A-Za-z0-9]{4,16}$/.test(val);
            break;
        case classnames[1]:
            //校验用户输入的密码是否满足要求
            flag = /^[A-Za-z0-9]{4,16}$/.test(val);
            break;
        case classnames[2]:
            //校验两次用户输入的密码是否相同
            flag = !!($textInp.eq(1).val() === val);
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