/**
 * Created by sjq on 2017/4/24.
 */
var seller_query = "http://120.76.219.196:85/basic_info/seller_info/query";
var seller_delete = "http://120.76.219.196:85/basic_info/seller_info/delete";
var seller_add = "http://120.76.219.196:85/basic_info/seller_info/create";
var seller_update = "http://120.76.219.196:85/basic_info/seller_info/update";
var buyer_query = "http://120.76.219.196:85/basic_info/buyer_info/query";
var buyer_delete = "http://120.76.219.196:85/basic_info/buyer_info/delete";
var buyer_add = "http://120.76.219.196:85/basic_info/buyer_info/create";
var buyer_update = "http://120.76.219.196:85/basic_info/buyer_info/update";
var url_query = "http://120.76.219.196:85/basic_info/seller_info/query";
var url_delete = "http://120.76.219.196:85/basic_info/seller_info/delete";
var url_add = "http://120.76.219.196:85/basic_info/seller_info/create";
var url_update = "http://120.76.219.196:85/basic_info/seller_info/update";

$(document).ready(function() {
    $("#tab1").click(function () {
        url_add = seller_add;
        url_query = seller_query;
        url_delete = seller_delete;
        url_update = seller_update;
        if($("#tab1").hasClass("active") == false){
            $("#table1").bootstrapTable('removeAll');
            search();

        }
    });
    $("#tab2").click(function () {
        url_add = buyer_add;
        url_query = buyer_query;
        url_delete = buyer_delete;
        url_update = buyer_update;
        if($("#tab2").hasClass("active") == false){
            $("#table1").bootstrapTable('removeAll');
            search();
        }
    });

    $('#table1').bootstrapTable({
        columns: [
            {radio: true, width:'5%'},
            {field: 'name', title: '客户名称',align:'center'},
            {field: 'username', title: '账号',align:'center'},
            {field: 'manname', title: '联系人',align:'center'},
            {field: 'phone', title: '联系电话',align:'center'},
            {field: 'address', title: '默认地址',align:'center'}
        ],
        height:290,
        formatNoMatches: function () {
            return '无符合条件的记录';
        }
    });
    search();


});
