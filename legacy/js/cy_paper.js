/**
 * Created by Administrator on 2017/10/21.
 */
function getCookie(name) {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg)) return unescape(arr[2]);
    else return null;
}

var url_create = url + "exam/create";

$(document).ready(function() {
    var token = getCookie("token")
    alert(url_create)
    $("#submit").click(function () {
        var qs = [];
        var questions = document.getElementsByClassName("question");
        for(var i = 0; i < questions.length; i++){
            var qa = {};
            qa["questionid"] = i+1;
            qa["type"] = 1;
            qa["score"] = 10;
            var q = questions[i].getElementsByTagName("textarea")[0];
            qa["question"] = q.value;
            var choices = {};
            var opts = questions[i].getElementsByTagName("input");
            choices["A"] = opts[0].value;
            choices["B"] = opts[1].value;
            choices["C"] = opts[2].value;
            choices["D"] = opts[3].value;
            qa["choices"] = choices;
            var select = questions[i].getElementsByTagName("select");
            var answer = $(select).find("option:selected").text();
            qa["answer"] = answer;
            qs[i] = qa;
        }
        qs = JSON.stringify(qs)
        alert(qs)
        var data = {};
        data["token"] = token;
        data["name"] = document.getElementById("title").value;
        data["desc"] = "test";
        data["questions"] = qs;

        $.ajax({
            url:url_create,
            type:'post',
            dataType:'json',
            data:data,
            success:function (response) {
                alert(JSON.stringify(response));
            },
            error:function () {
                alert("操作失败")
            }
        })
    });
});
