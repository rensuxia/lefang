$(function () {
    var template_address = $('#lefang_qygl_right').text();
    var templateFn_address = _.template(template_address);
    $('.qygl-right').append(templateFn_address);

    //查询发票地址

    var ymr = _.template('<tr>\
                            <td style="display:none" class="id"><%=data.id%></td>\
                            <td><%=data.username%></td>\
                            <td><%=data.province+data.city%></td>\
                            <td><%=data.address%></td>\
                            <td><%=data.postcodes%></td>\
                            <td><%=data.phone_number%></td>\
                            <td><a href="#" class="del">删除</a><a href="#" class="xian">|</a><a href="#" class="update">编辑</a></td>\
                            <td>默认地址</td>\
                        </tr>');

    var nmr = _.template('<tr>\
                            <td style="display:none" class="id"><%=data.id%></td>\
                            <td><%=data.username%></td>\
                            <td><%=data.province+data.city+data.area%></td>\
                            <td><%=data.address%></td>\
                            <td><%=data.postcodes%></td>\
                            <td><%=data.phone_number%></td>\
                            <td><a href="#" class="del">删除</a><a href="#" class="xian">|</a><a href="#" class="update">编辑</a></td>\
                            <td><a href="#" class="set">设为默认</a></td>\
                        </tr>');

    var dataArray = [];//定义存放所有请求结果的数组

    var stance = new MilkT(queryInvoiceAddress, 1);
    stance.send({
        usercode: store.get('usercode')
    })
        .done(function (data) {
            var resultArray = data.addressPostcodesEntity;
            var compiled;

            for (var i = 0; i < resultArray.length; i++) {
                dataArray[resultArray[i].id] = resultArray[i];//将请求结果逐个存入数组
                resultArray[i].status == '1' ? compiled = ymr : compiled = nmr;
                var templateTest = compiled({ 'data': resultArray[i] });
                $('.table-bordered').append(templateTest);
            }


            //删除发票地址
            $('.del').on('click', function () {
                var stance = new MilkT(deleteInvoiceAddress, 3);
                var id = $(this).parent().prevAll().last().text();
                var tr = $(this).parent().parent();
                stance.send({
                    id: id
                })
                    .done(function (data) {
                        if (data.value == 1) {
                            tr.hide();
                        }
                    })
                    .fail(function () {
                        alert('删除失败');
                    })

            })

            //设为默认发票地址
            $('.set').on('click', function () {
                var stance = new MilkT(setInvoiceAddress, 3);
                var id = Number($(this).parent().prevAll().last().text());
                stance.send({
                    usercode: store.get('usercode'),
                    status: '1',
                    id: id
                })
                    .done(function (data) {
                        if (data.value == 1) {
                            store.remove('defaultAddress');
                            //存储设为默认地址的整条数据
                            store.set('defaultAddress', dataArray[id]);
                            alert('设置默认地址成功');
                            window.location.reload();
                        }
                    })
                    .fail(function () {
                        alert('设为默认地址失败');
                    })

            })

            /*点击修改*/
            function openWindow() {
                window.open(
                    'D-invoice_update.html',
                    'newwindow',
                    'height=100,width=600,height=450,top=100,left=300,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no, status=no'
                )
            }

            $('.update').on('click', function () {
                var x = $(this).parent().parent().index() - 2;
                store.set('data', resultArray[x]);
                openWindow();

            })



            /*发票地址维护页面点击添加地址*/

            $('#add').on('click', function () {
                window.open(
                    'invoice_add.html',
                    'newwindow',
                    'height=100,width=600,height=450,top=100,left=300,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no, status=no'
                )
            })



        })

})