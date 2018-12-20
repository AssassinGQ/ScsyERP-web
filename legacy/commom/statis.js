/**
 * Created by sjq on 2017/8/13.
 */
var url_corporation = "http://120.76.219.196:85/user/query_corporation";
var url_buyer = "http://120.76.219.196:85/basic_info/buyer_info/query";
var url_seller = "http://120.76.219.196:85/basic_info/seller_info/query";
var url_product = "http://120.76.219.196:85/basic_info/product_info/query";
var url_truck = "http://120.76.219.196:85/basic_info/truck_info/query";
var url_driver = "http://120.76.219.196:85/basic_info/escort_info/query";
function parmfun(param) {
    var param = {};
    param["token"] = token;
    param["limit"] = limit;
    var year = $("#year").val();
    param["year"] = JSON.stringify(year);
    var month = $("#month").val();
    if(month != null){
        param["month"] = JSON.stringify(month);
    }
    if(corporationsid != -1){
        param["corporationsid"] = corporationsid;
    }
    var objecttype = $("#objecttype").val();
    var objectsid;
    param["objecttype"] = objecttype;
    if(objecttype == 1){
        objectsid = $("#corporationsid").val();
    }
    else if(objecttype == 2){
        objectsid = $("#driversid").val();
    }
    else if(objecttype == 3){
        objectsid = $("#sellersid").val();
    }
    else if(objecttype == 4){
        objectsid = $("#trucksid").val();
    }

    if(objectsid != null && objectsid[0] != "-1"){
        param["objectsid"] = JSON.stringify(objectsid);
    }
    return param;
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

$(document).ready(function() {

    if(document.getElementById("corporationsid") != null){
        initSelect(url_corporation,{token:token},$("#corporationsid"),"name","sid");
    }
    if(document.getElementById("driversid") != null){
        initSelect(url_driver,{token:token,type:0},$("#driversid"),"name","sid");
    }
    if(document.getElementById("trucksid") != null){
        initSelect(url_truck,{token:token},$("#trucksid"),"trucknumber","sid");
    }
    if(document.getElementById("sellersid") != null){
        initSelect(url_seller,{token:token},$("#sellersid"),"name","sid");
    }
    var corporation = $("#corporation");
    var driver = $("#driver");
    var truck = $("#truck");
    var seller = $("#seller");

    $("#objecttype").change(function () {
        var type = $(this).val();
        if(type == 1){
            corporation.css("display","block");
            truck.css("display","none");
            driver.css("display","none");
            seller.css("display","none");
        }
        if(type == 2){
            corporation.css("display","none");
            truck.css("display","none");
            driver.css("display","block");
            seller.css("display","none");
        }
        else if(type == 3){
            corporation.css("display","none");
            truck.css("display","none");
            driver.css("display","none");
            seller.css("display","block");
        }
        else if(type == 4){
            corporation.css("display","none");
            truck.css("display","block");
            driver.css("display","none");
            seller.css("display","none");
        }
    });

    $("#search1").click(function () {
        var year = $("#year").val();
        var month = $("#month").val();
        if(year == null){
            alert("请选择时间");
            return;
        }
        if(year.length > 1 && (month != null && month.length > 0)){
            alert("请选择唯一年份");
            return;
        }
        if(month != null){url_query = url_month;}
        else{url_query = url_year;}
        search();
    });



});
