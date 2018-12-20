/**
 * Created by sjq on 2017/7/25.
 */
var url_query = "http://120.76.219.196:85/basic_info/route_info/query";
var url_update = "http://120.76.219.196:85/basic_info/route_info/update";
var url_delete = "http://120.76.219.196:85/basic_info/route_info/delete";
var url_add = "http://120.76.219.196:85/basic_info/route_info/create";

$(document).ready(function() {

    $('#table1').bootstrapTable({
        columns: [
            {radio: true, width:'4%'},
            {field: 'name', title: '路线名称',align:'center'},
            {field: 'transportdistance', title: '路线里程',align:'center'},
            {field: 'transportsrc', title: '路线起点',align:'center'},
            {field: 'transportdst', title: '路线终点',align:'center'},
            {field: 'viaprovince', title: '途径省份',align:'center'},
            {field: 'remark', title: '备注',align:'center'}
        ],
        striped:true,
        height:290,
        formatNoMatches: function () {
            return '无符合条件的记录';
        }
    });
    search();

});
