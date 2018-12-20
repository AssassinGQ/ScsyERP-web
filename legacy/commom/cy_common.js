var token;
var corporationsid;
var sid;
var type;
var dept;
var param_query = {};
var limit = "10";

function print(div) {   document.body.innerHTML=document.getElementById(div).innerHTML;
    window.print();
}
function setCookie(name,value) {
    document.cookie = name + "="+ escape (value);
}
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
function getCookie(name) {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg)) return unescape(arr[2]);
    else return null;
}
function fill_imgform(img) {
    document.getElementById("img_form").style.display = "block";
    document.getElementById("big").style.display = "none";
    document.getElementById("snap1").setAttribute("src",null);
    document.getElementById("snap2").setAttribute("src",null);
    document.getElementById("snap3").setAttribute("src",null);
    if(img[0] != null){
        $.ajax({
            url:url_download,
            type:'get',
            dataType:'text',
            cache:false,
            data:{sid:img[0],token:token},
            success:function (response) {
                response = decodeURIComponent(response);
                response = JSON.parse(response);
                var content = response.content;
                var img = document.getElementById("snap1");
                img.setAttribute("src",content);
                img.addEventListener('click',function () {
                    document.getElementById("img_form").style.display = "none";
                    document.getElementById("big").style.display = "block";
                    var big_img = document.getElementById("big_img");
                    var src = this.getAttribute("src");
                    big_img.setAttribute("src",src);
                });
            },
            error:function () {
                alert("error")
            }
        });
    }
    if(img[1] != null){
        $.ajax({
            url:url_download,
            type:'get',
            dataType:'text',
            data:{sid:img[1],token:token},
            cache:false,
            success:function (response) {
                response = decodeURIComponent(response);
                response = JSON.parse(response);
                var content = response.content;
                var img = document.getElementById("snap2");
                img.setAttribute("src",content);
                img.addEventListener('click',function () {
                    document.getElementById("img_form").style.display = "none";
                    document.getElementById("big").style.display = "block";
                    var big_img = document.getElementById("big_img");
                    var src = this.getAttribute("src");
                    big_img.setAttribute("src",src);
                });
            },
            error:function () {
                alert("error")
            }
        });
    }
    if(img[2] != null){
        $.ajax({
            url:url_download,
            type:'get',
            dataType:'text',
            data:{sid:img[2],token:token},
            cache:false,
            success:function (response) {
                response = decodeURIComponent(response);
                response = JSON.parse(response);
                var content = response.content;
                var img = document.getElementById("snap3");
                img.setAttribute("src",content);
                img.addEventListener('click',function () {
                    document.getElementById("img_form").style.display = "none";
                    document.getElementById("big").style.display = "block";
                    var big_img = document.getElementById("big_img");
                    var src = this.getAttribute("src");
                    big_img.setAttribute("src",src);
                });
            },
            error:function () {
                alert("error")
            }
        });
    }
    $('#imgs_modal').modal();
}
function tran_load(data) {
    return data;
}
function tran_submit(data) {
    return data;
}
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
        var value = $(select).val();
        if(value != null && value != -1){
            param[select.name] = value;
        }
        /*
         var index = select.selectedIndex;
         if(index != 0 && index != -1){
         param[select.name] = select.options[index].value;
         }
         */
    }
    return param;
}
function search(name,val) {
    param_query = parmfun();
    param_query["page"] = 1;
    if(name != null){
        param_query[name] = val;
    }
    $.ajax({
        type:"get",dataType:"json",url:url_query,data:param_query,async:false,timeout:1000,
        success:function (response) {
            if(response.status == 0){
                if(response.content != ""){
                    var total = response.content.total;
                    var rows = response.content.data;
                    var option;
                    rows = tran_load(rows);
                    $("#table1").bootstrapTable("load",rows);
                    var pagenum;
                    if(total == 0){pagenum = 1;}
                    else{pagenum = Math.ceil(total/limit);}
                    option = {
                        bootstrapMajorVersion:1,
                        numberOfPages:5,
                        totalPages:pagenum,
                        currentPage:1
                    };
                    $("#page1").bootstrapPaginator("setOptions",option);
                    document.getElementById("total").innerText = "共"+pagenum+"页";
                }
                else {
                    $("#table1").bootstrapTable("removeAll");
                    option = {
                        bootstrapMajorVersion:1,
                        numberOfPages:5,
                        totalPages:1,
                        currentPage:1
                    };
                    document.getElementById("total").innerText = "共1页";
                    $("#page1").bootstrapPaginator("setOptions",option);
                }
            }
            else{
                if(response.msg != "第1页不存在"){
                    alert(decodeURI(response.msg));
                }
                $("#table1").bootstrapTable("removeAll");
                option = {
                    bootstrapMajorVersion:1,
                    numberOfPages:5,
                    totalPages:1,
                    currentPage:1
                };
                document.getElementById("total").innerText = "共1页";
                $("#page1").bootstrapPaginator("setOptions",option);
            }
        },
        error:function () {
            alert(decodeURI("操作失败"));
        }
    })
}
function change(select) {
    var index= select.selectedIndex;
    var value = select.options[index].text;
    var height;
    if(value == 5){
        height = 160;
    }
    else if(value == 10){
        height = 290;
    }
    else if(value == 15){
        height = 420;
    }
    else if(value == 20){
        height = 550;
    }
    else if(value == 50){
        height = 550;
    }
    limit = value;
    $("#table1").bootstrapTable('refreshOptions',{height:height});
    $("#table1").bootstrapTable('removeAll');
    param_query["limit"] = limit;
    param_query["page"] = 1;
    $.ajax({
        type:"get",
        dataType:"json",
        url:url_query,
        data:param_query,
        success:function (response) {
            if(response.status == 0){
                if(response.content != ""){
                    var rows = response.content.data;
                    var total = response.content.total;
                    rows = tran_load(rows);
                    $("#table1").bootstrapTable("load",rows);
                    var pagenum;
                    if(total == 0){pagenum = 1;}
                    else{pagenum = Math.ceil(total/limit);}
                    var option = {
                        bootstrapMajorVersion:1,
                        numberOfPages:5,
                        totalPages:pagenum,
                        currentPage:1
                    };
                    $("#page1").bootstrapPaginator("setOptions",option);
                    document.getElementById("total").innerText = "共"+pagenum+"页";
                }
                else{
                    $("#table1").bootstrapTable("removeAll");
                    option = {
                        bootstrapMajorVersion:1,
                        numberOfPages:5,
                        totalPages:1,
                        currentPage:1
                    };
                    document.getElementById("total").innerText = "共1页";
                    $("#page1").bootstrapPaginator("setOptions",option);
                }
            }
            else{alert(decodeURI(response.msg));}
        },
        error:function () {
            alert("操作失败");
        }
    });
}
function fill(form,data) {
    var inputs = form.getElementsByTagName("input");
    for(var i = 0; i < inputs.length; i++){
        var input = inputs[i];
        if(data[input.name] != null){
            input.value = data[input.name];
        }
    }
    var selects = form.getElementsByTagName("select");
    for(var i = 0; i < selects.length; i++){
        var select = selects[i];
        if(data[select.name] != null){
            var d = data[select.name];
            $(select).find("option[value=d]").attr("selected",true);
        }
    }
}
function empty(form) {
    var inputs = form.getElementsByTagName("input");
    for(var i = 0; i < inputs.length; i++){
        var input = inputs[i];
        input.value = "";
    }
    var selects = form.getElementsByTagName("select");
    for(var i = 0; i < selects.length; i++){
        var select = selects[i];
        select.options[0].selected = true;
    }
}
function addOptions(select,options,name,value) {
    select.empty();
    var option = "<option value='-1'></option>";
    select.append(option);
    for(var i = 0; i < options.length; i++){
        option = "<option value='"+options[i][value]+"'>"+options[i][name]+"</option>";
        select.append(option);
    }
    select.selectpicker('render');
    select.selectpicker('refresh');
}
function tran_orderstatus(num){
    if(num == 0){
        return "已下单";
    }
    else if(num == 1){
        return "已调度"
    }
    else if(num == 2){
        return "已安检"
    }
    else if(num == 3){
        return "已派发"
    }
    else if(num == 4){
        return "已接单"
    }
    else if(num == 5){
        return "已装货"
    }
    else if(num == 6){
        return "已卸货"
    }
    else if(num == 7){
        return "已回场"
    }
    else if(num == 9){
        return "一审通过"
    }
    else if(num == 10){
        return "二审通过"
    }
    else if(num == 11){
        return "三审通过"
    }
    else if(num == 12){
        return "四审通过"
    }
    else if(num == 13){
        return "未通过审核"
    }
}
function tran_warntype(num){
    if(num == 1){
        return "安全锁异常";
    }
    else if(num == 2){
        return "泄露异常";
    }
    else if(num == 3){
        return "胎压异常";
    }
    else if(num == 4){
        return "油量异常";
    }
    else if(num == 5){
        return "超速异常";
    }
    else if(num == 6){
        return "停车异常";
    }
    else if(num == 7){
        return "疲劳驾驶";
    }
    else if(num == 8){
        return "急刹异常";
    }
    else if(num == 10){
        return "车辆事故";
    }
    else if(num == 11){
        return "超载异常";
    }
}

$(document).ready(function() {
    if(!(document.cookie || navigator.cookieEnabled)){
        alert('请启用浏览器cookie');
    }
    corporationsid = getCookie("corporationsid");
    token = getCookie("token");
    sid = getCookie("sid");
    type = getCookie("type");
    dept = getCookie("dept");

    $('.selectpicker').selectpicker({
        size: 15
    });
    $(".day").datetimepicker({
        language:  'zh-CN',
        format: 'yyyy-mm-dd',
        autoclose: true,
        todayBtn: true,
        startView: 'month',
        minView:'month',
        maxView:'decade'
    });
    $(".riqi").datetimepicker({
        language:  'zh-CN',
        format: 'yyyy-mm-dd',
        autoclose: true,
        todayBtn: true,
        startView: 'month',
        minView:'month',
        maxView:'decade'
    });

    var panel = document.getElementById("table1").parentNode;
    var width = panel.offsetWidth - 30;
    var table = document.getElementById("table1");
    $(table).css("width",width);


    var options={
        bootstrapMajorVersion:1,currentPage:1,numberOfPages:5,totalPages:1,
        itemTexts: function (type, page, current) {
            switch (type) {
                case "first":
                    return "首页";
                case "prev":
                    return "上页";
                case "next":
                    return "下页";
                case "last":
                    return "末页";
                case "page":
                    return page;
            }
        },
        onPageClicked:function(e,originalEvent,type,page){
            param_query["page"] = page;
            $.ajax({
                type:"get",
                dataType:"json",
                url:url_query,
                data:param_query,
                success:function (response) {
                    if(response.status == 0){
                        if(response.content != ""){
                            var rows = response.content.data;
                            rows = tran_load(rows);
                            $("#table1").bootstrapTable("load",rows);
                            $("#page1").bootstrapPaginator("show",page)
                        }
                    }
                    else{alert(decodeURI(response.msg));}
                }
            })
        }
    };
    $("#page1").bootstrapPaginator(options);
    $("#to").click(function () {
        var index = document.getElementById("index").value;
        if(index.length != 0){
            param_query["page"] = index;
            $.ajax({
                type:"get",
                dataType:"json",
                url:url_query,
                data:param_query,
                success:function (response) {
                    if(response.status == 0){
                        if(response.content != ""){
                            var rows = response.content.data;
                            rows = tran_load(rows);
                            $("#table1").bootstrapTable("load",rows);
                            $("#page1").bootstrapPaginator("show",index)
                        }
                    }
                    else{alert(decodeURI(response.msg));}
                },
                error:function () {
                    alert("操作失败");
                }
            });
        }
    });

    $("#search").click(function () {
        search();
    });

    $("#btn_add").click(function () {
        $("#add_info").empty();
        empty(document.getElementById("add_modal"));
        $('#add_modal').modal();
    });
    $("#add").click(function () {
        var param = {};
        var add_form = document.getElementById("add_form");
        var inputs = add_form.getElementsByTagName("input");
        for(var i = 0; i < inputs.length; i++){
            var input = inputs[i];
            if(input.value.length != 0){
                /*
                 if($(input).hasClass("riqi")){
                 input.value = new Date(input.value).getTime();
                 }
                 */
                param[input.name] = input.value;
            }
        }
        var selects = add_form.getElementsByTagName("select");
        for(var i = 0; i < selects.length; i++){
            var select = selects[i];
            var index = select.selectedIndex;
            if(index != -1 && select.options[index].value != -1){
                param[select.name] = select.options[index].value;
            }
        }
        param["token"] = token;
        param["corporationsid"] = corporationsid;
        param = tran_submit(param);
        $.ajax({
            type:'post',
            dataType:'json',
            data:param,
            url:url_add,
            success:function (response) {
                if(response.status == "0"){
                    document.getElementById("add_info").innerText = "操作成功";
                    $.ajax({
                        type:"get",
                        dataType:"json",
                        url:url_query,
                        data:param_query,
                        success:function (response) {
                            if(response.status == 0){
                                if(response.content != ""){
                                    var rows = response.content.data;
                                    rows = tran_load(rows);
                                    $("#table1").bootstrapTable("load",rows);
                                }
                            }
                        }
                    });
                    $("#add_modal").modal('hide');
                }
                else{
                    document.getElementById("add_info").innerText = decodeURI(response.msg);
                }
            },
            error:function () {
                document.getElementById("add_info").innerText = "操作失败";
            }
        })
    });

    $("#btn_mend").click(function () {
        $("#mend_info").empty();
        empty(document.getElementById("mend_info"));
        var row =  $("#table1").bootstrapTable('getSelections')[0];
        if(row == null){
            alert("请选择条目");
            return;
        }
        var mend_form = document.getElementById("mend_form");
        var inputs = mend_form.getElementsByTagName('input');
        var name;var data;
        for(var j = 0; j < inputs.length; j++) {
            var input = inputs[j];
            name = input.name;
            data = row[name];
            if(data != null){
                input.value = data;
            }
        }
        var selects = mend_form.getElementsByTagName("select");
        for(var j = 0; j < selects.length; j++){
            var select = selects[j];
            name = select.name;
            data = row[name];
            if(data != null){
                for(var  i = 0; i < select.options.length; i++){
                    if(select.options[i].text == data || select.options[i].value == data){
                        select.options[i].selected = true;
                    }
                }
            }
        }
        $('#mend_modal').modal();
    });
    $("#mend").click(function () {
        var param = {};
        param["sid"] = $("#table1").bootstrapTable('getSelections')[0].sid;
        param["token"] = token;
        param["corporationsid"] = corporationsid;
        var mend_form = document.getElementById("mend_form");
        var inputs = mend_form.getElementsByTagName("input");
        for(var i = 0; i < inputs.length; i++){
            var input = inputs[i];
            if(input.value.length != 0){
                param[input.name] = input.value;
            }
        }
        var selects = mend_form.getElementsByTagName("select");
        for(var i = 0; i < selects.length; i++){
            var select = selects[i];
            var index = select.selectedIndex;
            if(index != 0 && index != -1){
                param[select.name] = select.options[index].value;
            }
        }
        param = tran_submit(param);

        $.ajax({
            type:'post',
            dataType:'json',
            data:param,
            url:url_update,
            success:function (response) {
                if(response.status == "0"){
                    document.getElementById("mend_info").innerText = "操作成功";
                    $.ajax({
                        type:"get",
                        dataType:"json",
                        url:url_query,
                        data:param_query,
                        success:function (response) {
                            if(response.status == 0){
                                if(response.content != ""){
                                    var rows = response.content.data;
                                    rows = tran_load(rows);
                                    $("#table1").bootstrapTable("load",rows);
                                }
                            }
                        }
                    });
                    $("#mend_modal").modal('hide');
                }
                else{
                    document.getElementById("mend_info").innerText = decodeURI(response.msg);
                }
            },
            error:function () {
                document.getElementById("mend_info").innerText = "操作失败";
            }
        })
    });

    $("#btn_delete").click(function () {
        var row =  $("#table1").bootstrapTable('getSelections')[0];
        if(row == null){
            alert("请选择条目");
            return;
        }

        $("#delete_modal").modal();

        /*
        var param = {};
        param["sid"] = row["sid"];
        param["token"] = token;
        param["corporationsid"] = corporationsid;
        $.ajax({
            type:"post",
            dataType:"json",
            url:url_delete,
            data:param,
            success:function (response) {
                if(response.status == "0"){
                    alert("操作成功");
                    $.ajax({
                        type:"get",
                        dataType:"json",
                        url:url_query,
                        data:param_query,
                        success:function (response) {
                            if(response.status == 0){
                                if(response.content != ""){
                                    var rows = response.content.data;
                                    rows = tran_load(rows);
                                    $("#table1").bootstrapTable("load",rows);
                                }
                            }
                        }
                    });
                }
                else{
                    alert(decodeURI(response.msg));
                }
            },
            error:function () {
                alert("操作失败");
            }
        });
        */
    });
    $("#delete").click(function () {
        var row =  $("#table1").bootstrapTable('getSelections')[0];
        var param = {};
        param["sid"] = row["sid"];
        param["token"] = token;
        param["corporationsid"] = corporationsid;
        $.ajax({
            type:"post",
            dataType:"json",
            url:url_delete,
            data:param,
            success:function (response) {
                if(response.status == "0"){
                    $.ajax({
                        type:"get",
                        dataType:"json",
                        url:url_query,
                        data:param_query,
                        success:function (response) {
                            if(response.status == 0){
                                if(response.content != ""){
                                    var rows = response.content.data;
                                    rows = tran_load(rows);
                                    $("#table1").bootstrapTable("load",rows);
                                }
                            }
                        }
                    });
                    $("#delete_modal").modal('hide');
                }
                else{
                    $("#delete_info").text(decodeURI(response.msg))
                }
            },
            error:function () {
                $("#delete_info").text("操作失败")
            }
        });
    });


    $("#print").click(function () {
        $("#detail_table").printArea();
    });


});
