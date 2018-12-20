/**
 * Created by sjq on 2017/9/1.
 */
$(document).ready(function() {
    $('#table1').bootstrapTable({
        columns: [
            {radio: true, width:'5%'},
            {field: 'ordersid', title: '订单号',align:'center'},
            {field: 'sid', title: '费用清单号',align:'center'},
            {field: 'drivername', title: '驾驶员',align:'center'},
            {field: 'escortname', title: '押运员',align:'center'},
            {field: 'addfueltotal', title: '油费合计',align:'center'},
            {field: 'addfuelvol', title: '加油量合计',align:'center'},
            {field: 'roadtolltotal', title: '过路费合计',align:'center'},
            {field: 'allowanceunloadroadtoll', title: '空车过路奖励合计',align:'center'},
            {field: 'allowanceloadroadtoll', title: '重车过路奖励合计',align:'center'},
            {field: 'miletotal', title: '里程共计',align:'center'},
            {field: 'allowancetotal', title: '补助奖励合计',align:'center'},
            {field: 'realloadweight', title: '重车过磅记录', align:'center',formatter:'formatter',events:operateEvents1},
            {field: 'realunloadweight', title: '空车过磅记录', align:'center',formatter:'formatter',events:operateEvents2},
            {field: 'images', title: '票据图片', align:'center',formatter:'formatter',events:operateEvents4},
            {field: 'addfuel', title: '加油记录',align:'center',formatter:'formatter',events:operateEvents3}
        ],
        height:290,
        formatNoMatches: function () {
            return '无符合条件的记录';
        }
    });
});
