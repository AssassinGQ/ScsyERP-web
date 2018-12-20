/**
 * Created by Administrator on 2017/11/2.
 */
/**
 * Created by Administrator on 2017/11/2.
 */
var url_query = "";
var parm_query = {};
var parm_delete = {};
var d = {};
var response;
var total;
var sellersid;
var limit = "10";
var cur_page;
var token;

$(document).ready(function() {

    $('#table1').bootstrapTable({
        columns: [
            {radio: true, width:'3%'},
            {field: 'sid', title: '司机姓名', align:'center',valign:'middle',sortable:true},
            {field: 'drivername', title: '考试时间', align:'center',valign:'middle'},
            {field: 'drivername', title: '考试成绩', align:'center',valign:'middle'},
        ],
        sortable:true,
        height:290,
        formatNoMatches: function () {
            return '无符合条件的记录';
        }
    });

});
