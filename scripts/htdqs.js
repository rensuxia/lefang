$(function(){
    var checkStr='';//定义全局变量来存储查询的条件的值
    //渲染页面
    var template_top = $('#htdqs-tab').text();
    var templateFn_top = _.template(template_top);
    $('#lefangtex_ht').append(templateFn_top);

    //获取当前登录人的用户code和公司id
    var uCode=store.get('usercode');
    var uCompanyId=store.get('enterprise_id');

    //销售合同待签署
    contractSign($('#htdqs_xs tbody'),uCode,uCompanyId,'2','1','1');
    // var htdqsxs=new MilkT(htdqsXs,3);
    // htdqsxs.send({usercode:uCode, CompanyId:uCompanyId,contractType:'2',contractStatus:'1',currentPage:'1'})
    //     .done(function (data) {
    //     // console.log(data);
    //     var list=data.contractEntityList;
    //     var compiled=_.template('<% _.forEach(List,function(list){\
    //         %>\
    //         <tr> \
    //             <td><a class="blue"><%= list.contractId %></a></td> \
    //             <td><%= list.contractName %></td> \
    //             <td><a class="blue"><%= list.orderId %></a></td> \
    //             <td><%= list.buyer %></td> <td><%= list.createBy %></td> \
    //             <td><%= list.seller %></td> \
    //             <td><%= list.createTime %></td>\
    //             <td><button type="button" class="btn btn-primary "><a href="<%= list.contractUrl %>">签署</a></button></td> \
    //         </tr>\
    //         <%});%>');
    //     var templateTest=compiled({'List':list});
    //     // console.log(templateTest);
    //     $('#htdqs_xs tbody').append(templateTest);
    //
    //  })
    // .fail(function () {
    //     alert('销售合同待签署接口调用失败！');
    // });

    //采购合同待签署
    contractSign($('#htdqs_cg tbody'),uCode,uCompanyId,'1','2','1');
    // var htdqscg=new MilkT(htdqsXs,3);
    // htdqscg.send({usercode:uCode, CompanyId:uCompanyId,contractType:'1',contractStatus:'2',currentPage:'1'})
    //     .done(function (data) {
    //         // console.log(data);
    //         var list=data.contractEntityList;
    //         var compiled=_.template('<% _.forEach(List,function(list){\
    //         %>\
    //         <tr> \
    //             <td><a class="blue"><%= list.contractId %></a></td> \
    //             <td><%= list.contractName %></td> \
    //             <td><a class="blue"><%= list.orderId %></a></td> \
    //             <td><%= list.buyer %></td> <td><%= list.createBy %></td> \
    //             <td><%= list.seller %></td> \
    //             <td><%= list.createTime %></td>\
    //             <td><button type="button" class="btn btn-primary "><a href="<%= list.contractUrl %>">签署</a></button></td> \
    //         </tr>\
    //         <%});%>');
    //         var templateTest=compiled({'List':list});
    //         // console.log(templateTest);
    //         $('#htdqs_cg tbody').append(templateTest);
    //     })
    //     .fail(function () {
    //     alert('采购合同待签署接口调用失败！');
    // });

    //销售合同管理
    contractStatus($('#htgl_xs tbody'),uCode,uCompanyId,'2','1,2,3,4,5,6,7,8','1');
    // var xshtgl=new MilkT(htdqsCggl,3);
    // xshtgl.send({usercode:uCode, CompanyId:uCompanyId,contractType:'2',contractStatus:'1,2,3,4,5,6,7,8',currentPage:'1'})
    //     .done(function (data) {
    //         // console.log(data);
    //         var xshtgl_list=data.contractEntityList;
    //         // 判断合同的状态的循环
    //         for(var i=0;i<xshtgl_list.length;i++){
    //             if(xshtgl_list[i].contractStatus=='1'||xshtgl_list[i].contractStatus=='2'||xshtgl_list[i].contractStatus=='3'){
    //                 xshtgl_list[i].contractStatus='签署中';
    //             }else if(xshtgl_list[i].contractStatus=='4'){
    //                 xshtgl_list[i].contractStatus='已完成';
    //             }else if(xshtgl_list[i].contractStatus=='5'||xshtgl_list[i].contractStatus=='6'||xshtgl_list[i].contractStatus=='7'){
    //                 xshtgl_list[i].contractStatus='已作废';
    //             }else if(xshtgl_list[i].contractStatus=='8'){
    //                 xshtgl_list[i].contractStatus='已过期';
    //             }
    //         }
    //         var compiled=_.template('<% _.forEach(Xshtgl_list,function(xshtgl_list){\
    //             %>\
    //             <tr> \
    //                 <td><%= xshtgl_list.contractStatus %></td> \
    //                 <td><a class="blue"><%= xshtgl_list.contractId %></a></td> \
    //                 <td><%= xshtgl_list.contractName %></td> \
    //                 <td><a class="blue"><%= xshtgl_list.orderId %></a></td> \
    //                 <td><%= xshtgl_list.buyer %></td> \
    //                 <td><%= xshtgl_list.seller %></td> \
    //                 <td><%= xshtgl_list.createBy %></td> \
    //                 <td><%= xshtgl_list.seller %></td> \
    //                 <td><%= xshtgl_list.createTime %></td> \
    //             </tr>\
    //             <%});%>');
    //         var templateTest=compiled({'Xshtgl_list':xshtgl_list});
    //         // console.log(templateTest);
    //         $('#htgl_xs tbody').append(templateTest);
    //     });

    //销售合同按钮
    var xshtgl_select = new MilkT(XShtgl_select, 3);
    xshtgl_select.send({usercode:uCode,CompanyId:uCompanyId,contractType:'2'})
        .done(function (data) {
                console.log(data);
                var xshtgl_list = data.contractEntityList;
                var compiled = _.template('<% _.forEach(Xshtgl_list,function(xshtgl_list){\
                    %>\
                    <button id="xshtgl_All" type="button"\ class="btn btn-primary">所有合同</button>\
                    <button id="xshtgl_ing" type="button"class="btn btn-primary">签署中(<%= xshtgl_list.contractSignIN %>)</button>\
                    <button type="button" class="btn btn-primary">已完成(<%= xshtgl_list.contractComplete %>)</button>\
                    <button type="button" class="btn btn btn-primary">已作废(<%= xshtgl_list.contractCancellation %>)</button>\
                    <button type="button" class="btn btn btn-primary">已过期(<%= xshtgl_list.contractStale %>)</button>\
                    <%});%>');
                var templateTest = compiled({'Xshtgl_list': xshtgl_list});
                console.log(templateTest);
                $('#xsmenu').append(templateTest)
    })
    //   .fail(function () {
    //     alert('123');
    //   });

    //销售合同按钮的点击事件
    $('#xsmenu').on('click','button',function () {
    // console.log($(this).index());
    // 所有合同
        if($(this).index()==0){
            checkStr='1,2,3,4,5,6,7,8';
            contractStatus($('#htgl_xs tbody'),uCode,uCompanyId,'2','1,2,3,4,5,6,7,8','1')
        }
        //签署中
        else if($(this).index()==1){
            checkStr='1,2,3';
            contractStatus($('#htgl_xs tbody'),uCode,uCompanyId,'2','1,2,3','1')
        }
        //已完成
        else if($(this).index()==2){
            checkStr='4';
            contractStatus($('#htgl_xs tbody'),uCode,uCompanyId,'2','4','1')
        }
        //已作废
        else if($(this).index()==3){
            checkStr='5,6,7';
            contractStatus($('#htgl_xs tbody'),uCode,uCompanyId,'2','5,6,7','1')
        }
        //已过期
        else if($(this).index()==4){
            checkStr='8';
            contractStatus($('#htgl_xs tbody'),uCode,uCompanyId,'2','8','1')
        }
    })

    //采购合同管理
    contractStatus($('#htgl_cg tbody'),uCode,uCompanyId,'1','1,2,3,4,5,6,7,8','1');
    // var cghtgl=new MilkT(htdqsCggl,3);
    // cghtgl.send({usercode:uCode, CompanyId:uCompanyId,contractType:'1',contractStatus:'1,2,3,4,5,6,7,8',currentPage:'1'})
    //     .done(function (data) {
    //         // console.log(data);
    //         var cghtgl_list=data.contractEntityList;
    //         // 判断合同的状态的循环
    //         for(var i=0;i<cghtgl_list.length;i++){
    //             if(cghtgl_list[i].contractStatus=='1'||cghtgl_list[i].contractStatus=='2'||cghtgl_list[i].contractStatus=='3'){
    //                 cghtgl_list[i].contractStatus='签署中';
    //             }else if(cghtgl_list[i].contractStatus=='4'){
    //                 cghtgl_list[i].contractStatus='已完成';
    //             }else if(cghtgl_list[i].contractStatus=='5'||cghtgl_list[i].contractStatus=='6'||cghtgl_list[i].contractStatus=='7'){
    //                 cghtgl_list[i].contractStatus='已作废';
    //             }else if(cghtgl_list[i].contractStatus=='8'){
    //                 cghtgl_list[i].contractStatus='已过期';
    //             }
    //         }
    //         var compiled=_.template('<% _.forEach(Cghtgl_list,function(cghtgl_list){\
    //             %>\
    //             <tr> \
    //                 <td><%= cghtgl_list.contractStatus %></td> \
    //                 <td><a class="blue"><%= cghtgl_list.contractId %></a></td> \
    //                 <td><%= cghtgl_list.contractName %></td> \
    //                 <td><a class="blue"><%= cghtgl_list.orderId %></a></td> \
    //                 <td><%= cghtgl_list.buyer %></td> \
    //                 <td><%= cghtgl_list.seller %></td> \
    //                 <td><%= cghtgl_list.createBy %></td> \
    //                 <td><%= cghtgl_list.seller %></td> \
    //                 <td><%= cghtgl_list.createTime %></td> \
    //             </tr>\
    //             <%});%>');
    //         var templateTest=compiled({'Cghtgl_list':cghtgl_list});
    //         // console.log(templateTest);
    //         $('#htgl_cg tbody').append(templateTest);
    //     });

    //采购合同按钮
    var cghtgl_select = new MilkT(CGhtgl_select, 3);
    cghtgl_select.send({usercode: uCode, CompanyId: uCompanyId, contractType: '1'})
        .done(function (data) {
            // console.log(data);
            var cghtgl_list=data.contractEntityList;
            var compiled=_.template('<% _.forEach(Cghtgl_list,function(cghtgl_list){\
                %>\
                <button id="cghtgl_All" type="button" class="btn btn-primary">所有合同</button>\
                <button id="cghtgl_ing" type="button"class="btn btn-primary">签署中(<%= cghtgl_list.contractSignIN %>)</button>\
                <button type="button" class="btn btn-primary">已完成(<%= cghtgl_list.contractComplete %>)</button>\
                <button type="button" class="btn btn btn-primary">已作废(<%= cghtgl_list.contractCancellation %>)</button>\
                <button type="button" class="btn btn btn-primary">已过期(<%= cghtgl_list.contractStale %>)</button>\
                <%});%>');
            var templateTest=compiled({'Cghtgl_list':cghtgl_list});
            // console.log(templateTest);
            $('#cgmenu').append(templateTest);

        });

    //采购合同按钮的点击事件
    $('#cgmenu').on('click','button',function () {

        // console.log($(this).index());
        // 所有合同
        if($(this).index()==0){
            checkStr='1,2,3,4,5,6,7,8';
            contractStatus($('#htgl_cg tbody'),uCode,uCompanyId,'1','1,2,3,4,5,6,7,8','1');
        }
        //签署中
        else if($(this).index()==1){
            checkStr='1,2,3';
            contractStatus($('#htgl_cg tbody'),uCode,uCompanyId,'1','1,2,3','1');
        }
        //已完成
        else if($(this).index()==2){
            checkStr='4';
            contractStatus($('#htgl_cg tbody'),uCode,uCompanyId,'1','4','1');
        }
        //已作废
        else if($(this).index()==3){
            checkStr='5,6,7';
            contractStatus($('#htgl_cg tbody'),uCode,uCompanyId,'1','5,6,7','1');
        }
        //已过期
        else if($(this).index()==4){
            checkStr='8';
            contractStatus($('#htgl_cg tbody'),uCode,uCompanyId,'1','8','1');
        }
    })

    //销售合同待签署的条件查询
    $('#XsdqsCButton').click(function () {
        var Str=$('#Xsdqscondition').val();
        var htdqsxs=new MilkT(checkXs,3);
        htdqsxs.send({usercode:uCode, CompanyId:uCompanyId,contractStatus:'2',contractType:'2',contractSearchValue:Str,currentPage:'1'})
            .done(function (data) {
                // console.log(data);
                var list=data.contractEntityList;
                var compiled=_.template('<% _.forEach(List,function(list){\
            %>\
            <tr> \
                <td><a class="blue"><%= list.contractId %></a></td> \
                <td><%= list.contractName %></td> \
                <td><a class="blue"><%= list.orderId %></a></td> \
                <td><%= list.buyer %></td> <td><%= list.createBy %></td> \
                <td><%= list.seller %></td> \
                <td><%= list.createTime %></td>\
                <td><button type="button" class="btn btn-primary "><a href="<%= list.contractUrl %>">签署</a></button></td> \
            </tr>\
            <%});%>');
                var templateTest=compiled({'List':list});
                // console.log(templateTest);
                $('#htdqs_xs tbody tr:gt(2)').remove();
                $('#htdqs_xs tbody').append(templateTest);
            })
        $('#Xsdqscondition').val('');
        // .fail(function () {
        //     alert('销售合同待签署接口调用失败！');
        // });
    })

    //销售合同管理的条件查询
    $('#XshtglCButton').click(function () {
        var Str=$('#Xshtglcondition').val();
        var xshtgl=new MilkT(checkXs,3);
        xshtgl.send({usercode:uCode, CompanyId:uCompanyId,contractStatus:checkStr,contractType:'2',contractSearchValue:Str,currentPage:'1'})
            .done(function (data) {
                // console.log(data);
                var xshtgl_list=data.contractEntityList;
                // 判断合同的状态的循环
                for(var i=0;i<xshtgl_list.length;i++){
                    if(xshtgl_list[i].contractStatus=='1'||xshtgl_list[i].contractStatus=='2'||xshtgl_list[i].contractStatus=='3'){
                        xshtgl_list[i].contractStatus='签署中';
                    }else if(xshtgl_list[i].contractStatus=='4'){
                        xshtgl_list[i].contractStatus='已完成';
                    }else if(xshtgl_list[i].contractStatus=='5'||xshtgl_list[i].contractStatus=='6'||xshtgl_list[i].contractStatus=='7'){
                        xshtgl_list[i].contractStatus='已作废';
                    }else if(xshtgl_list[i].contractStatus=='8'){
                        xshtgl_list[i].contractStatus='已过期';
                    }
                }
                var compiled=_.template('<% _.forEach(Xshtgl_list,function(xshtgl_list){\
                %>\
                <tr> \
                    <td><%= xshtgl_list.contractStatus %></td> \
                    <td><a class="blue"><%= xshtgl_list.contractId %></a></td> \
                    <td><%= xshtgl_list.contractName %></td> \
                    <td><a class="blue"><%= xshtgl_list.orderId %></a></td> \
                    <td><%= xshtgl_list.buyer %></td> \
                    <td><%= xshtgl_list.seller %></td> \
                    <td><%= xshtgl_list.createBy %></td> \
                    <td><%= xshtgl_list.seller %></td> \
                    <td><%= xshtgl_list.createTime %></td> \
                </tr>\
                <%});%>');
                var templateTest=compiled({'Xshtgl_list':xshtgl_list});
                // console.log(templateTest);
                $('#htgl_xs tbody tr:gt(2)').remove();
                $('#htgl_xs tbody').append(templateTest);
            });
        $('#Xshtglcondition').val('');
        checkStr='';
    })

    //采购合同管理的条件查询
    $('#CghtglCButton').click(function () {
        var Str=$('#Cghtglcondition').val();
        var cghtgl=new MilkT(checkXs,3);
        cghtgl.send({usercode:uCode, CompanyId:uCompanyId,contractStatus:checkStr,contractType:'1',contractSearchValue:Str,currentPage:'1'})
            .done(function (data) {
                // console.log(data);
                var cghtgl_list=data.contractEntityList;
                // 判断合同的状态的循环
                for(var i=0;i<cghtgl_list.length;i++){
                    if(cghtgl_list[i].contractStatus=='1'||cghtgl_list[i].contractStatus=='2'||cghtgl_list[i].contractStatus=='3'){
                        cghtgl_list[i].contractStatus='签署中';
                    }else if(cghtgl_list[i].contractStatus=='4'){
                        cghtgl_list[i].contractStatus='已完成';
                    }else if(cghtgl_list[i].contractStatus=='5'||cghtgl_list[i].contractStatus=='6'||cghtgl_list[i].contractStatus=='7'){
                        cghtgl_list[i].contractStatus='已作废';
                    }else if(cghtgl_list[i].contractStatus=='8'){
                        cghtgl_list[i].contractStatus='已过期';
                    }
                }
                var compiled=_.template('<% _.forEach(Cghtgl_list,function(cghtgl_list){\
                %>\
                <tr> \
                    <td><%= cghtgl_list.contractStatus %></td> \
                    <td><a class="blue"><%= cghtgl_list.contractId %></a></td> \
                    <td><%= cghtgl_list.contractName %></td> \
                    <td><a class="blue"><%= cghtgl_list.orderId %></a></td> \
                    <td><%= cghtgl_list.buyer %></td> \
                    <td><%= cghtgl_list.seller %></td> \
                    <td><%= cghtgl_list.createBy %></td> \
                    <td><%= cghtgl_list.seller %></td> \
                    <td><%= cghtgl_list.createTime %></td> \
                </tr>\
                <%});%>');
                var templateTest=compiled({'Cghtgl_list':cghtgl_list});
                // console.log(templateTest);
                $('#htgl_cg tbody tr:gt(2)').remove();
                $('#htgl_cg tbody').append(templateTest);
            });
        $('#Cghtglcondition').val('');
        checkStr='';
    })

    //采购合同待签署的条件查询
    $('#CgdqsCButton').click(function () {
        var Str=$('#Cgdqscondition').val();
        var htdqscg=new MilkT(checkXs,3);
        htdqscg.send({usercode:uCode, CompanyId:uCompanyId,contractStatus:'2',contractType:'1',contractSearchValue:Str,currentPage:'1'})
            .done(function (data) {
                // console.log(data);
                var list=data.contractEntityList;
                var compiled=_.template('<% _.forEach(List,function(list){\
            %>\
            <tr> \
                <td><a class="blue"><%= list.contractId %></a></td> \
                <td><%= list.contractName %></td> \
                <td><a class="blue"><%= list.orderId %></a></td> \
                <td><%= list.buyer %></td> <td><%= list.createBy %></td> \
                <td><%= list.seller %></td> \
                <td><%= list.createTime %></td>\
                <td><button type="button" class="btn btn-primary "><a href="<%= list.contractUrl %>">签署</a></button></td> \
            </tr>\
            <%});%>');
                var templateTest=compiled({'List':list});
                // console.log(templateTest);
                $('#htdqs_cg tbody tr:gt(2)').remove();
                $('#htdqs_cg tbody').append(templateTest);
            })
        $('#Cgdqscondition').val('');
    })




    //验证统一公司合同编号不能重复的接口
    var Validate=new MilkT(validate,3);
    Validate.send({usercode:uCode,CompanyId:uCompanyId,contractCode:'1'})
        .done(function (data) {
            console.log(data);
        })





    //弹出tab
    $('.qygl-left-con>ul>li').mouseenter(function(){

        $('.qygl-left-con>ul>li>div').hide();
        $(this).find('div').show();
        $(this).find('div').css('z-index','1');
    })
    $('.qygl-left').mouseleave(function(){
        $('.qygl-left-con>ul li div').hide();
    })
    $('.qygl-left-con>ul>li:first-of-type').hover(function(){
        $(this).css('background','#fff');
    })
    $('.qygl-left ul li.active img').attr('src','images/icon/会员中心_press.png');
    $('.qygl-left-con>ul>li').eq(2).mouseenter(function(){
        $(this).find('img').attr('src','images/icon/企业信息管理_press.png');
    }).mouseleave(function(){
        $(this).find('img').attr('src','images/icon/企业信息管理.png');
    })
    $('.qygl-left-con>ul>li').eq(3).mouseenter(function(){
        $(this).find('img').attr('src','images/icon/商品管理_press.png');
    }).mouseleave(function(){
        $(this).find('img').attr('src','images/icon/商品管理.png');
    })
    $('.qygl-left-con>ul>li').eq(4).mouseenter(function(){
        $(this).find('img').attr('src','images/icon/订单管理_press.png');
    }).mouseleave(function(){
        $(this).find('img').attr('src','images/icon/订单管理.png');
    })
    $('.qygl-left-con>ul>li').eq(5).mouseenter(function(){
        $(this).find('img').attr('src','images/icon/合同管理_press.png');
    }).mouseleave(function(){
        $(this).find('img').attr('src','images/icon/合同管理.png');
    })
    $('.qygl-left-con>ul>li').eq(6).mouseenter(function(){
        $(this).find('img').attr('src','images/icon/发票管理_press.png');
    }).mouseleave(function(){
        $(this).find('img').attr('src','images/icon/发票管理.png');
    })
    $('.qygl-left-con>ul>li').eq(7).mouseenter(function(){
        $(this).find('img').attr('src','images/icon/支付管理_press.png');
    }).mouseleave(function(){
        $(this).find('img').attr('src','images/icon/支付管理.png');
    })
});
/**
 * 采购合同管理、销售合同管理、采购合同按钮的点击事件、销售合同按钮的点击事件
 * @param obj
 * @param uCode 当前操作人的id
 * @param uCompanyId  当前操作人的公司id
 * @param contractType 合同的类型  1采购  2销售
 * @param contractStatus  合同的状态  123签署中  4已完成  567已作废  8已过期
 * @param currentPage   当前页
 */
function contractStatus(obj, uCode, uCompanyId, contractType, contractStatus, currentPage) {
    var cghtgl = new MilkT(htdqsCggl, 3);
    cghtgl.send({usercode: uCode, CompanyId: uCompanyId, contractType: contractType,contractStatus:contractStatus,currentPage:currentPage})
        .done(function (data) {
            $('#htgl_xs tbody tr:gt(2)').remove();//销售合同按钮的点击事件
            $('#htgl_cg tbody tr:gt(2)').remove();//采购合同按钮的点击事件
            // console.log(data);
            var cghtgl_list = data.contractEntityList;
            // 判断合同的状态的循环

            // for(var i=0;i<cghtgl_list.length;i++){
            //     if(cghtgl_list[i].contractStatus=='1'||cghtgl_list[i].contractStatus=='2'||cghtgl_list[i].contractStatus=='3'){
            //         cghtgl_list[i].contractStatus='签署中';
            //     }else if(cghtgl_list[i].contractStatus=='4'){
            //         cghtgl_list[i].contractStatus='已完成';
            //     }else if(cghtgl_list[i].contractStatus=='5'||cghtgl_list[i].contractStatus=='6'||cghtgl_list[i].contractStatus=='7'){
            //         cghtgl_list[i].contractStatus='已作废';
            //     }else if(cghtgl_list[i].contractStatus=='8'){
            //         cghtgl_list[i].contractStatus='已过期';
            //     }
            //     // return cghtgl_list[i].contractStatus;
            // }
            var compiled = _.template('<% _.forEach(Cghtgl_list,function(cghtgl_list){\
                        %>\
                        <tr> \
                            <td class="status"><%= cghtgl_list.contractStatus %></td> \
                            <td><a class="blue"><%= cghtgl_list.contractId %></a></td> \
                            <td><%= cghtgl_list.contractName %></td> \
                            <td><a class="blue"><%= cghtgl_list.orderId %></a></td> \
                            <td><%= cghtgl_list.buyer %></td> \
                            <td><%= cghtgl_list.seller %></td> \
                            <td><%= cghtgl_list.createBy %></td> \
                            <td><%= cghtgl_list.seller %></td> \
                            <td><%= cghtgl_list.createTime %></td> \
                        </tr>\
                        <%});%>');
            var templateTest = compiled({'Cghtgl_list': cghtgl_list});
            // console.log(templateTest);
            $(obj).append(templateTest);

          // 判断合同的状态
          $('.status').each(function () {
              if(eval($(this).text())==1||eval($(this).text())==2||eval($(this).text())==3){
                  $(this).text('签署中');
              }else if(eval($(this).text())==4){
                  $(this).text('已完成');
              }else if(eval($(this).text())==5||eval($(this).text())==6||eval($(this).text())==7){
                  $(this).text('已作废');
              }else if(eval($(this).text())==8){
                  $(this).text('已过期');
              }
          })
        });
}
/**
 * 销售合同待签署、采购合同待签署
 * @param obj
 * @param uCode  当前操作人的id
 * @param uCompanyId 当前操作人的公司id
 * @param contractType 合同的类型  1采购  2销售
 * @param contractStatus  合同的状态  123签署中  4已完成  567已作废  8已过期
 * @param currentPage   当前页
 */
function contractSign(obj, uCode, uCompanyId, contractType, contractStatus, currentPage) {
    var htdqsxs=new MilkT(htdqsXs,3);
    htdqsxs.send({usercode:uCode, CompanyId:uCompanyId,contractType:contractType,contractStatus:contractStatus,currentPage:currentPage})
        .done(function (data) {
            // console.log(data);
            var list=data.contractEntityList;
            var compiled=_.template('<% _.forEach(List,function(list){\
            %>\
            <tr> \
                <td><a class="blue"><%= list.contractId %></a></td> \
                <td><%= list.contractName %></td> \
                <td><a class="blue"><%= list.orderId %></a></td> \
                <td><%= list.buyer %></td> <td><%= list.createBy %></td> \
                <td><%= list.seller %></td> \
                <td><%= list.createTime %></td>\
                <td><button type="button" class="btn btn-primary "><a href="<%= list.contractUrl %>">签署</a></button></td> \
            </tr>\
            <%});%>');
            var templateTest=compiled({'List':list});
            // console.log(templateTest);
            $(obj).append(templateTest);
        })
}


