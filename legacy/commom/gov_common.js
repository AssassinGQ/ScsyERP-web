var url_corporation = "http://120.76.219.196:85/user/query_corporation";
var url_buyer = "http://120.76.219.196:85/basic_info/buyer_info/query";
var url_seller = "http://120.76.219.196:85/basic_info/seller_info/query";
var url_product = "http://120.76.219.196:85/basic_info/product_info/query";
var url_truck = "http://120.76.219.196:85/basic_info/truck_info/query";
var url_driver = "http://120.76.219.196:85/basic_info/escort_info/query";
var token;
var corporationsid;
var sid;
var type;
var dept;
var param_query = {};
var limit = "10";
var yg_type = [];var xf_type = [];var aj_type = [];var hb_type = [];var jj_type = [];
var warntype = [];
var warnopt = [];
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
    }
    return param;
}
function search(name,value) {
    param_query = parmfun();
    param_query["page"] = 1;
    param_query[name] = value;
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
            $(select).val(d);
        }
    }
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
function initSelect(url,data,select,name,value) {
    select.empty();
    var option = "<option value='-1'>缺省</option>";
    select.append(option);
    $.ajax({
        url:url,type:'get',dataType:'json',data:data,
        success:function (response) {
            if(response.status == 0){
                var options = response.content.data;
                for(var i = 0; i < options.length; i++){
                    var option = "<option value='"+options[i][value]+"'>"+options[i][name]+"</option>";
                    select.append(option);
                }
                select.selectpicker('render');
                select.selectpicker('refresh');
            }
        }
    })
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
    if(dept == "undefined"){
        setCookie("dept","0");
        dept = getCookie("dept");
    }

    warntype[0] = [2,3,5,7,11,10];
    warntype[1] = [5,7,11,10];
    warntype[2] = [2];
    warntype[3] = [2,10];
    warntype[4] = [2,3,5,7,11,10];

    warnopt[0] = {};
    warnopt[1] = {value:"1",text:"安全锁异常"};warnopt[2] = {value:"2",text:"泄露异常"};
    warnopt[3] = {value:"3",text:"胎压"};warnopt[4] = {value:"4",text:"油量异常"};
    warnopt[5] = {value:"5",text:"超速异常"};warnopt[6] = {value:"6",text:"停车异常"};
    warnopt[7] = {value:"7",text:"疲劳驾驶"};warnopt[8] = {value:"8",text:"急刹车异常"};
    warnopt[9] = {value:"9",text:"急加速异常"};warnopt[10] = {value:"10",text:"车辆事故"};
    warnopt[11] = {value:"11",text:"超载异常"};

   /*
    yg_type[0] = {value:"2",text:"泄露异常"};yg_type[1] = {value:"3",text:"胎压异常"};yg_type[2] = {value:"5",text:"超速异常"};
    yg_type[3] = {value:"7",text:"疲劳驾驶"};yg_type[4] = {value:"11",text:"超载异常"};yg_type[5] = {value:"10",text:"车辆事故"};

    xf_type[0] = {value:"2",text:"泄露异常"};xf_type[1] = {value:"10",text:"车辆事故"};

    hb_type[0] = {value:"2",text:"泄露异常"};

    jj_type[0] = {value:"5",text:"超速异常"}; jj_type[1] = {value:"7",text:"疲劳驾驶"}; jj_type[2] = {value:"11",text:"超载异常"};
    jj_type[3] = {value:"10",text:"车辆事故"};

    aj_type[0] = {value:"2",text:"泄露异常"};aj_type[1] = {value:"3",text:"胎压异常"};aj_type[2] = {valie:"5",text:"超速异常"};
    aj_type[3] = {value:"7",text:"疲劳驾驶"};aj_type[4] = {value:"11",text:"超载异常"};aj_type[5] = {value:"10",text:"车辆事故"};
    */
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
    var panel = document.getElementById("table1").parentNode;
    var width = panel.offsetWidth - 10;
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
});
