var url_query = "http://120.76.219.196:85/basic_info/trailer_info/query";
var url_update = "http://120.76.219.196:85/basic_info/trailer_info/update";
var url_delete = "http://120.76.219.196:85/basic_info/trailer_info/delete";
var url_add = "http://120.76.219.196:85/basic_info/trailer_info/create";


$(document).ready(function() {
    $('#table1').bootstrapTable({
        columns: [
            {radio: true, width:'4%'},
            {field: 'trailernumber', title: '车牌号', align:'center'},
            {field: 'weight', title: '吨位',align:'center'},
            {field: 'vol', title: '容积',align:'center'},
            {field: 'model', title: '厂牌型号',align:'center'}
        ],
        striped:true,
        height:290,
        formatNoMatches: function () {
            return '无符合条件的记录';
        }
    });
    search();
});
