$(function(){
    /*------------渲染页面-----------*/

    var template_address = $('#purList_Box').text();
    var templateFn_address = _.template(template_address);
    $('.qygl-right').append(templateFn_address);


    /*------------切换select----------*/

    $('.status>select').css('display','none');
    $('#all_select').css('display','block');

    var selectArray=[
                        $('#all_select'),$('#fq_select'),$('#dqht_select'),
                        $('#dfk_select'),$('#dsh_select'),$('#ywc_select')
                    ];

    $('.tit>li').on('click',function(){
        var i=$(this).index();
        $('.status>select').css('display','none');
        $('.tit>li').removeClass('tit-active');
        selectArray[i].css('display','block');
        $(this).addClass('tit-active');

        
        if(i==4){
            $('.proList').nextAll().css('display','none');//清除页面上所有订单
            $('#loading').css('display','block');
            var stance = new MilkT(saleOrderList, 3);
            stance.send({
                seller:store.get('usercode'),
                enterprise_id:store.get('enterprise_id'),
                querytype:4,
                currentPage:'1'
            })
            .done(function(data){
                $('#loading').css('display','none');
                var resultDatas=data.value;//保存请求结果;
                for(var i=0;i<resultDatas.length-1;i++){
                    createHTML(resultDatas[i]);
                    //筛选出待发货
                    if(resultDatas[i].cancle_status=='1'){
                        if(resultDatas[i].ispay=='2'){
                            if(resultDatas[i].logistics_status=='1'){
                                dfh_Array[i]=resultDatas[i];
                            }else if(resultDatas[i].logistics_status=='2'){
                                dsh_Array[i]=resultDatas[i];
                            }
                        }
                    }
                }
            })
            .fail(function(){
                $('.proList').nextAll().css('display','none');
                $('.proList').after('<div class="noOrder"><div>');
                console.log('销售订单列表请求失败');
            })

        }else{
            get_Datas(i,'1');
        }
    })

    //全部订单——select
    $('#all_select').change(function(){
        var i=$('#all_select option:selected').index();
        if(i==6){
            for(var i in cancelOrders_Array){
                $('.proList').nextAll().css('display','none');
                createHTML(cancelOrders_Array[i]);
            }
        }else{
            get_Datas(i,'1'); 
        }
        
    })


    //收/发货——select
    $('#dsh_select').change(function(){
        var i=$('#dsh_select option:selected').index();
        if(i==1){
            $('.proList').nextAll().css('display','none');
            for(var i in dfh_Array){
                createHTML(dfh_Array[i]);
            }
        }else{
            $('.proList').nextAll().css('display','none');
            for(var i in dsh_Array){
                createHTML(dsh_Array[i]);
            }
        }
    })


    //发送查询状态并生成订单
    function get_Datas(status,page){
        $('.proList').nextAll().css('display','none');
        $('#loading').css('display','block');//加载菊花
        var stance = new MilkT(saleOrderList, 3);
        stance.send({
            seller:store.get('usercode'),
            enterprise_id:store.get('enterprise_id'),
            querytype:status,
            currentPage:page
        })
        .done(function(data){
            $('#loading').css('display','block');//关闭菊花
            var resultDatas=data.value;//保存请求结果;
            result_DataArray=data.value;//更新请求的数据
            $('.proList').nextAll().css('display','none');
            for(var i=0;i<resultDatas.length-1;i++){
                createHTML(resultDatas[i]);
            }
        })
        .fail(function(){
            $('.proList').nextAll().css('display','none');
            $('.proList').after('<div class="noOrder"><div>');
            console.log('销售订单列表请求失败');
        })
    }




    var pages;//分页数据

    var dfh_Array=[];//定义用于保存待发货数组

    var dsh_Array=[];

    var cancelOrders_Array=[];//定义用于保存取消订单数组;

    var result_DataArray=[];//定义用于保存请求结果的数组;


    //未付款
    var n_pay=_.template(
            '\
                <div class=ListCell>\
                            <div class="orderInfo">\
                                <span class="dayTime fl"><%=data.order_time%></span>\
                                <span class="orderNum">订单号：<%=data.order_code%></span>\
                                <span class="qy">企业：<%=data.seller%></span>\
                                <span class="purchase_type fr">订单类型：<%=data.purchase_type%></span>\
                            </div>\
                            <div class="proCell">\
                                <div class="pro fl">\
                                    <img class="pro-img fl" src="<%=obj.main_pic%>" width="72" height="72">\
                                    <div class="pro-text fl">\
                                        <p><%=obj.product_name%></p>\
                                        <p><%=obj.category_name%></p>\
                                    </div>\
                                    <ul class="proTD">\
                                        <li style="color: darkgray;">￥<%=obj.unit_price%></li>\
                                        <li>x<%=data.nums%></li>\
                                        <li></li>\
                                        <li class="ze">\
                                            <div>\
                                                <p>订单总额：￥<span><%=data.total_price%></span></p>\
                                            </div>\
                                        </li>\
                                        <li class="status">\
                                            <div>\
                                                <p class="state">待付款</p>\
                                                <p><a class="orderDetail" href="#">订单详情</a></p>\
                                            </div>\
                                        </li>\
                                        <li class="operation">\
                                            <div>\
                                                <p><a class="" href="#"></a></p>\
                                            </div>\
                                        </li>\
                                    </ul>\
                                </div>\
                            </div>\
                            <div class="clear"></div>\
                        </div>\
            ');
    
    //已取消
    var order_cancel=_.template(
            '\
                <div class=ListCell>\
                            <div class="orderInfo">\
                                <span class="dayTime fl"><%=data.order_time%></span>\
                                <span class="orderNum">订单号：<%=data.order_code%></span>\
                                <span class="qy">企业：<%=data.seller%></span>\
                                <span class="purchase_type fr">订单类型：<%=data.purchase_type%></span>\
                            </div>\
                            <div class="proCell">\
                                <div class="pro fl">\
                                    <img class="pro-img fl" src="<%=obj.main_pic%>" width="72" height="72">\
                                    <div class="pro-text fl">\
                                        <p><%=obj.product_name%></p>\
                                        <p><%=obj.category_name%></p>\
                                    </div>\
                                    <ul class="proTD">\
                                        <li style="color: darkgray;">￥<%=obj.unit_price%></li>\
                                        <li>x<%=data.nums%></li>\
                                        <li></li>\
                                        <li class="ze">\
                                            <div>\
                                                <p>订单总额：￥<span><%=data.total_price%></span></p>\
                                            </div>\
                                        </li>\
                                        <li class="status">\
                                            <div>\
                                                <p class="state">已取消</p>\
                                                <p><a class="orderDetail" href="#">订单详情</a></p>\
                                            </div>\
                                        </li>\
                                        <li class="operation">\
                                            <div>\
                                                <p><a class="" href="#"></a></p>\
                                            </div>\
                                        </li>\
                                    </ul>\
                                </div>\
                            </div>\
                            <div class="clear"></div>\
                        </div>\
            ');

    //待发货
    var order_dfh=_.template(
            '\
                <div class=ListCell>\
                            <div class="orderInfo">\
                                <span class="dayTime fl"><%=data.order_time%></span>\
                                <span class="orderNum">订单号：<%=data.order_code%></span>\
                                <span class="qy">企业：<%=data.seller%></span>\
                                <span class="purchase_type fr">订单类型：<%=data.purchase_type%></span>\
                            </div>\
                            <div class="proCell">\
                                <div class="pro fl">\
                                    <img class="pro-img fl" src="<%=obj.main_pic%>" width="72" height="72">\
                                    <div class="pro-text fl">\
                                        <p><%=obj.product_name%></p>\
                                        <p><%=obj.category_name%></p>\
                                    </div>\
                                    <ul class="proTD">\
                                        <li style="color: darkgray;">￥<%=obj.unit_price%></li>\
                                        <li>x<%=data.nums%></li>\
                                        <li></li>\
                                        <li class="ze">\
                                            <div>\
                                                <p>订单总额：￥<span><%=data.total_price%></span></p>\
                                            </div>\
                                        </li>\
                                        <li class="status">\
                                            <div>\
                                                <p class="state">待发货</p>\
                                                <p><a class="orderDetail" href="#">订单详情</a></p>\
                                            </div>\
                                        </li>\
                                        <li class="operation">\
                                            <div>\
                                                <button class="btn">立即发货</button>\
                                            </div>\
                                        </li>\
                                    </ul>\
                                </div>\
                            </div>\
                            <div class="clear"></div>\
                        </div>\
            ');

    //待确认收货
    var order_qrsh=_.template(
            '\
                <div class=ListCell>\
                            <div class="orderInfo">\
                                <span class="dayTime fl"><%=data.order_time%></span>\
                                <span class="orderNum">订单号：<%=data.order_code%></span>\
                                <span class="qy">企业：<%=data.seller%></span>\
                                <span class="purchase_type fr">订单类型：<%=data.purchase_type%></span>\
                            </div>\
                            <div class="proCell">\
                                <div class="pro fl">\
                                    <img class="pro-img fl" src="<%=obj.main_pic%>" width="72" height="72">\
                                    <div class="pro-text fl">\
                                        <p><%=obj.product_name%></p>\
                                        <p><%=obj.category_name%></p>\
                                    </div>\
                                    <ul class="proTD">\
                                        <li style="color: darkgray;">￥<%=obj.unit_price%></li>\
                                        <li>x<%=data.nums%></li>\
                                        <li></li>\
                                        <li class="ze">\
                                            <div>\
                                                <p>订单总额：￥<span><%=data.total_price%></span></p>\
                                            </div>\
                                        </li>\
                                        <li class="status">\
                                            <div>\
                                                <p class="state">待收货</p>\
                                                <p><a class="orderDetail" href="#">订单详情</a></p>\
                                            </div>\
                                        </li>\
                                        <li class="operation">\
                                            <div>\
                                                <button class="btn">催买家收货</button>\
                                            </div>\
                                        </li>\
                                    </ul>\
                                </div>\
                            </div>\
                            <div class="clear"></div>\
                        </div>\
            ');

    //已经收货
    var order_finish=_.template(
            '\
                <div class=ListCell>\
                            <div class="orderInfo">\
                                <span class="dayTime fl"><%=data.order_time%></span>\
                                <span class="orderNum">订单号：<%=data.order_code%></span>\
                                <span class="qy">企业：<%=data.seller%></span>\
                                <span class="purchase_type fr">订单类型：<%=data.purchase_type%></span>\
                            </div>\
                            <div class="proCell">\
                                <div class="pro fl">\
                                    <img class="pro-img fl" src="<%=obj.main_pic%>" width="72" height="72">\
                                    <div class="pro-text fl">\
                                        <p><%=obj.product_name%></p>\
                                        <p><%=obj.category_name%></p>\
                                    </div>\
                                    <ul class="proTD">\
                                        <li style="color: darkgray;">￥<%=obj.unit_price%></li>\
                                        <li>x<%=data.nums%></li>\
                                        <li></li>\
                                        <li class="ze">\
                                            <div>\
                                                <p>订单总额：￥<span><%=data.total_price%></span></p>\
                                            </div>\
                                        </li>\
                                        <li class="status">\
                                            <div>\
                                                <p class="state">已完成</p>\
                                                <p><a class="orderDetail" href="#">订单详情</a></p>\
                                            </div>\
                                        </li>\
                                        <li class="operation">\
                                            <div>\
                                                <p><a class="" href="#"></a></p>\
                                            </div>\
                                        </li>\
                                    </ul>\
                                </div>\
                            </div>\
                            <div class="clear"></div>\
                        </div>\
            ');

    var orderCell;

    /*请求数据*/
    var stance = new MilkT(saleOrderList, 3);
    stance.send({
        seller:store.get('usercode'),
        enterprise_id:store.get('enterprise_id'),
        currentPage:'1'
    })
    .done(function(data){
        $('#loading').css('display','none');
        result_DataArray=data.value;//保存请求结果;
        console.log(result_DataArray);
        
        //保存最后一条分页的数据，其他数据照常便利
        for(var i=0;i<data.value.length;i++){
            i<data.value.length-1?createHTML(data.value[i]):pages=data.value[i];
        }

        //筛选出已取消
        for(var i=0;i<result_DataArray.length-1;i++){ 
            if(result_DataArray[i].cancle_status=='2'){
                cancelOrders_Array.push(result_DataArray[i]);
            }
        }

    })
    .fail(function(data){
        $('.proList').nextAll().css('display','none');
        $('.proList').after('<div class="noOrder"><div>');//无订单提示
        console.log('销售订单列表请求失败');
    })


    //生成订单列表
    function createHTML(data){
        var obj;
        
        for(var i in data.OrderProducts){
            obj=data.OrderProducts[i];
        }

        juageStatus(data);

        var htmlText=orderCell({'data':data,'obj':obj});
        $('.orderList').append(htmlText);

        juage_purchase_type();
    }

    //判断订单类型;
    function juage_purchase_type(){

        var purchase_type=$('.purchase_type');
        for(var i=0;i<purchase_type.length;i++){

            switch(purchase_type[i].innerHTML){
                case '订单类型：1':purchase_type[i].innerHTML='订单类型：大货';
                break;
                case '订单类型：2':purchase_type[i].innerHTML='订单类型：样品';
                break;
            }
        } 
    }

    //根据状态判断应该使用的模板
    function juageStatus(data){
        if(data.cancle_status=='1'){
            switch(data.ispay){
                case '1':orderCell=n_pay;
                break;
                case '2':fun(data);
                break;
                case '3':return '分期付款';alert('暂不支持');
                break;
                case '4':orderCell=order_cancel;
                break;
            }
        }else{
            orderCell=order_cancel;
        }

        function fun(data){
            switch(data.logistics_status){
                case '1':orderCell=order_dfh;
                break;
                case '2':orderCell=order_qrsh;
                break;
                case '3':orderCell=order_finish;
                break;
            }
        }
    }

    /*---------------分页---------------*/

    $('#page>li').on('click',function(){
        sendCurrentPage($.trim($(this).text()));//发送当前页
        $('#page>li').removeClass('current');
        $(this).addClass('current');
    })

    //发送页数请求数据
    function sendCurrentPage(number){
        $('.proList').nextAll().css('display','none');//清除页面上所有订单
        get_Datas(0,number);

    }

    /*---------------搜索---------------*/

    $('#btn_search').on('click',function(){
        var rtext=$.trim($(this).prev().val());
        if(findOrder(rtext)!='finded'){
            alert('抱歉，未搜索到此订单');
        }
    })

    /*遍历所有订单*/
    function findOrder(rtext){
        for(var i=0;i<result_DataArray.length;i++){
            if(result_DataArray[i].order_code==rtext){
                operateDOM(result_DataArray[i]);
                return 'finded';
            }
        }
    }

    //查找到之后的DOM操作
    function operateDOM(obj){
        $('.ListCell').remove();
        createHTML(obj);
    }

    /*传递order_id*/
    $('.orderList').on('click','.orderDetail',function(){
        var i=$(this).parents('.ListCell').index();
        var order_id;
        order_id=result_DataArray[i-2].order_id;
        store.set('order_id',order_id);
        $(this).attr('href','order_detail.html');
    })


    //自定义警告框
    var alt={
        obj:$('#alertView'),
        tit:function(text){
            $('#text').text(text);
        }
    };

    var winHeight=$(window).height();
    var winWidth=$(window).width();
    alt.obj.css({'top':(winHeight-160)/2+'px','left':(winWidth-300)/2+'px'});

    /*点击取消*/
    var i;
    $('.orderList').on('click','.cancleOrder',function(){
        i=$(this).parents('.ListCell').index();
        alt.tit('是否取消订单？');//初始化提示信息
        alt.obj.show();
    })

    /*点取返回*/
    $('#no').on('click',function(){
        alt.obj.fadeOut();
    })

    /*点击确定*/
    $('#yes').on('click',function(){
        var stance = new MilkT(cancleOrder, 3);
        stance.send({
            id:result_DataArray[i-2].order_id
        })
        .done(function(data){
            if(data.value==1){
                window.location.reload();
            }else{
                alert('取消订单失败');
            }
        })
        .fail(function(){
            console.log('取消订单请求失败');
        })
    })

})