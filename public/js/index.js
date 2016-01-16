$(function() {
    $('.dataTable').dataTable({
        "dom": "<'yearReport'<'row'<'report-search clearfix'f>r><'#moon'><'table-scrollable dt-year-final-paroll't><'row'<'report-extra'i><'report-pages'p>>>",
        "order": [],
        "bStateSave": true,
        "language": {
            sProcessing: "处理中...",
            sLengthMenu: "显示 _MENU_ 项结果",
            sZeroRecords: "没有匹配结果",
            sInfo: "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
            sInfoEmpty: "显示第 0 至 0 项结果，共 0 项",
            sInfoFiltered: "(由 _MAX_ 项结果过滤)",
            sInfoPostFix: "",
            sSearch: "任意信息搜索:",
            sUrl: "",
            sEmptyTable: "该月报表为空",
            sLoadingRecords: "载入中...",
            sInfoThousands: ",",
            oPaginate: {
                sFirst: "首页",
                sPrevious: "上页",
                sNext: "下页",
                sLast: "末页"
            },
            oAria: {
                sSortAscending: ": 以升序排列此列",
                sSortDescending: ": 以降序排列此列"
            }
        }
    });
});