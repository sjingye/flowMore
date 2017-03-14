//DOM
let pages = $(".pages ul");

let userUrl = "http://api//";
let uid = "13845695879";


let curPage = function(){
    return page;
}

let getPageNum = function(count,itemLength){
    return math.ceil(count/itemLength); 
};

$(function({
    $.ajax({
        url: userUrl,
        data: "id="+uid+"&page="+curPage(),
        success: function(data){
            let count = data.count;
            let pageNum = getPageNum(count,7);
            let html = "";
            for (let i=0;i<pageNum;i++){
                html += "<li>"+(parseInt(i)+1)+"</li>";
            }
        },
        dataType: dataType
    })
}));

