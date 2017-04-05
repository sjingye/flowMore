var $guide = $(".guide");
$(function() {
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
                            <option>IT</option>
                            <option>畜牧业</option>
                            <option>农业</option>
                            <option>养殖业</option>
                        </select>
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td>
                       <label for="">拟上市地点：</label> 
                    </td>
                    <td>
                        <select class="" id="">
                            <option value="bj">北京</option>
                            <option value="sh">上海</option>
                            <option value="hk">香港</option>
                        </select>
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td>
                       <label for="">上传报表：</label> 
                    </td>
                    <td>
                        <span class="upload-wrapper">
                            <span>
                                <em class="icon-upload"></em>
                                <span>上传文件</span>
                            </span>
                            <input id="fileupload" type="file" name="files[]" multiple>
                        </span>
                        <strong class="remind"></strong>
                    </td>
                    <td>
                        <a href="./images/about-us.jpg" download="report-form" class="download-report">点击下载报表模板</a>
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td>
                        <label for=""></label>
                    </td>
                    <td class="upload-remind">需先下载报表模版填入数据后再上传</td>
                </tr>`
    $headerTbody.html(str);
    $('input[type="text"]').placeholder();
    //上传文件的事件
    var url = //文件上传地址
        $('#fileupload').fileupload({
            url: url, //文件上传地址
            dataType: 'json',
            maxFileSize: 50000000,
            done: function(e, data) {
                $.each(data.result.files, function(index, file) {
                    $(".remind").text(file.name);
                });
            }
        });
})