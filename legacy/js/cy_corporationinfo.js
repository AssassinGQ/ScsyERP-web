/**
 * Created by sjq on 2017/8/14.
 */

var url_query = "http://120.76.219.196:85/user/query_corporation";
var url_update = "http://120.76.219.196:85/user/update_corporation";
var token;
var sid;

function getCookie(name) {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg)) return unescape(arr[2]);
    else return null;
}

$(document).ready(function() {
    token = getCookie("token");
    sid = getCookie("sid");
    var data = {};
    data["token"] = token;
    data["sid"] = sid;

    $.ajax({
        url:url_query,
        type:'get',
        dataType:'json',
        data:data,
        success:function (response) {
            if(response.status == 0){
                var info_form = document.getElementById("info_form");
                var inputs = info_form.getElementsByTagName("input");
                var info = response.content;
                for(var i = 0; i < inputs.length; i++){
                    var input = inputs[i];
                    if(info[input.id] != null){
                        input.value = info[input.id];
                    }
                }
            }
            else{
                alert(decodeURI(response.msg));
            }
        },
        error:function () {
            alert("无法获取用户信息")
        }
    });

    $("#mend").click(function () {
        var info_form = document.getElementById("info_form");
        var inputs = info_form.getElementsByTagName("input");
        var data = {};
        data["token"] = token;
        data["sid"] = sid;
        for(var i = 0; i < inputs.length; i++){
            var input = inputs[i];
            if(input.value.length != 0){
                data[input.id] = input.value;
            }
        }
        $.ajax({
            url:url_update,
            type:'post',
            dataType:'json',
            data:data,
            success:function (response) {
                if(response.status == 0){
                    alert("操作成功")
                }
                else {
                    alert(decodeURI(response.msg));
                }
            },
            error:function () {
                alert("操作失败");
            }
        })
    })
});
