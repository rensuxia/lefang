var order_code_Array=[];

$(function(){

    /*页面渲染*/
	var template_address = $('#invoice_Box').text();
    var templateFn_address = _.template(template_address);
    $('.qygl-right').append(templateFn_address);


    /*待开发票*/
    var stance = new MilkT(queryOrders, 3);
    stance.send({
    	usercode:store.get('usercode')
    })
    .done(function(data){
        var invoicesArray=data.value;
        order_code_Array[0]=invoicesArray;
        var compiled = _.template('<% _.forEach(resultArray, function(data) { %>\
            <tr>\
                <td class="bl"><input type="checkbox"></td>\
                <td><%= data.order_code %></td>\
                <td><%= data.product_name %></td>\
                <td><%= data.total_price %></td>\
                <td><%= data.invoice_header %></td>\
                <td><%= data.address %></td>\
                <td><%= data.username %></td>\
                <td class="br"><%= data.phone_number %></td>\
            </tr>\
            <% }); %>');

        var templateTest=compiled({ 'resultArray': invoicesArray});
        $('#waiteInvoiceTable').append(templateTest);

    })
    .fail(function(){
    	console.log('待开发票请求失败');
    })


    /*发票管理*/
    var stance = new MilkT(invoicesManage, 3);
    stance.send({
        usercode:store.get('usercode')
    })
    .done(function(data){
        var dataArray=data.value;
        // var dataArray=[
        // {'invoice_header':'江苏中添','issen':'1','product_name':'普梳环锭纺45支纱线','total_price':'1'},
        // {'invoice_header':'江苏中添','issen':'2','product_name':'普梳环锭纺45支纱线','total_price':'2'},
        // {'invoice_header':'江苏中添','issen':'2','product_name':'普梳环锭纺45支纱线','total_price':'3'},
        // {'invoice_header':'江苏中添','issen':'2','product_name':'普梳环锭纺45支纱线','total_price':'4'},
        // {'invoice_header':'江苏中添','issen':'1','product_name':'普梳环锭纺45支纱线','total_price':'5'}
        // ]
        var compiled;
        var ycp_compiled=_.template('\
                <tr class="data">\
                    <td class="bl"><input type="checkbox"></td>\
                    <td><%= data.total_price %></td>\
                    <td><%= data.product_name %></td>\
                    <td class="sy_pro_name"></td>\
                    <td><%= data.invoice_header %></td>\
                    <td class="br">已出票</td>\
                </tr>');
        var wcp_compiled=_.template('\
                <tr class="data">\
                    <td class="bl"><input type="checkbox"></td>\
                    <td><%= data.total_price %></td>\
                    <td><%= data.product_name %></td>\
                    <td class="sy_pro_name"></td>\
                    <td><%= data.invoice_header %></td>\
                    <td class="br">未出票</td>\
                </tr>');

        /*
        请求发票管理数据
        并将issen的1和2转为已出票和未出票
         */
        var y_cp=[];
        var w_cp=[];
        var cps=[];
        cps['y_cp']=y_cp;
        cps['w_cp']=w_cp;
        for(var i=0;i<dataArray.length;i++){
            if(dataArray[i].issen=='1'){
                y_cp.push(dataArray[i]);
                compiled = ycp_compiled;
            }else{
                w_cp.push(dataArray[i]);
                compiled = wcp_compiled;
            }

            var templateTest=compiled({ 'data': dataArray[i]});
            $('#invoiceManageTable').append(templateTest);
        }

        /*将数据按照出票状态分组*/
        $('.cp').on('click',function(){
            var cp=$(this).attr('id');
            $('#invoiceManageTable').find('.data').remove();
            for(var i=0;i<cps[cp].length;i++){
                cps[cp][i].issen=='1'?compiled=ycp_compiled:compiled=wcp_compiled;
                templateTest=compiled({ 'data': cps[cp][i]});
                $('#invoiceManageTable').append(templateTest);
            }

        })

    })
    .fail(function(){
        console.log('发票管理请求失败');
    })


    /* 加载索要发票列表 */
    var stance = new MilkT(getInvoices, 3);
    stance.send({
        usercode:store.get('usercode')
    })
    .done(function(data){
        //console.log(data);
        var results=data.value;
        order_code_Array[1]=results;
        var htmlText=_.template('<%_.forEach(resultArray,function(data){%>\
            <tr>\
                <td class="bl"><input class="sy_checkbox" type="checkbox"></td>\
                <td><%=data.order_code%></td>\
                <td class="sy_pro_name"></td>\
                <td><%=data.total_price%></td>\
                <td class="br"><%=data.order_time%></td>\
            </tr>\
        <%})%>');
        var html=htmlText({'resultArray':results});
        $('.sqfp_invoiceTit').parent().append(html);

        //填写商品名称
        for(var i in results){
            var Arr=results[i].OrderProducts;
            for(var pre in Arr){
                var data=Arr[pre];
                $('.sy_pro_name').text(data.product_name);
            }
        }


    })
    .fail(function(){
        console.log('索要发票请求失败');
    })



    /*企业账号管理新建子账号弹窗*/
    $('#newAdd').click(function(){
      openfire();
    })


    function openfire(){
            window.open(
            'D-newChildAccount.html',
            'newwindow',
            'height=100,width=600,height=400,top=100,left=300,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no, status=no'
        )
    }

    /*搜索*/
    $('.searchBtn').on('click',function(){
        var rtext=$.trim($(this).next().val());
        var dom=$(this).parents('.conentInvoices');
        find_order_code(rtext,dom)=='find'?alert('找到了'):alert('抱歉，未查找到此订单');
    })

    /*遍历所有订单*/
    function find_order_code(rtext,dom){
        for(var arr in order_code_Array){
            for(var obj in order_code_Array[arr]){
                var result=order_code_Array[arr][obj];
                if(result.order_code==rtext){
                    showSearchResult(result,dom);
                    return 'find';
                }
            }
        }
    }

    /*搜索到后的DOM操作*/
    function showSearchResult(data,dom){
        dom.find('tr').eq(1).remove();
        console.log(data);
    }

    /*索取发票*/
    openWindow();

    function openWindow(){
        $('#getInvoice').click(function(){
            window.open(
                    'D-previewInvoice.html',
                    'newwindow',
                    'height=100,width=500,height=450,top=100,left=400,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no, status=no'
                )

            var dk_money=$('#dk_money').text();//开票金额
            var pro_name=$('.sy_pro_name').text();//商品名称
            store.set('dk_money',dk_money);
            store.set('pro_name',pro_name);
        })
    }



})


