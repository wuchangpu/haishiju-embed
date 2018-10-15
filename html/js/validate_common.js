$(function () {

    $("#f_div").hide();


    var zddmQO1 = $("#zddmQO1") // 身份证号码
    var yanzhm = $("#yanzhm") // 验证码
    var yanzhmpic = $("#yanzhmpic") // 验证码图片
    var btnQuery = $(".btnQuery") // 查询按钮

    var recombine = "<ul> \
                    <li class='zddmQO1'>身份证号码:</li> \
                    <li class='yanzhm'>验证码:</li> \
                    <li class='query'>查询:</li> \
                    </ul>";

    $("form").prepend(recombine);
    $("form .zddmQO1").append(zddmQO1);
    $("form .yanzhm").append(yanzhm);
    $("form .yanzhm").append(yanzhmpic);
    $("form .query").append(btnQuery);


    var message = $("#message").text();
    message = $.trim(message);

    var childTable = $("table");
    childTable.hide();

    if (message.length > 0) {
        console.log(message);
        return;
    }


    $.each(childTable, function (i, n) {
        console.log(n);
        if (i == 11) {
            // 证书编号表格，如果对方网站更新，需要根据具体实施细节调整
            var certTrs = $(n).find("tr");
            var certData = [];
            $.each(certTrs, function (innerI, innerN) {
                if (innerI >= 3) {
                    var certTds = $(innerN).find("td");
                    var d = {
                        certNo: $.trim(certTds.eq(0).text()),//证书编码
                        certName: $.trim(certTds.eq(2).text()),// 姓名
                        certDate: $.trim(certTds.eq(3).text()),// 签发日期
                        expireDate: $.trim(certTds.eq(4).text()),// 失效日期
                        certStatus: $.trim(certTds.eq(5).text()),// 证书状态
                        certOrgan: $.trim(certTds.eq(6).text())// 签发机构
                    };
                    certData.push(d);
                }
            });
            // 这里写入回调
            console.log(certData);
            alert(JSON.stringify(certData));
        }
    });
});