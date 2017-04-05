"use strict";

//DOM
var $valuationTbody = $(".valuation-tbody");

//根据page得到的数据接口
var userUrl = "https:/api//";
//根据估值历史的id得到的估值历史数据
var itemUrl = "https:/api//";

//根据后台返回的数据总条数得出页数
var getPageNum = function getPageNum(count, itemLength) {
    return Math.ceil(parseInt(count) / parseInt(itemLength));
};

//根据后台返回的数据得到innerHTML
function packagData(data) {
    var html = "";
    /*for (let i = 0; i < data.page.length; i++){
        html += "<tr><td>"+data.page[i].name+"</td><td>"+data.page[i].date+"</td><td>"+data.page[i].number+"</td><td>"+data.page[i].method+"</td><td><a href="+(itemUrl+data.page[i].vhid)+">详情</a></td><td class="last"><span></span><a href="">下载报告</a></td></tr>"
    };*/
    for (var i = 0; i < data.page.length; i++) {
        html += "<tr>\n                    <td>" + data.page[i].name + "</td>\n                    <td>" + data.page[i].date + "</td>\n                    <td>" + data.page[i].number + "</td>\n                    <td>" + data.page[i].method + "</td>\n                    <td>\n                        <a href=\"" + (itemUrl + data.page[i].vhid) + "\">\u8BE6\u60C5</a>\n                    </td>\n                    <td class=\"last\">\n                        <span></span>\n                        <a href=\"\">\u4E0B\u8F7D\u62A5\u544A</a>\n                    </td>\n                </tr>";
    }
    return html;
}

function paginator(curr) {
    var pageSize = 7;
    $.getJSON(userUrl, {
        pageSize: pageSize, //向服务端传的一页的信息条数
        page: curr || 1 //向服务端传的当前页面
    }, function (data) {
        var count = data.count; //用户的估值历史总数
        var pageNum = getPageNum(count, pageSize); //总共的页数
        var resultHtml = packagData(data);
        $valuationTbody.html(resultHtml).children('tr:even').addClass('even').end().children('tr:odd').addClass('odd');
        var $tds = $valuationTbody.find("td");
        for (var i = 0, len = $tds.length; i < len; i++) {
            if ($tds.eq(i).html() === "专业估值") {
                $tds.eq(i).parent("tr").addClass('professional');
            }
        }
        //显示分页
        laypage({
            cont: 'paginate-container', //容器
            pages: getPageNum(count, pageSize), //通过后台拿到的总页数
            curr: curr || 1, //当前页
            skin: '#F5674B',
            first: 1, //将首页显示为数字1,若不显示，设置false即可
            last: pageNum, //将尾页显示为总页数。若不显示，设置false即可
            prev: '上一页', //若不显示，设置false即可
            next: '下一页', //若不显示，设置false即可
            jump: function jump(obj, first) {
                //触发分页后的回调
                if (!first) {
                    //点击跳页触发函数自身，并传递当前页：obj.curr
                    paginator(obj.curr);
                }
            }
        });
    }); //end function
};
$(function () {
    paginator();
});