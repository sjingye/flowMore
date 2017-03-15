//DOM
let $valuationTbody = $(".valuation-tbody");

//虚拟数据
let d = {
        // "userId": "13745813654",
        "count" : 50,
        "page1": [
            {
                "name": "心流1", 
                "date": "20160215", 
                "number": "100万",
                "method": "专业估值",
                "vhid": "34367"
            },
            {
                "name": "心流2", 
                "date": "20160215", 
                "number": "100万",
                "method": "PE",
                "vhid": "34367"
            },
            {
                "name": "心流3", 
                "date": "20160215", 
                "number": "100万",
                "method": "专业估值",
                "vhid": "34367"
            },
            {
                "name": "心流4", 
                "date": "20160215", 
                "number": "100万",
                "method": "PE",
                "vhid": "34367"
            },
            {
                "name": "心流5", 
                "date": "20160215", 
                "number": "100万",
                "method": "PE",
                "vhid": "34367"
            },
            {
                "name": "心流6", 
                "date": "20160215", 
                "number": "100万",
                "method": "PE",
                "vhid": "34367"
            },
            {
                "name": "心流7", 
                "date": "20160215", 
                "number": "100万",
                "method": "专业估值",
                "vhid": "34367"
            }
        ]
    }



//根据page得到的数据接口
const userUrl = "https:/api//";
//根据估值历史的id得到的估值历史数据
const itemUrl = "https:/api//";

//根据后台返回的数据总条数得出页数
let getPageNum = function(count,itemLength){
    return math.ceil(parseInt(count)/parseInt(itemLength)); 
};

//根据后台返回的数据得到innerHTML
function packagData(data){
    let html = "";
    for (let i = 0; i < data.length; i++) {
        html += `
                <tr>
                    <td>${data[i].name}</td>
                    <td>${data[i].date}</td>
                    <td>${data[i].number}</td>
                    <td>${data[i].method}</td>
                    <td>
                        <a href="${itemUrl+data[i].vhid}">详情</a>
                    </td>
                </tr>
            `
    }
    return html;
}

function paginator() {
    $.ajax({
        url: userUrl,
        data: {
            id: uid,            //用户id
            page: 1  //向服务端传的当前页面
        },
        success: function(data){
            let count = data.count;     //用户的估值历史总数
            let pageNum = getPageNum(count,7); //总共的页数
            let str = "";
            $valuationTbody.html(str);
            //显示分页
            laypage({
              cont: '$(".paginate-container")',   //容器
              pages: getPageNum(count,7),     //通过后台拿到的总页数
              curr:  1, //初始化当前页
              skin: '#F5674B',
              first: 1, //将首页显示为数字1,。若不显示，设置false即可
              last: pageNum, //将尾页显示为总页数。若不显示，设置false即可
              prev: '上一页', //若不显示，设置false即可
              next: '下一页', //若不显示，设置false即可
              jump: function(obj, first){ //触发分页后的回调
                //得到了当前页，用于向服务端请求对应数据
                if(!first){ //点击跳页触发函数自身，并传递当前页：obj.curr
                    $.getJSON(userUrl,{
                        id: uid,            //用户id
                        page: obj.curr      //向服务端传的当前页面
                    },function(data){
                        let  resultHtml = packagData(data);
                        $valuationTbody.html(resultHtml)
                        .children('tr:even').addClass('even')
                        .end()
                        .children('tr:odd').addClass('odd');  
                    })
                }
              }
            });
        },
        dataType: json
    })
}
$(paginator());


