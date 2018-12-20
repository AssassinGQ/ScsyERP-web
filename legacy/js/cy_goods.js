/**
 * Created by sjq on 2017/6/1.
 */
var url_add = "http://120.76.219.196:85/basic_info/product_info/create";
var url_query = "http://120.76.219.196:85/basic_info/product_info/query";
var url_delete = "http://120.76.219.196:85/basic_info/product_info/delete";
var url_update = "http://120.76.219.196:85/basic_info/product_info/update";

function tran_load(d) {
    for(var i = 0; i < d.length; i++)
    {
        if(d[i].type != null){d[i].type = d[i].type+"类"}
        if(d[i].packettype == '1')
        {
            d[i].packettype = "罐装";
        }
        else if(d[i].packettype == '2')
        {
            d[i].packettype = "捆绑";
        }
    }
    return d;
}

$(document).ready(function() {
    $('#table1').bootstrapTable({
        columns: [
            {radio: true, width:'5%'},
            {field: 'name', title: '货物名称', align:'center'},
            {field: 'unnumber', title: '联合国编号', align:'center'},
            {field: 'type', title: '货物类别', align:'center'},
            {field: 'packettype', title: '包装规格', align:'center'}
        ],
        striped:true,
        height:290,
        formatNoMatches: function () {
            return '无符合条件的记录';
        }
    });
    search();
});
