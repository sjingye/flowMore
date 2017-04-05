    // 百度地图API功能
    var map = new BMap.Map('map');
    var poi = new BMap.Point( 116.480969,39.95678);
    map.centerAndZoom(poi, 16);
    map.enableScrollWheelZoom();
    var content = '<div style="margin:0;line-height:20px;padding:2px;">' +
                    '<img src="./images/21.jpg" alt="21世纪大厦" style="float:right;zoom:1;overflow:hidden;width:100px;height:100px;margin-left:3px;"/>' +
                    '地址：北京市朝阳区亮马桥路甲40号二十一世纪大厦B座309室<br/>电话：(010)84446598<br/>简介：二十一世纪大厦位于北京市朝阳区亮马桥地铁站附近' +
                  '</div>';

    //创建检索信息窗口对象
    var searchInfoWindow = null;
    searchInfoWindow = new BMapLib.SearchInfoWindow(map, content, {
        title  : "心流（北京）投资管理有限公司",      //标题
        width  : 290,             //宽度
        height : 105,              //高度
        panel  : "panel",         //检索结果面板
        enableAutoPan : true,     //自动平移
        searchTypes   :[
            BMAPLIB_TAB_SEARCH,   //周边检索
            BMAPLIB_TAB_TO_HERE,  //到这里去
            BMAPLIB_TAB_FROM_HERE //从这里出发
        ]
    });
    var marker = new BMap.Marker(poi); //创建marker对象
    marker.enableDragging(); //marker可拖拽
    marker.addEventListener("click", function(e){
        console.log(1)
        //searchInfoWindow.open(marker);
    })
    map.addOverlay(marker); //在地图中添加marker