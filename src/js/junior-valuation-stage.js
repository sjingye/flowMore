var $guide = $(".guide");
$(function(){
    //调整窗口大小的时候让guide侧边导航始终随着屏幕移动到固定位置
    var disX = ($(document.body).width()-1160)/2+10;
    $guide.css("right",disX+"px");
    window.onresize = function(){
        disX = ($(document.body).width()-1160)/2+10;
        $guide.css("right",disX+"px");
    }
    //改变标题内容
    var $containerTitle = $(".container-title");
    $containerTitle.html("初创阶段估值");
    //改变公司基本信息部分的内容
    var $headerTbody = $("#company-base-infomation tbody");
    var str = `<tr>
                    <td>
                       <label for="">企业名称：</label> 
                    </td>
                    <td>
                        <input type="text" placeholder="请输入企业名称">
                    </td>
                    <td class="top-remind"></td>
                </tr>
                <tr>
                    <td>
                       <label for="">行业选择：</label> 
                    </td>
                    <td>
                        <select class="" id="">
                            <option value="bj">IT</option>
                            <option value="sh">畜牧业</option>
                            <option value="hz">农业</option>
                            <option value="bj">养殖业</option>
                            <option value="sh">畜牧业</option>
                            <option value="hz">农业</option>
                        </select>
                    </td>
                    <td></td>
                </tr>`
    $headerTbody.html(str);
    $('input[type="text"]').placeholder();
})
