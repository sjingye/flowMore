//提示框里的信息
var message = [
    {
        wrong:"手机号码格式不正确",
        isRight: "false"
    },
    {
        wrong:"密码格式不正确",
        isRight: "false"
    }
];

//dom
var $loginInp = $(".login-box form input");     //dom：输入框内的input
var $reminds = $(".login-banner-wrap ul li");     //dom：右边的提示框
var $loginButton = $(".login-box .login-button");   //dom：登录按钮

//函数：表单验证、过滤
function regValue(num) {
    var $text = $("#login-inp-"+num);
    var $remind = $("#remind-"+num);
    var val = $.trim($text.val());
    var flag = false;

    switch(parseInt(num)){
        case 0:
            flag = /^1[0-9]{10}$/.test(val);
            break;
        case 1:
            flag = /^[A-Za-z0-9]{4,16}$/.test(val);
            break;
    }

    if(flag){
        message[num].isRight = "true";
    }
    else{
        $remind.html( message[num].wrong).css("visibility","visible");
        message[num].isRight = "false";
    }
}

//事件：为所有的输入框添加事件
for(let i=0,len=$loginInp.length;i<len;i++){
    $loginInp.eq(i).on({
        focus: function(){
            $reminds.eq(i).css("visibility","hidden");
        },
        blur: function(){
            regValue(i);
        }
    })
}

//事件：为登录按钮添加事件
$loginButton.click(function (event) {
    let e = event || window.event;
    e.preventDefault();
    let flag = [0,1].every(function (item,index) {
        return message[index].isRight === "true";
    })
    if(flag){
        $.ajax({
            type: "POST",
            url: "userLogin.java",
            dataType : 'text',
            data : $('.login-box form').serialize(),
            success: function (data) {
                if (data == 1) {
                    // location.href = "index.jsp";
                    return true;
                }
                else {
                    alert("登入失败，用户名或密码错误！");
                    $loginInp.eq(0).val("").focus();
                    $loginInp.eq(1).val("");
                    return false;
                }
            }
        })
    }
});
