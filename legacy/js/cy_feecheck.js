/**
 * Created by sjq on 2017/8/1.
 */
var url_query = "http://120.76.219.196:85/fareform/query";
var url_order = "http://120.76.219.196:85/order/query";
var url_verifydata1 = "http://120.76.219.196:85/fareform/getVerifypppdata";
var url_verifydata2 = "http://120.76.219.196:85/fareform/getVerifyppdata";
var url_verifydata3 = "http://120.76.219.196:85/fareform/getVerifypdata";
var url_verifydata4 = "http://120.76.219.196:85/fareform/getVerifydata";
var url_verify1 = "http://120.76.219.196:85/order/verifyppp";
var url_verify2 = "http://120.76.219.196:85/order/verifypp";
var url_verify3 = "http://120.76.219.196:85/order/verifyp";
var url_verify4 = "http://120.76.219.196:85/order/verify";
var url_download = "http://120.76.219.196:80/file/download";
var check_type;
var ordersid;

function parmfun() {
    var param = {};
    param["token"] = token;
    param["limit"] = limit;
    param["corporationsid"] = corporationsid;
    var searchform = document.getElementById("searchform");
    var inputs = searchform.getElementsByTagName("input");
    for(var i = 0; i < inputs.length; i++){
        var input = inputs[i];
        if(input.value.length != 0){
            param[input.name] = input.value;
        }
    }
    var selects = searchform.getElementsByTagName("select");
    for(var i = 0; i < selects.length; i++){
        var select = selects[i];
        var index = select.selectedIndex;
        if(index != 0 && index != -1){
            param[select.name] = select.options[index].value;
        }
    }
    return param;
}
function tran_load(d){
    for(var i = 0; i < d.length; i++) {
        if (d[i]["updatedat"] != null) {
            d[i]["updatedat"] = new Date(d[i]["updatedat"]).toLocaleString();
        }
    }
    return d;
}
function formatter(value, row, index) {
    return [
        '<a>查看明细</a>'
    ].join('');
}
window.operateEvents1 = {
    'click a': function (e, value, row, index) {
        var modal1 = document.getElementById("modal1");
        modal1.innerHTML = "";
        var modal2 = document.getElementById("modal2");
        modal2.innerHTML = "";
        var realloadweight = row["realloadweight"];
        if(realloadweight == null){
            alert("暂无记录");
            return;
        }
        realloadweight = JSON.parse(realloadweight);
        for(var i = 0; i < realloadweight.length; i++){
            var data1 = realloadweight[i].realloadweight;
            var data2 = realloadweight[i].allowanceloadroadtoll;
            var div1 = document.createElement("div");
            var label1 = document.createElement("label");
            label1.innerText = "重车过磅重量";
            div1.appendChild(label1);
            var input1 = document.createElement("input");
            input1.value = data1 + "吨";
            div1.appendChild(input1);
            modal1.appendChild(div1);
            var div2 = document.createElement("div");
            var label2 = document.createElement("label");
            label2.innerText = "重车过磅奖励";
            div2.appendChild(label2);
            var input2 = document.createElement("input");
            input2.value = data2 + "元";
            div2.appendChild(input2);
            modal2.appendChild(div2);
        }
        $('#loadweight_modal').modal();
    }
};

window.operateEvents2 = {
    'click a': function (e, value, row, index) {
        var modal1 = document.getElementById("modal1");
        modal1.innerHTML = "";
        var modal2 = document.getElementById("modal2");
        modal2.innerHTML = "";
        var realunloadweight = row["realunloadweight"];
        if(realunloadweight == null){
            alert("暂无记录");
            return;
        }
        realunloadweight = JSON.parse(realunloadweight);
        for(var i = 0; i < realunloadweight.length; i++){
            var data1 = realunloadweight[i].realunloadweight;
            var data2 = realunloadweight[i].allowanceunloadroadtoll;
            var div1 = document.createElement("div");
            var label1 = document.createElement("label");
            label1.innerText = "空车过磅重量";
            div1.appendChild(label1);
            var input1 = document.createElement("input");
            input1.value = data1 + "吨";
            div1.appendChild(input1);
            modal1.appendChild(div1);
            var div2 = document.createElement("div");
            var label2 = document.createElement("label");
            label2.innerText = "空车过磅奖励";
            div2.appendChild(label2);
            var input2 = document.createElement("input");
            input2.value = data2 + "元";
            div2.appendChild(input2);
            modal2.appendChild(div2);
        }
        $('#loadweight_modal').modal();
    }
};

window.operateEvents3 = {
    'click a': function (e, value, row, index) {
        var modal3 = document.getElementById("modal3");
        modal3.innerHTML = "";
        var modal4 = document.getElementById("modal4");
        modal4.innerHTML = "";
        var modal5 = document.getElementById("modal5");
        modal5.innerHTML = "";
        var addfuel = row["addfuel"];
        if(addfuel == null){
            alert("暂无记录");
            return;
        }
        addfuel = JSON.parse(addfuel);
        for(var i = 0; i < addfuel.length; i++){
            var data1 = addfuel[i].addfuelvol;
            var data2 = addfuel[i].addfuelmoney;
            var data3 = addfuel[i].addfuelcash;
            var div1 = document.createElement("div");
            var label1 = document.createElement("label");
            label1.innerText = "加油升数";
            div1.appendChild(label1);
            var input1 = document.createElement("input");
            input1.value = data1 + "升";
            div1.appendChild(input1);
            modal3.appendChild(div1);
            var div2 = document.createElement("div");
            var label2 = document.createElement("label");
            label2.innerText = "刷卡金额";
            div2.appendChild(label2);
            var input2 = document.createElement("input");
            input2.value = data2 + "元";
            div2.appendChild(input2);
            modal4.appendChild(div2);
            var div3 = document.createElement("div");
            var label3 = document.createElement("label");
            label3.innerText = "现金金额";
            div3.appendChild(label3);
            var input3 = document.createElement("input");
            input3.value = data3 + "元";
            div3.appendChild(input3);
            modal5.appendChild(div3);
        }
        $('#addfuel_modal').modal();
    }
};

window.operateEvents4 = {
    'click a': function (e, value, row, index) {
        var modal7 = document.getElementById("modal7");
        modal7.innerHTML = "";
        var modal8 = document.getElementById("modal8");
        modal8.innerHTML = "";
        var images = row["images"];
        if(images == null){
            alert("暂无记录");
            return;
        }
        images = JSON.parse(images);
        for(var i = 0; i < images.length; i++){
            var modal;
            if(i % 2 == 0){
                modal = modal7;
            }
            else{
                modal = modal8;
            }
            $.ajax({
                url:url_download,
                type:'get',
                dataType:'text',
                data:{sid:images[i],token:token},
                async:false,
                success:function (response) {
                    response = decodeURIComponent(response);
                    response = JSON.parse(response);
                    var content = response.content;
                    var img = document.createElement("img");
                    img.setAttribute("src",content);
                    img.addEventListener('click',function () {
                        document.getElementById("img_form").style.display = "none";
                        document.getElementById("big").style.display = "block";
                        var big_img = document.getElementById("big_img");
                        var src = this.getAttribute("src");
                        big_img.setAttribute("src",src);
                    });
                    modal.appendChild(img);
                },
                error:function () {
                    alert("error")
                }
            })
        }
        $('#img_modal').modal();
    }
};

$(document).ready(function() {

    $("#big_img").click(function () {
        document.getElementById("img_form").style.display = "block";
        document.getElementById("big").style.display = "none";
    });
    $('#table1').bootstrapTable({
        columns: [
            {radio: true, width:'5%'},
            {field: 'ordersid', title: '订单号',align:'center'},
            {field: 'sid', title: '费用清单号',align:'center'},
            {field: 'drivername', title: '&nbsp&nbsp&nbsp驾驶员&nbsp&nbsp&nbsp',align:'center'},
            {field: 'escortname', title: '&nbsp&nbsp&nbsp押运员&nbsp&nbsp&nbsp',align:'center'},
            {field: 'addfueltotal', title: '油费合计',align:'center'},
            {field: 'addfuelvol', title: '加油量合计',align:'center'},
            {field: 'roadtolltotal', title: '过路费合计',align:'center'},
            {field: 'allowanceunloadroadtoll', title: '空车过路奖励合计',align:'center'},
            {field: 'allowanceloadroadtoll', title: '重车过路奖励合计',align:'center'},
            {field: 'miletotal', title: '里程共计',align:'center'},
            {field: 'allowancetotal', title: '补助奖励合计',align:'center'},
            {field: 'realloadweight', title: '重车过磅记录', align:'center',formatter:'formatter',events:operateEvents1},
            {field: 'realunloadweight', title: '空车过磅记录', align:'center',formatter:'formatter',events:operateEvents2},
            {field: 'images', title: '票据图片', align:'center',formatter:'formatter',events:operateEvents4},
            {field: 'addfuel', title: '加油记录',align:'center',formatter:'formatter',events:operateEvents3}
        ],
        height:290,
        formatNoMatches: function () {
            return '无符合条件的记录';
        }
    });



    var note_ordersid = getCookie("note_ordersid");
    if(note_ordersid != null){
        search("ordersid",note_ordersid);
        delCookie('note_ordersid');
    }
    else {
        search();
    }

    $("#btn_chakan").click(function () {
        var ordersid = $("#table1").bootstrapTable('getSelections')[0].ordersid;
        var data = {};
        data["token"] = token;
        data["sid"] = ordersid;
        $.ajax({
            url:url_order,
            type:'get',
            dataType:'json',
            data:data,
            success:function (response) {
                if(response.status == 0){
                    var row = response.content.data[0];
                    if(row["loaddate"] != null){
                        row["loaddate"] = new Date(row["loaddate"]).toLocaleString();
                    }
                    if(row["unloaddate"] != null){
                        row["unloaddate"] = new Date(row["unloaddate"]).toLocaleTimeString();
                    }
                    if(row["createdat"] != null){
                        row["createdat"] = new Date(row["createdat"]).toLocaleString();
                    }
                    row["orderstatus"] = tran_orderstatus(row["orderstatus"]);
                    var info_table = document.getElementById("info_table");
                    var inputs = info_table.getElementsByTagName("input");
                    for(var i = 0; i < inputs.length; i++){
                        var input = inputs[i];
                        if(row[input.name] != null){
                            input.value = row[input.name];
                        }
                    }
                }
                else{
                    alert(decodeURI(response.msg));
                }
            },
            error:function () {
                alert("操作失败")
            }
        });
        $('#chakan_modal').modal();
    });

    $("#btn_check1").click(function () {
        /*
        if(dept != 1){
            alert("您无权限进行审核");
            return;
        }
        */
        ordersid = $("#table1").bootstrapTable('getSelections')[0].ordersid;
        document.getElementById("check1_info").innerText = "";
        var form = document.getElementById("check_form");
        empty(form);
        $("#check1_modal").modal();
        var data = {};
        data["ordersid"] = ordersid;
        data["token"] = token;
        $.ajax({
            type:'get',
            dataType:'json',
            data:data,
            url:url_verifydata1,
            success:function (response) {
                document.getElementById("check1_info").innerText = decodeURI(response.msg);
                if(response.status == "0"){
                    var data = response.content;
                    var form = document.getElementById("check1_form");
                    fill(form,data);
                }
            }
        })

    });
    $("#btn_check2").click(function () {
        /*
        if(dept != 2){
            alert("您无权限进行审核");
            return;
        }
        */
        ordersid = $("#table1").bootstrapTable('getSelections')[0].ordersid;
        check_type = 2;
        document.getElementById("check_info").innerText = "";
        var form = document.getElementById("check_form");
        empty(form);
        $("#check_modal").modal();
        var data = {};
        data["ordersid"] = ordersid;
        data["token"] = token;
        $.ajax({
            type:'get',
            dataType:'json',
            data:data,
            url:url_verifydata2,
            success:function (response) {
                document.getElementById("check_info").innerText = decodeURI(response.msg);
                if(response.status == "0") {
                    var images = $("#table1").bootstrapTable('getSelections')[0].images;
                    images = JSON.parse(images);
                    for (var i = 0; i < images.length; i++) {
                        $.ajax({
                            url: url_download,
                            type: 'get',
                            dataType: 'text',
                            data: {sid: images[i], token: token},
                            async: false,
                            success: function (response) {
                                response = decodeURIComponent(response);
                                response = JSON.parse(response);
                                var content = response.content;
                                var img = document.getElementById("img" + (i + 1));
                                img.setAttribute("src", content);
                                /*
                                 img.addEventListener('click',function () {
                                 document.getElementById("img_form").style.display = "none";
                                 document.getElementById("big").style.display = "block";
                                 var big_img = document.getElementById("big_img");
                                 var src = this.getAttribute("src");
                                 big_img.setAttribute("src",src);
                                 });
                                 */
                            },
                            error: function () {
                                alert("error")
                            }
                        });
                    }
                    var data = response.content;
                    if (data["createdat"] != null) {
                        data["createdat"] = new Date(data["createdat"]).toLocaleString();
                    }
                    var form = document.getElementById("check_form");
                    fill(form, data);
                    var realloadweight = data["realloadweight"];
                    realloadweight = JSON.parse(realloadweight);
                    for (var i = 0; i < realloadweight.length; i++) {
                        document.getElementById("_realloadweight").value += realloadweight[i].realloadweight + ",";
                        document.getElementById("_allowanceloadroadtoll").value += realloadweight[i].allowanceloadroadtoll + ",";
                    }
                    var realunloadweight = data["realunloadweight"];
                    realunloadweight = JSON.parse(realunloadweight);
                    for (var i = 0; i < realunloadweight.length; i++) {
                        document.getElementById("_realunloadweight").value += realunloadweight[i].realunloadweight + ",";
                        document.getElementById("_allowanceunloadroadtoll").value += realunloadweight[i].allowanceunloadroadtoll + ",";
                    }
                    var addfuel = data["addfuel"];
                    addfuel = JSON.parse(addfuel);
                    for (var i = 0; i < addfuel.length; i++) {
                        document.getElementById("_addfuelvol").value += addfuel[i].addfuelvol + ",";
                        document.getElementById("_addfuelmoney").value += addfuel[i].addfuelmoney + ",";
                        document.getElementById("_addfuelcash").value += addfuel[i].addfuelcash + ",";
                    }
                }
            }
        })
    });
    $("#btn_check3").click(function () {
        /*
        if(dept != 2){
            alert("您无权限进行审核");
            return;
        }
        */
        ordersid = $("#table1").bootstrapTable('getSelections')[0].ordersid;
        check_type = 3;
        document.getElementById("check_info").innerText = "";
        var form = document.getElementById("check_form");
        empty(form);
        $("#check_modal").modal();
        var data = {};
        data["ordersid"] = ordersid;
        data["token"] = token;
        $.ajax({
            type:'get',
            dataType:'json',
            data:data,
            url:url_verifydata3,
            success:function (response) {
                document.getElementById("check_info").innerText = decodeURI(response.msg);
                if(response.status == "0"){
                    var images = $("#table1").bootstrapTable('getSelections')[0].images;
                    images = JSON.parse(images);
                    for(var i = 0; i < images.length; i++){
                        $.ajax({
                            url:url_download,
                            type:'get',
                            dataType:'text',
                            data:{sid:images[i],token:token},
                            async:false,
                            success:function (response) {
                                response = decodeURIComponent(response);
                                response = JSON.parse(response);
                                var content = response.content;
                                var img = document.getElementById("img"+(i+1));
                                img.setAttribute("src",content);
                                /*
                                 img.addEventListener('click',function () {
                                 document.getElementById("img_form").style.display = "none";
                                 document.getElementById("big").style.display = "block";
                                 var big_img = document.getElementById("big_img");
                                 var src = this.getAttribute("src");
                                 big_img.setAttribute("src",src);
                                 });
                                 */
                            },
                            error:function () {
                                alert("error")
                            }
                        });
                    }
                    var data = response.content;
                    if(data["createdat"] != null){
                        data["createdat"] = new Date(data["createdat"]).toLocaleString();
                    }
                    var form = document.getElementById("check_form");
                    fill(form,data);
                    var realloadweight = data["realloadweight"];
                    realloadweight = JSON.parse(realloadweight);
                    for(var i = 0; i < realloadweight.length; i++){
                        document.getElementById("_realloadweight").value += realloadweight[i].realloadweight + ",";
                        document.getElementById("_allowanceloadroadtoll").value += realloadweight[i].allowanceloadroadtoll + ",";
                    }
                    var realunloadweight = data["realunloadweight"];
                    realunloadweight = JSON.parse(realunloadweight);
                    for(var i = 0; i < realunloadweight.length; i++){
                        document.getElementById("_realunloadweight").value += realunloadweight[i].realunloadweight + ",";
                        document.getElementById("_allowanceunloadroadtoll").value += realunloadweight[i].allowanceunloadroadtoll + ",";
                    }
                    var addfuel = data["addfuel"];
                    addfuel = JSON.parse(addfuel);
                    for(var i = 0; i < addfuel.length; i++){
                        document.getElementById("_addfuelvol").value += addfuel[i].addfuelvol + ",";
                        document.getElementById("_addfuelmoney").value += addfuel[i].addfuelmoney + ",";
                        document.getElementById("_addfuelcash").value += addfuel[i].addfuelcash + ",";
                    }
                }
            }
        })
    });
    $("#btn_check4").click(function () {
        /*
        if(dept != 4){
            alert("您无权限进行审核");
            return;
        }
        */
        ordersid = $("#table1").bootstrapTable('getSelections')[0].ordersid;
        check_type = 4;
        document.getElementById("check_info").innerText = "";
        var form = document.getElementById("check_form");
        empty(form);
        $("#check_modal").modal();
        var data = {};
        data["ordersid"] = ordersid;
        data["token"] = token;
        $.ajax({
            type:'get',
            dataType:'json',
            data:data,
            url:url_verifydata4,
            success:function (response) {
                document.getElementById("check_info").innerText = decodeURI(response.msg);
                if(response.status == "0"){
                    var images = $("#table1").bootstrapTable('getSelections')[0].images;
                    images = JSON.parse(images);
                    for(var i = 0; i < images.length; i++){
                        $.ajax({
                            url:url_download,
                            type:'get',
                            dataType:'text',
                            data:{sid:images[i],token:token},
                            async:false,
                            success:function (response) {
                                response = decodeURIComponent(response);
                                response = JSON.parse(response);
                                var content = response.content;
                                var img = document.getElementById("img"+(i+1));
                                img.setAttribute("src",content);
                                /*
                                 img.addEventListener('click',function () {
                                 document.getElementById("img_form").style.display = "none";
                                 document.getElementById("big").style.display = "block";
                                 var big_img = document.getElementById("big_img");
                                 var src = this.getAttribute("src");
                                 big_img.setAttribute("src",src);
                                 });
                                 */
                            },
                            error:function () {
                                alert("error")
                            }
                        });
                    }
                    var data = response.content;
                    if(data["createdat"] != null){
                        data["createdat"] = new Date(data["createdat"]).toLocaleString();
                    }
                    var form = document.getElementById("check_form");
                    fill(form,data);
                    var realloadweight = data["realloadweight"];
                    realloadweight = JSON.parse(realloadweight);
                    for(var i = 0; i < realloadweight.length; i++){
                        document.getElementById("_realloadweight").value += realloadweight[i].realloadweight + ",";
                        document.getElementById("_allowanceloadroadtoll").value += realloadweight[i].allowanceloadroadtoll + ",";
                    }
                    var realunloadweight = data["realunloadweight"];
                    realunloadweight = JSON.parse(realunloadweight);
                    for(var i = 0; i < realunloadweight.length; i++){
                        document.getElementById("_realunloadweight").value += realunloadweight[i].realunloadweight + ",";
                        document.getElementById("_allowanceunloadroadtoll").value += realunloadweight[i].allowanceunloadroadtoll + ",";
                    }
                    var addfuel = data["addfuel"];
                    addfuel = JSON.parse(addfuel);
                    for(var i = 0; i < addfuel.length; i++){
                        document.getElementById("_addfuelvol").value += addfuel[i].addfuelvol + ",";
                        document.getElementById("_addfuelmoney").value += addfuel[i].addfuelmoney + ",";
                        document.getElementById("_addfuelcash").value += addfuel[i].addfuelcash + ",";
                    }
                }
            }
        })
    });

    $("#pass1").click(function () {
        var data = {};
        data["sid"] = ordersid;
        data["token"] = token;
        data["verifystatus"] = "0";
        data["verifyret"] = document.getElementById("verifyret").value;
        $.ajax({
            url:url_verify1,
            type:'post',
            dataType:'json',
            data:data,
            success:function (response) {
                document.getElementById("check1_info").innerText = decodeURI(response.msg);
            },
            error:function () {
                document.getElementById("check1_info").innerText = "操作失败";
            }

        })
    });
    $("#pass").click(function () {
        var url_verify;
        if(check_type == "2"){
            url_verify = url_verify2;
        }
        else if(check_type == "3"){
            url_verify = url_verify3;
        }
        else if(check_type == "4"){
            url_verify = url_verify4;
        }
        var data = {};
        data["sid"] = ordersid;
        data["token"] = token;
        data["verifystatus"] = "0";
        data["verifyret"] = document.getElementById("verifyret1").value;
        $.ajax({
            url:url_verify,
            type:'post',
            dataType:'json',
            data:data,
            success:function (response) {
                document.getElementById("check_info").innerText = decodeURI(response.msg);
            },
            error:function () {
                document.getElementById("check_info").innerText = "操作失败";
            }
        })
    });

    $("#reject1").click(function () {
        var data = {};
        data["sid"] = ordersid;
        data["token"] = token;
        data["verifystatus"] = "1";
        data["verifyret"] = document.getElementById("verifyret").value;
        $.ajax({
            url:url_verify1,
            type:'post',
            dataType:'json',
            data:data,
            success:function (response) {
                document.getElementById("check1_info").innerText = decodeURI(response.msg);
            },
            error:function () {
                document.getElementById("check1_info").innerText = "操作失败";
            }

        })
    });
    $("#reject").click(function () {
        var url_verify;
        if(check_type == "2"){
            url_verify = url_verify2;
        }
        else if(check_type == "3"){
            url_verify = url_verify3;
        }
        else if(check_type == "4"){
            url_verify = url_verify4;
        }
        var data = {};
        data["sid"] = ordersid;
        data["token"] = token;
        data["verifystatus"] = "1";
        data["verifyret"] = document.getElementById("verifyret1").value;
        $.ajax({
            url:url_verify,
            type:'post',
            dataType:'json',
            data:data,
            success:function (response) {
                document.getElementById("check_info").innerText = decodeURI(response.msg);
            },
            error:function () {
                document.getElementById("check_info").innerText = "操作失败";
            }

        })
    });


});

