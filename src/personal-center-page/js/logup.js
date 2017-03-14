//提示框里的信息
let message = [
    {
        default: "请输入中国大陆手机号",
        wrong:"手机号格式不正确",
        isRight: "false"
    },
    {
        default: "请输入验证码",
        wrong:"验证码不正确",
        isRight: "false"
    },
    {
        default: "",
        wrong:"手机验证码不正确",
        isRight: "false"
    },
    {
        default: "长度为4到16个字符，支持大小写字母、数字和标点符号，不允许有空格",
        wrong:"密码格式不正确",
        isRight: "false"
    },
    {
        default: "请输入与上次相同的密码",
        wrong:"密码不相同",
        isRight: "false"
    }
];


//dom
var $logupInp = $(".form-inline .form-group input[type='text']");     //dom：输入框内的input[type='text']
console.log($logupInp.length)
var $reminds = $(".logup-box ul li");               //dom：右边的提示框
var $loginButton = $(".logup-box .logup-button");   //dom：注册按钮
$(function(){
    $.idcode.setCode();
})

function checkidcode() {
 if($.idcode.validateCode()) {
      return true;
     } else {
      return false;
     }
}
//函数：表单验证、过滤
function regValue(num) {
    var $text = $(".logup-inp-"+num);
    var $remind = $("#remind-"+num);
    var val = $.trim($text.val());
    var flag = false;

    switch(parseInt(num)){
        case 0:
            flag = /^1[34578]\d{9}$/.test(val);
            break;
        case 1:
            flag = checkidcode();
            console.log(flag);
            break;
        case 2:
            flag = true;
            break;
        case 3:
            flag = /^[A-Za-z0-9]{4,16}$/.test(val);
            break;
        case 4:
            flag =  !!($.trim($logupInp.eq(3).val()) === val);
            break;
    }

    if(flag){
        $remind.removeClass().addClass("right").html("");
        message[num].isRight = "true";
    }
    else{
        $remind.html( message[num].wrong).removeClass().addClass("wrong");
        message[num].isRight = "false";
    }
}

//事件：为所有的输入框添加事件
for(let i=0,len=$logupInp.length;i<len;i++){
    $logupInp.eq(i).on({
        focus: function(){
            $reminds.eq(i).removeClass().addClass("focus").html(message[i].default);
        },
        blur: function(){
            regValue(i);
        }
    })
}

//事件：为注册按钮添加事件
$loginButton.click(function (event) {
    let e = event || window.event;
    e.preventDefault();
    let flag = [0,1,2,3,4].every(function (item,index) {
        return message[index].isRight === "true";
    })
    if(flag){
        $.ajax({
            type: "POST",
            url: "userLogin.java",
            dataType : 'text',
            data : $('.logup-box form').serialize(),
            success: function (data) {
                if (data == 1) {
                    // location.href = "index.jsp";
                    return true;
                }
                else {
                    alert("注册失败");
                    $logupInp.val("");
                    $logupInp.eq(0).focus();
                    return false;
                }
            }
        })
    }
});

//事件：协议的弹出层切换显示
var  $aboutLogupAs = $(".about-logup p a");      //dom:可点击标签
var $popupBoxs = $(".popup-box");
var $items = $(".popup-box item")
var $registrationGreement = $(".registration-greement");    //dom:注册协议
var $disclaimer = $(".disclaimer");     //dom:免费申明
var $mask = $(".mask");     //遮罩层
var $closes = $(".popup-box .close");

//事件：点击按钮对应遮罩层显示
$aboutLogupAs.click(function () {
    var index = $aboutLogupAs.index(this);
    $popupBoxs.eq(index).show().siblings().hide();
    $mask.show();
})
//事件：点击遮罩层mask弹出层全部关闭
$mask.click(function(event){
    event.stopPropagation();
    $mask.hide();
    $popupBoxs.hide();
})
//事件：点击关闭按钮弹出层关闭
$closes.click(function(){
   $(this).parent().hide();
   $mask.hide();
})

//弹出窗内部滚动的时候禁止冒泡
$items.scroll(function (event) {
   event.stopPropagation();
})

