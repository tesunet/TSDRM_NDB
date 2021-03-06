$(document).ready(function () {
    $('#target_dt').dataTable({
        "bAutoWidth": true,
        "bSort": false,
        "bProcessing": true,
        "ajax": "../target_data/",
        "columns": [
            {"data": "id"},
            {"data": "client_id"},
            {"data": "client_name"},
            {"data": "agent"},
            {"data": "os"},
            {"data": null}
        ],

        "columnDefs": [{
            "targets": -1,
            "data": null,
            "width": "100px",
            "defaultContent": "<button  id='edit' title='编辑' data-toggle='modal'  data-target='#static'  class='btn btn-xs btn-primary' type='button'><i class='fa fa-edit'></i></button><button title='删除'  id='delrow' class='btn btn-xs btn-primary' type='button'><i class='fa fa-trash-o'></i></button>"
        }],
        "oLanguage": {
            "sLengthMenu": "每页显示 _MENU_ 条记录",
            "sZeroRecords": "抱歉， 没有找到",
            "sInfo": "从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
            "sInfoEmpty": "没有数据",
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
    // 行按钮
    $('#target_dt tbody').on('click', 'button#delrow', function () {
        if (confirm("确定要删除该条数据？")) {
            var table = $('#target_dt').DataTable();
            var data = table.row($(this).parents('tr')).data();
            $.ajax({
                type: "POST",
                url: "../target_del/",
                data: {
                    target_id: data.id,
                },
                success: function (data) {
                    if (data.ret == 1) {
                        table.ajax.reload();
                    }
                    alert(data.info);
                },
                error: function (e) {
                    alert("删除失败，请于管理员联系。");
                }
            });

        }
    });
    $('#target_dt tbody').on('click', 'button#edit', function () {
        var table = $('#target_dt').DataTable();
        var data = table.row($(this).parents('tr')).data();
        $("#target_id").val(data.id);
        $("#target").val(data.client_id);
        $("#os").val(data.os);
        $("#agent").val(data.agent);

        if (data.agent.indexOf("SQL Server") != -1) {
            $("#sqlserver_credit").show();
            $("#sqlserver_ip").val(data.sqlserver_ip);
            $("#sqlserver_username").val(data.sqlserver_username);
            $("#sqlserver_passwd").val(data.sqlserver_passwd);
            $("#sqlserver_db").val(data.sqlserver_db);
        } else {
            $("#sqlserver_ip").val(data.sqlserver_ip);
            $("#sqlserver_credit").hide();
            $("#sqlserver_username").val("");
            $("#sqlserver_passwd").val("");
            $("#sqlserver_db").val("");
        }

    });

    // 加载oracle_data
    // [{"clientname": "myrac1", "instance": "oracle_1", "agent": "Oracle Database", "clientid": 33},
    // {"clientname": "myrac2", "instance": "oracle_2", "agent": "Oracle Database", "clientid": 34},
    // {"clientname": "win-2qls3b7jx3v.hzx", "instance": "ORCL", "agent": "Oracle Database", "clientid": 3}]
    var client_list = JSON.parse($("#client_list").val());
    for (var i = 0; i < client_list.length; i++) {
        $("#target").append('<option value="' + client_list[i].clientid + '">' + client_list[i].clientname + '</option>');
    }

    // 切换
    $("#target").change(function () {
        var clientid = $(this).val();
        for (var i = 0; i < client_list.length; i++) {
            if (clientid == client_list[i].clientid) {
                $("#os").val(client_list[i].os);
                $("#agent").val(client_list[i].agent);
                break
            }
        }

        // 展示SQL Server展示
        for (var j = 0; j < client_list.length; j++) {
            if (clientid == client_list[j].clientid && client_list[j].has_sqlserver == 1) {
                $("#sqlserver_credit").show();
                break
            } else {
                $("#sqlserver_credit").hide();
            }
        }
    });

    $("#new").click(function () {
        $("#target_id").val("0");
        $("#target").val("");
        $("#agent").val("");
        $("#os").val("");

        $("#sqlserver_ip").val("");
        $("#sqlserver_username").val("");
        $("#sqlserver_passwd").val("");
        $("#sqlserver_db").val("");
    });

    $('#save').click(function () {
        var table = $('#target_dt').DataTable();
        $.ajax({
            type: "POST",
            dataType: 'json',
            url: "../target_save/",
            data: {
                target_id: $("#target_id").val(),
                client_id: $("#target").val(),
                client_name: $("#target").find("option:selected").text(),
                os: $("#os").val(),
                agent: $("#agent").val(),

                sqlserver_ip: $("#sqlserver_ip").val(),
                sqlserver_username: $("#sqlserver_username").val(),
                sqlserver_passwd: $("#sqlserver_passwd").val(),
                sqlserver_db: $("#sqlserver_db").val()
            },
            success: function (data) {
                if (data.ret == 1) {
                    $('#static').modal('hide');
                    table.ajax.reload();
                }
                alert(data.info);
            },
            error: function (e) {
                alert("页面出现错误，请于管理员联系。");
            }
        });
    })
});