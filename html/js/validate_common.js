$(function () {

    $("#f_div").hide();


    var zddmQO1 = $("#zddmQO1") // ���֤����
    var yanzhm = $("#yanzhm") // ��֤��
    var yanzhmpic = $("#yanzhmpic") // ��֤��ͼƬ
    var btnQuery = $(".btnQuery") // ��ѯ��ť

    var recombine = "<ul> \
                    <li class='zddmQO1'>���֤����:</li> \
                    <li class='yanzhm'>��֤��:</li> \
                    <li class='query'>��ѯ:</li> \
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
            // ֤���ű������Է���վ���£���Ҫ���ݾ���ʵʩϸ�ڵ���
            var certTrs = $(n).find("tr");
            var certData = [];
            $.each(certTrs, function (innerI, innerN) {
                if (innerI >= 3) {
                    var certTds = $(innerN).find("td");
                    var d = {
                        certNo: $.trim(certTds.eq(0).text()),//֤�����
                        certName: $.trim(certTds.eq(2).text()),// ����
                        certDate: $.trim(certTds.eq(3).text()),// ǩ������
                        expireDate: $.trim(certTds.eq(4).text()),// ʧЧ����
                        certStatus: $.trim(certTds.eq(5).text()),// ֤��״̬
                        certOrgan: $.trim(certTds.eq(6).text())// ǩ������
                    };
                    certData.push(d);
                }
            });
            // ����д��ص�
            console.log(certData);
            alert(JSON.stringify(certData));
        }
    });
});