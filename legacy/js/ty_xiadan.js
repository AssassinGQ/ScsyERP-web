/**
 * Created by sjq on 2017/4/5.
 */
var url_query = "http://120.76.219.196:85/order/query";
var url_delete = "http://120.76.219.196:85/basic_info/product_info/delete";
var url_user = "http://120.76.219.196:85/user/query_corporation";
var url_buyer = "http://120.76.219.196:85/basic_info/buyer_info/query";
var url_seller = "http://120.76.219.196:85/basic_info/seller_info/query";
var url_goods = "http://120.76.219.196:85/basic_info/product_info/query";
var url_order = "http://120.76.219.196:85/order/order";
var total;
var token;
var sid;
var corporationsid;
var sellerinfo = [];
var buyerinfo = [];
var goodsinfo = [];

function getCookie(name) {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg)) return unescape(arr[2]);
    else return null;
}
function buyerinit() {
    $.ajax({
        url:url_buyer,
        dataType:'json',
        type:'get',
        data:{token:token,corporationsid:corporationsid},
        async:false,
        success:function (response) {
            if(response.status == 0){
                buyerinfo = response.content.data;
                var select = document.getElementById("buyer");
                select.options[0] = new Option("",-1);
                for(var i = 0; i < buyerinfo.length; i++){
                    select.options[i+1] = new Option(buyerinfo[i].name,buyerinfo[i].sid);
                }
                $(select).change(function () {
                    var sid = this.value;
                    if(sid == -1){
                        document.getElementById("unloadaddr").value = "";
                        document.getElementById("buyerman").value = "";
                        document.getElementById("buyerphone").value = "";
                        return;
                    }
                    var option = {};
                    for(var i = 0; i < buyerinfo.length; i++){
                        if(sid == buyerinfo[i].sid){
                            option = buyerinfo[i];
                            break;
                        }
                    }
                    if(option["address"] != null){
                        document.getElementById("unloadaddr").value = option["address"];
                    }
                    if(option["manname"] != null){
                        document.getElementById("buyerman").value = option["manname"];
                    }
                    if(option["phone"] != null){
                        document.getElementById("buyerphone").value = option["phone"];
                    }
                })
            }
            else {
                alert(decodeURI(response.msg))
            }
        }
    })
}
function goodsinit() {
    $.ajax({
        url:url_goods,
        dataType:'json',
        type:'get',
        data:{token:token,corporationsid:corporationsid},
        async:false,
        success:function (response) {
            if(response.status == 0){
                goodsinfo = response.content.data;
                var select = document.getElementById("product");
                select.options[0] = new Option("",-1);
                for(var i = 0; i < goodsinfo.length; i++){
                    select.options[i+1] = new Option(goodsinfo[i].name,goodsinfo[i].sid);
                }
                $(select).change(function () {
                    var sid = this.value;
                    if(sid == -1){
                        document.getElementById("producttype").value = "";
                        document.getElementById("packettype").value = "";
                        return;
                    }
                    var option = {};
                    for(var i = 0; i < goodsinfo.length; i++){
                        if(sid == goodsinfo[i].sid){
                            option = goodsinfo[i];
                            break;
                        }
                    }
                    if(option["type"] != null){
                        document.getElementById("producttype").value = option["type"];
                        document.getElementById("packettype").value = option["packettype"];
                    }
                })
            }
        }
    })
}
function sellerinit() {
    $.ajax({
        url:url_seller,
        dataType:'json',
        type:'get',
        data:{token:token,sid:sid},
        async:false,
        success:function (response) {
            if(response.status == 0){
                sellerinfo = response.content.data;
                var select = document.getElementById("seller");
                select.options[0] = new Option(sellerinfo[0].name,sid);
                var element;
                element = document.getElementById("loadaddr");
                if(sellerinfo[0].address != null){
                    element.value = sellerinfo[0].address;
                }
                element = document.getElementById("sellerman");
                if(sellerinfo[0].manname != null){
                    element.value = sellerinfo[0].manname;
                }
                element = document.getElementById("sellerphone");
                if(sellerinfo[0].phone != null){
                    element.value = sellerinfo[0].phone;
                }

            }
        }
    })
}
function corporationinit() {
    var data = {};
    data["token"] = token;
    data["sid"] = corporationsid;
    $.ajax({
        url:url_user,
        dataType:'json',
        type:'get',
        data:data,
        async:false,
        success:function (response) {
            if(response.status == 0){
                var corporationname = response.content.corporationname;
                var select = document.getElementById("corporation");
                select.options[0] = new Option(corporationname,corporationsid);
            }
        }
    })
}
$(document).ready(function() {

    token = getCookie("token");
    sid = getCookie("sid");
    corporationsid = getCookie("corporationsid");

    goodsinit();
    sellerinit();
    corporationinit();
    buyerinit();

    $("#add").click(function () {
        var data = {};
        data["token"] = token;
        var order = document.getElementById("order");
        var inputs = order.getElementsByTagName("input");
        for(var  i = 0; i < inputs.length; i++){
            var input = inputs[i];
            if(input.value.length != 0){
                data[input.id] = input.value;
            }
        }
        var selects = document.getElementsByTagName("select");
        for(var i = 0; i < selects.length; i++){
            var select = selects[i];
            var index = select.selectedIndex;
            if(index != -1 && select.options[index].value != -1){
                data[select.id] = select.options[index].text;
                data[select.id+"sid"] = select.options[index].value;
            }
        }
        var unloaddateddl = data["unloaddateddl"];
        if(unloaddateddl != null && unloaddateddl.length != 0){
            data["unloaddateddl"] = new Date(unloaddateddl).getTime();
        }
        var loaddateddl = data["loaddateddl"];
        if(loaddateddl != null && loaddateddl.length != 0){
            data["loaddateddl"] = new Date(loaddateddl).getTime();
        }
        $.ajax({
            url:url_order,
            type:'post',
            dataType:'json',
            data:data,
            success:function (response) {
                if(response.status == 0){
                    alert("下单成功");
                }
                if(response.status != 0){
                    alert(decodeURI(response.msg));
                }

            }
        })
    })



});
