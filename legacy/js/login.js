/**
 * Created by sjq on 2017/6/27.
 */
var url_login = "http://120.76.219.196:85/user/login";
var url_vode = "http://120.76.219.196:85/user/getvcode";
var url_change = "http://120.76.219.196:85/user/changepsw";
var url_register = "http://120.76.219.196:85/user/register_corporation";
var url_register1 = "http://120.76.219.196:85/user/register_corporation";
var url_register2 = "http://120.76.219.196:85/user/register_manufacturer";
var url_register3 = "http://120.76.219.196:85/user/register_government";
var url_chengyun = "cy_order.html";
var url_tuoyun = "ty_xiadan.html";
var url_shouhuo = "sh_order.html";
var url_government = "gov_monitor.html";

function setCookie(name,value) {
    document.cookie = name + "="+ escape (value);
}

$(document).ready(function() {
    if(!(document.cookie || navigator.cookieEnabled)){
        alert('请启用浏览器cookie');
    }
    $("#r-type").change(function () {
        if($(this).val() == 3){
            $("#dept").css("display","block");
        }
        else{
            $("#dept").css("display","none");
        }
    });

    $("#login-btn").click(function () {
        var data = {};
        var info = document.getElementById("info1");
        data["username"] = $("#l-username").val();
        data["password"] = $("#l-password").val();
        $.ajax({
            type:'post',
            url:url_login,
            data:data,
            dataType:'json',
            success:function (response) {
                if(response.status == "0"){
                    var token = response.content.token;
                    setCookie("token",token);
                    var type = response.content.type;
                    setCookie("type",type);
                    var corporationsid = response.content.corporationsid;
                    var sid = response.content.usersid;
                    setCookie("sid",sid);
                    setCookie("corporationsid",corporationsid);
                    var dept = response.content.dept;
                    setCookie("dept",dept);
                    if(type == 4 || type == 3){
                        setCookie("cur_page","order");
                        window.location.href = url_chengyun;
                    }
                    else if(type == 1){
                        setCookie("cur_page","xiadan");
                        window.location.href = url_tuoyun;
                    }
                    else if(type == 2){
                         window.location.href = url_shouhuo;
                    }
                    else if(type == 6){
                        setCookie("cur_page","accident");
                        window.location.href = url_government;
                    }
                }
                else{
                    info.innerText = decodeURI(response.msg);
                }
            },
            error:function () {
                info.innerText = "操作错误";
            }
        })
    });

    $("#forget").click(function () {
        $("#forget_modal").modal();
    })

    $("#getvode").click(function () {
        var phone = $("#phone").val();
        if(phone.length != 0){
            $.ajax({
                url:url_vode,
                type:'get',
                dataType:'json',
                data:{phone:phone},
                success:function (response) {
                    alert(JSON.stringify(response.content.vcode));
                }
            })
        }
    })

   $("#password").click(function () {
       var data = {};
       data["phone"] = $("#phone").val();
       data["vcode"] = $("#vcode").val();
       data["password"] = $("#newpassword").val();
       if(data["phone"].length == 0 || data["vcode"].length == 0 || data["password"].length == 0){
           $("#password_info").text("请完善信息");
           return;
       }
       $.ajax({
           url:url_change, type:'post',dataType:'json',data:data,
           success:function (response) {
               $("#password_info").text(response.msg) ;
           }
       })
   })


});
