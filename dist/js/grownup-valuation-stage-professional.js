"use strict";

var $guide = $(".guide");
$(function () {
    //改变公司基本信息部分的内容
    var $headerTbody = $("#company-base-infomation tbody");
    var str = "<tr>\n                    <td>\n                       <label for=\"\">\u4F01\u4E1A\u540D\u79F0\uFF1A</label> \n                    </td>\n                    <td>\n                        <input type=\"text\" placeholder=\"\u8BF7\u8F93\u5165\u4F01\u4E1A\u540D\u79F0\">\n                    </td>\n                    <td class=\"top-remind\"></td>\n                </tr>\n                <tr>\n                    <td>\n                       <label for=\"\">\u884C\u4E1A\u9009\u62E9\uFF1A</label> \n                    </td>\n                    <td>\n                        <select class=\"\" id=\"\">\n                            <option>IT</option>\n                            <option>\u755C\u7267\u4E1A</option>\n                            <option>\u519C\u4E1A</option>\n                            <option>\u517B\u6B96\u4E1A</option>\n                        </select>\n                    </td>\n                    <td></td>\n                </tr>\n                <tr>\n                    <td>\n                       <label for=\"\">\u62DF\u4E0A\u5E02\u5730\u70B9\uFF1A</label> \n                    </td>\n                    <td>\n                        <select class=\"\" id=\"\">\n                            <option value=\"bj\">\u5317\u4EAC</option>\n                            <option value=\"sh\">\u4E0A\u6D77</option>\n                            <option value=\"hk\">\u9999\u6E2F</option>\n                        </select>\n                    </td>\n                    <td></td>\n                </tr>\n                <tr>\n                    <td>\n                       <label for=\"\">\u4E0A\u4F20\u62A5\u8868\uFF1A</label> \n                    </td>\n                    <td>\n                        <span class=\"upload-wrapper\">\n                            <span>\n                                <em class=\"icon-upload\"></em>\n                                <span>\u4E0A\u4F20\u6587\u4EF6</span>\n                            </span>\n                            <input id=\"fileupload\" type=\"file\" name=\"files[]\" multiple>\n                        </span>\n                        <strong class=\"remind\"></strong>\n                    </td>\n                    <td>\n                        <a href=\"./images/about-us.jpg\" download=\"report-form\" class=\"download-report\">\u70B9\u51FB\u4E0B\u8F7D\u62A5\u8868\u6A21\u677F</a>\n                    </td>\n                    <td></td>\n                </tr>\n                <tr>\n                    <td>\n                        <label for=\"\"></label>\n                    </td>\n                    <td class=\"upload-remind\">\u9700\u5148\u4E0B\u8F7D\u62A5\u8868\u6A21\u7248\u586B\u5165\u6570\u636E\u540E\u518D\u4E0A\u4F20</td>\n                </tr>";
    $headerTbody.html(str);
    $('input[type="text"]').placeholder();
    //上传文件的事件
    var url = //文件上传地址
    $('#fileupload').fileupload({
        url: url, //文件上传地址
        dataType: 'json',
        maxFileSize: 50000000,
        done: function done(e, data) {
            $.each(data.result.files, function (index, file) {
                $(".remind").text(file.name);
            });
        }
    });
});