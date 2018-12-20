/**
 * Created by sjq on 2017/8/1.
 */
var url_query = "http://120.76.219.196:85/basic_info/admin_info/query";
var url_update = "http://120.76.219.196:85/basic_info/admin_info/update";
var url_delete = "http://120.76.219.196:85/basic_info/admin_info/delete";
var url_add = "http://120.76.219.196:85/basic_info/admin_info/create";
function tran_load(d) {
    for(var i = 0; i < d.length; i++){
        if(d[i]["dept"] == 0){d[i]["dept"] = "仓储";}
        else if(d[i]["dept"] == 1){d[i]["dept"] = "危化品";}
        else if(d[i]["dept"] == 2){d[i]["dept"] = "财务";}
        else if(d[i]["dept"] == 3){d[i]["dept"] = "信息";}
        else if(d[i]["dept"] == 4){d[i]["dept"] = "经理";}
    }
    return d;
}
$(document).ready(function() {
    $('#table1').bootstrapTable({
        columns: [
            {radio: true, width:'4%'},
            {field: 'username', title: '用户名', align:'center'},
            {field: 'name', title: '姓名', align:'center'},
            {field: 'dept', title: '部门', align:'center'},
            {field: 'phone', title: '手机号',align:'center'},
            {field: 'email', title: '邮箱',align:'center'}
        ],
        striped:true,
        height:290,
        formatNoMatches: function () {
            return '无符合条件的记录';
        }
    });
    search();

});
