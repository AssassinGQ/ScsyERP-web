/**
 * Created by Administrator on 2017/10/21.
 */
$(document).ready(function() {
    $("#submit").click(function () {
        var read = {};
        read["title"] = $("#title").val();
        read["content"] = $("#content").val();
        alert(JSON.stringify(read));

    });
});
