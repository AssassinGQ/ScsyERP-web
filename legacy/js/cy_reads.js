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

    $("#b_add").click(function () {
        window.open("cy_read.html");
    });

    $("#b_mend").click(function () {
        var row =  $("#table1").bootstrapTable('getSelections')[0];
        if(row == null){
            alert("请选择条目");
            return;
        };
        window.open("cy_read.html");
    });

    $('#table1').bootstrapTable({
        columns: [
            {radio: true, width:'3%'},
            {field: 'sid', title: '文献编号', align:'center',valign:'middle',sortable:true},
            {field: 'drivername', title: '文献名称', align:'center',valign:'middle'}
        ],
        sortable:true,
        height:290,
        formatNoMatches: function () {
            return '无符合条件的记录';
        }
    });

});
