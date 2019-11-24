$(document).ready(function () {
    $('#client_manage_dt').dataTable({
        "bAutoWidth": true,
        "bSort": false,
        "bProcessing": true,
        "ajax": "../manualrecoverydata/",
        "columns": [
            {"data": "client_name"},
            {"data": "model"},
            {"data": "client_os"},

        ],

        "columnDefs": [{
            "targets": 0,
            "width": "240px",
            "mRender": function (data, type, full) {
                // return "<a id='edit' data-toggle='modal' data-target='#static1'>" + data + "</a><input type='text' value='" + full.data_path + "' hidden>" + "<input type='text' value='" + full.copy_priority + "' hidden>" + "<input type='text' value='" + full.target_client + "' hidden>"
                return "<a id='edit'  data-toggle='modal'  data-target='#mn_rcv_modal'>" + data + "</a>" + "<input type='text' value='" + full.model + "' hidden>"
            }
        }],
        "oLanguage": {
            "sLengthMenu": "&nbsp;&nbsp;每页显示 _MENU_ 条记录",
            "sZeroRecords": "抱歉， 没有找到",
            "sInfo": "从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
            "sInfoEmpty": '',
            "sInfoFiltered": "(从 _MAX_ 条数据中检索)",
            "sSearch": "搜索",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "前一页",
                "sNext": "后一页",
                "sLast": "尾页"
            },
            "sZeroRecords": "没有检索到数据",

        }
    });


    $('#mn_rcv_modal').on('show.bs.modal', function (e) {
        // 模态框点击位置
        var el = e.relatedTarget;
        var jQuery_el = $(el);

        // init
        // SQL Server
        $("#sqlserver_datetimepicker").val("");
        $("input[name='sqlserver_radios'][value='1']").prop("checked", true);
        $("input[name='sqlserver_radios'][value='2']").prop("checked", false);
        $("input[name='isoverwrite']").prop("checked", false);

        // File System
        $("#file_system_datetimepicker").val("");
        $("input[name='file_system_radio'][value='1']").prop("checked", true);
        $("input[name='file_system_radio'][value='2']").prop("checked", false);

        $("input[name='overwrite'][value='FALSE']").prop("checked", true);
        $("input[name='overwrite'][value='TRUE']").prop("checked", false);

        $("input[name='path'][value='1']").prop("checked", true);
        $("input[name='path'][value='2']").prop("checked", false);
        $("#mypath").val("");

        $("#fs_se_1").empty();
        $("#fs_se_1").append("<option value='\\'>\\</option>");

        // Active Directory
        $("#active_directory_datetimepicker").val("");
        $("input[name='active_directory_radios'][value='1']").prop("checked", true);
        $("input[name='active_directory_radios'][value='2']").prop("checked", false);


        // 相同字段：源客户端、目标客户端下拉
        $('#active_directory_source_client').val(el.innerText);
        $('#file_system_source_client').val(el.innerText);
        $('#sqlserver_source_client').val(el.innerText);


        var agent = jQuery_el.parent().next().html();
        if (agent.indexOf("File System") == -1) {
            $("a[href='#tab_filesystem']").parent().css("display", "none");
        } else {
            $("a[href='#tab_filesystem']").parent().css("display", "block");
        }
        if (agent.indexOf("SQL Server") == -1) {
            $("a[href='#tab_sqlserver']").parent().css("display", "none");
        } else {
            $("a[href='#tab_sqlserver']").parent().css("display", "block");
        }
        if (agent.indexOf("Active Directory") == -1) {
            $("a[href='#tab_active_directory']").parent().css("display", "none");
        } else {
            $("a[href='#tab_active_directory']").parent().css("display", "block");
        }


        // tab_init
        // 查看第一个display:block的tab展示
        // $('#agent_type_tab a:first').tab('show');
        $('ul#agent_type_tab li').each(function () {
            if ($(this).css('display') == 'block') {
                $(this).children("a").tab("show");
                return false;
            }
        });


        $("#agent").val(agent);

        // 加载file_system_tree
        var setting = {
            async: {
                enable: true,
                url: '../../getfiletree/',
                autoParam: ["id"],
                otherParam: {"clientName": $('#file_system_source_client').val()},
                dataFilter: filter
            },
            check: {
                enable: true,
                chkStyle: "checkbox",               //多选
                chkboxType: {"Y": "s", "N": "ps"}  //不级联父节点选择
            },
            view: {
                showLine: false
            },

        };

        function filter(treeId, parentNode, childNodes) {
            if (!childNodes) return null;
            for (var i = 0, l = childNodes.length; i < l; i++) {
                childNodes[i].name = childNodes[i].name.replace(/\.n/g, '.');
            }
            return childNodes;
        }

        $.fn.zTree.init($("#file_system_tree"), setting);


        // active_directory
        var activeDirectoryDatatable = $("#active_directory_backup_point").dataTable();
        activeDirectoryDatatable.fnClearTable(); //清空数据
        activeDirectoryDatatable.fnDestroy();
        $('#active_directory_backup_point').dataTable({
            "bAutoWidth": true,
            "bProcessing": true,
            "bSort": false,
            "ajax": "../../activedirectoryrecoverydata?clientName=" + $('#active_directory_source_client').val(),
            "columns": [
                {"data": "jobId"},
                {"data": "jobType"},
                {"data": "Level"},
                {"data": "StartTime"},
                {"data": "LastTime"},
                {"data": null},
            ],
            "columnDefs": [{
                "targets": -1,
                "data": null,
                "defaultContent": "<button  id='select' title='选择'  class='btn btn-xs btn-primary' type='button'><i class='fa fa-check'></i></button>"
            }],

            "oLanguage": {
                "sLengthMenu": "&nbsp;&nbsp;每页显示 _MENU_ 条记录",
                "sZeroRecords": "抱歉， 没有找到",
                "sInfo": "从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
                "sInfoEmpty": '',
                "sInfoFiltered": "(从 _MAX_ 条数据中检索)",
                "sSearch": "搜索",
                "oPaginate": {
                    "sFirst": "首页",
                    "sPrevious": "前一页",
                    "sNext": "后一页",
                    "sLast": "尾页"
                },
                "sZeroRecords": "没有检索到数据",

            }
        });

        $('#active_directory_backup_point tbody').on('click', 'button#select', function () {
            var table = $('#active_directory_backup_point').DataTable();
            var data = table.row($(this).parents('tr')).data();

            // oracle
            $("#active_directory_datetimepicker").val(data.LastTime);
            $("input[name='active_directory_radios'][value='1']").prop("checked", false);
            $("input[name='active_directory_radios'][value='2']").prop("checked", true);
            $("#active_directory_browseJobId").val(data.jobId);
        });

        $("#active_directory_recovery_time_redio_group").click(function () {
            if ($("input[name='active_directory_radios']:checked").val() == 1) {
                $("#active_directory_datetimepicker").val("");
            }
        });

        // file_system
        var fileSystemDatatable = $("#file_system_backup_point").dataTable();
        fileSystemDatatable.fnClearTable(); //清空数据
        fileSystemDatatable.fnDestroy();
        $('#file_system_backup_point').dataTable({
            "bAutoWidth": true,
            "bProcessing": true,
            "bSort": false,
            "ajax": "../../filesystemrecoverydata?clientName=" + $('#file_system_source_client').val(),
            "columns": [
                {"data": "jobId"},
                {"data": "jobType"},
                {"data": "Level"},
                {"data": "StartTime"},
                {"data": "LastTime"},
                {"data": null},
            ],
            "columnDefs": [{
                "targets": -1,
                "data": null,
                "defaultContent": "<button  id='select' title='选择'  class='btn btn-xs btn-primary' type='button'><i class='fa fa-check'></i></button>"
            }],

            "oLanguage": {
                "sLengthMenu": "&nbsp;&nbsp;每页显示 _MENU_ 条记录",
                "sZeroRecords": "抱歉， 没有找到",
                "sInfo": "从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
                "sInfoEmpty": '',
                "sInfoFiltered": "(从 _MAX_ 条数据中检索)",
                "sSearch": "搜索",
                "oPaginate": {
                    "sFirst": "首页",
                    "sPrevious": "前一页",
                    "sNext": "后一页",
                    "sLast": "尾页"
                },
                "sZeroRecords": "没有检索到数据",

            }
        });

        $('#file_system_backup_point tbody').on('click', 'button#select', function () {
            var table = $('#file_system_backup_point').DataTable();
            var data = table.row($(this).parents('tr')).data();

            // file_system
            $("#file_system_datetimepicker").val(data.LastTime);
            $("input[name='file_system_radios'][value='1']").prop("checked", false);
            $("input[name='file_system_radios'][value='2']").prop("checked", true);
            $("#file_system_browseJobId").val(data.jobId);
        });

        $("#file_system_recovery_time_redio_group").click(function () {
            if ($("input[name='file_system_radios']:checked").val() == 1) {
                $("#file_system_datetimepicker").val("");
            }
        });

        // sqlserver
        var sqlserverDatatable = $("#sqlserver_backup_point").dataTable();
        sqlserverDatatable.fnClearTable(); //清空数据
        sqlserverDatatable.fnDestroy();
        $('#sqlserver_backup_point').dataTable({
            "bAutoWidth": true,
            "bProcessing": true,
            "bSort": false,
            "ajax": "../../sqlserverrecoverydata?clientName=" + $('#sqlserver_source_client').val(),
            "columns": [
                {"data": "jobId"},
                {"data": "jobType"},
                {"data": "Level"},
                {"data": "StartTime"},
                {"data": "LastTime"},
                {"data": null},
            ],
            "columnDefs": [{
                "targets": -1,
                "data": null,
                "defaultContent": "<button  id='select' title='选择'  class='btn btn-xs btn-primary' type='button'><i class='fa fa-check'></i></button>"
            }],

            "oLanguage": {
                "sLengthMenu": "&nbsp;&nbsp;每页显示 _MENU_ 条记录",
                "sZeroRecords": "抱歉， 没有找到",
                "sInfo": "从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
                "sInfoEmpty": '',
                "sInfoFiltered": "(从 _MAX_ 条数据中检索)",
                "sSearch": "搜索",
                "oPaginate": {
                    "sFirst": "首页",
                    "sPrevious": "前一页",
                    "sNext": "后一页",
                    "sLast": "尾页"
                },
                "sZeroRecords": "没有检索到数据",

            },
            "initComplete": function (settings, data) {
                // 写入实例名
                $("#sqlserver_instance").val(data.data[0].instance);
            }
        });

        $('#sqlserver_backup_point tbody').on('click', 'button#select', function () {
            var table = $('#sqlserver_backup_point').DataTable();
            var data = table.row($(this).parents('tr')).data();

            // file_system
            $("#sqlserver_datetimepicker").val(data.LastTime);
            $("input[name='sqlserver_radios'][value='1']").prop("checked", false);
            $("input[name='sqlserver_radios'][value='2']").prop("checked", true);
            $("#sqlserver_browseJobId").val(data.jobId);
        });

        $("#sqlserver_recovery_time_redio_group").click(function () {
            if ($("input[name='sqlserver_radios']:checked").val() == 1) {
                $("#sqlserver_datetimepicker").val("");
            }
        });
    });


    $('#datetimepicker').datetimepicker({
        format: 'yyyy-mm-dd hh:ii:ss',
        pickerPosition: 'top-right'
    });
    $('#active_directory_recovery').click(function () {
        if ($("input[name='active_directory_radios']:checked").val() == "2" && $('#active_directory_datetimepicker').val() == "")
            alert("请输入时间。");
        else {
            if ($('#destClient').val() == "")
                alert("请选择目标客户端。");
            else {
                var myrestoreTime = "";
                if ($("input[name='active_directory_radios']:checked").val() == "2" && $('#active_directory_datetimepicker').val() != "") {
                    myrestoreTime = $('#active_directory_datetimepicker').val();
                }
                $.ajax({
                    type: "POST",
                    url: "../../do_active_directory_recovery/",
                    data: {
                        sourceClient: $('#active_directory_source_client').val(),
                        destClient: $('#active_directory_source_client').val(),
                        restoreTime: myrestoreTime,
                    },
                    success: function (data) {
                        alert(data);
                        $("#static1").modal("hide");
                    },
                    error: function (e) {
                        alert("恢复失败，请于客服联系。");
                    }
                });
            }
        }
    });

    $('#sqlserver_recovery').click(function () {
        if ($("input[name='sqlserver_radios']:checked").val() == "2" && $('#sqlserver_datetimepicker').val() == "")
            alert("请输入时间。");
        else {
            if ($('#destClient').val() == "") {
                alert("请选择目标客户端。");
            } else {
                var myrestoreTime = "";
                if ($("input[name='sqlserver_radios']:checked").val() == "2" && $('#sqlserver_datetimepicker').val() != "") {
                    myrestoreTime = $('#sqlserver_datetimepicker').val();
                }
                var iscover = "FALSE";
                if ($('#isoverwrite').is(':checked')) {
                    iscover = "TRUE";
                }
                $.ajax({
                    type: "POST",
                    url: "../../do_sqlserver_recovery/",
                    data: {
                        instanceName: $('#sqlserver_instance').val(),
                        sourceClient: $('#sqlserver_dest_client').val(),
                        destClient: $('#sqlserver_source_client').val(),
                        restoreTime: myrestoreTime,
                        iscover: iscover,
                    },
                    success: function (data) {
                        alert(data);
                    },
                    error: function (e) {
                        alert("恢复失败，请于客服联系。");
                    }
                });
            }
        }
    });

    $('#file_system_recovery').click(function () {
        if ($("input[name='file_system_radio']:checked").val() == "2" && $('#file_system_datetimepicker').val() == "")
            alert("请输入时间。");
        else {
            if ($('#destClient').val() == "")
                alert("请选择目标客户端。");
            else {
                if ($("input[name='path']:checked").val() == "2" && $('#mypath').val() == "")
                    alert("请输入指定路径。");
                else {
                    var myrestoreTime = "";
                    if ($("input[name='file_system_radio']:checked").val() == "2" && $('#file_system_datetimepicker').val() != "")
                        myrestoreTime = $('#file_system_datetimepicker').val();
                    var iscover = $("input[name='overwrite']:checked").val();

                    var mypath = "same";
                    if ($("input[name='path']:checked").val() == "2")
                        mypath = $('#mypath').val();
                    var treeObj = $.fn.zTree.getZTreeObj("file_system_tree");
                    var nodes = treeObj.getCheckedNodes(true);
                    var selectedfile = "";
                    $("#fs_se_1 option").each(function () {
                            var txt = $(this).val();
                            selectedfile = selectedfile + txt + "*!-!*"
                        }
                    );
                    $.ajax({
                        type: "POST",
                        url: "../../do_file_system_recovery/",
                        data: {
                            sourceClient: $('#file_system_source_client').val(),
                            destClient: $('#file_system_dest_client').val(),
                            restoreTime: myrestoreTime,
                            iscover: iscover,
                            mypath: mypath,
                            selectedfile: selectedfile,
                        },
                        success: function (data) {
                            alert(data);
                        },
                        error: function (e) {
                            alert("恢复启动失败，请于客服联系。");
                        }
                    });
                }
            }
        }
    })


    // file system select path
    $('#selectpath').click(function () {
        $('#fs_se_1').empty();
        var treeObj = $.fn.zTree.getZTreeObj("file_system_tree");
        var nodes = treeObj.getCheckedNodes(true);
        for (var k = 0, length = nodes.length; k < length; k++) {
            var halfCheck = nodes[k].getCheckStatus();
            if (!halfCheck.half) {
                $("#fs_se_1").append("<option value='\\" + nodes[k].id + "\\'>\\" + nodes[k].id + "\\</option>");
            }
        }
        if (nodes.length == 0)
            $("#fs_se_1").append("<option value='\\'>\\</option>");
    })

});