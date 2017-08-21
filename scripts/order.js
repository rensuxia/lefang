$(function(){

    var template_order = $('#lefang_order').text();
    var templateFn_order = _.template(template_order);
    $('#lefangtex_order').append(templateFn_order);
    $('.alert_squre').hide();
    if(!store.get('usercode')){
        window.location.href='login.html';
    }

    $('.shopcart_step ul li.active img').attr('src','images/icon/step_point2.png');
    var enterIdS =[];
    var productNums =[];
    var productBachIds =[];
    var enIdNS='';
    var enIdNStest='';
    var shopCIds=store.get('shopCIds').join(',');
    console.log(shopCIds);
    var shopCReO = new MilkT(shopcartRO,3)
    shopCReO.send({shopCatIds:shopCIds})
            .done(function(data){
                console.log(data);
                var SCartO = data.shoppingCartEntityList;
                var dom = '';
               
                $(SCartO).each(function(i,m){
                    var a = '';
                     productNums =[];
                     productBachIds =[];
                    enterIdS.push(m.enterpriseId);
                    var arr = m.shoppingCartEntityList;
                    console.log(m);
                    console.log(arr);
                    // enIdNStest+='{\\"companyId\\":\\"'+m.enterpriseId+'\\",\\"batchIds\\":\\"';
                    $(arr).each(function(j,n){
                        console.log(n);
                        productNums.push(n.productNumber);
                        productBachIds.push(n.productBatchId);
                        console.log(productNums);
                        console.log(productBachIds);
                        enIdNS+='{\\"companyId\\":\\"'+m.enterpriseId+'\\",\\"batchIds\\":\\"'+n.productBatchId+'\\",\\"productNumbers\\":\\"'+n.productNumber+'\\"},';
                        // enIdNStest+=n.productBatchId+'\\",\\"productNumbers\\":\\"'+n.productNumber+'\\"';
                        if(n.productPrice===undefined){
                            n.productPrice='100.00';
                        }
                        if(n.productUnit===undefined){
                            n.productUnit='码';
                        }

                        a+='<ul class="clearfix">\
                            <li>\
                                <!--<img src="images/icon/check.png" alt="">-->\
                                <a href="javascript:;">\
                                    <img src="'+n.productImage+'" alt="">\
                                </a>\
                            </li>\
                            <li class="shopcart_name">\
                                <a href="javascript:;">'+n.productName+'</a>\
                            </li>\
                            <li class="shopcart_price">\
                                <em>￥'+n.productPrice+'</em><em>/</em><em>'+n.productUnit+'</em>\
                            </li>\
                            <li class="shopcart_num">\
                                <span>'+n.productNumber+'</span>\
                            </li>\
                            <li class="shopcart_totalprice">\
                                <span>￥<em>'+n.totalPrice+'</em></span>\
                            </li>\
                        </ul>';
                        })
                        var e='<div class=\'shopcar-order-des\'>\
                            <div class=\'order_company\'>\
                                <ul class=\'company_icon\'>\
                                    <li>\
                                        <img src=\'images/icon/company_icon.png\' alt=\'\'>\
                                        <span>'+m.companyName+'</span>\
                                    </li>\
                                </ul>'
                                +a+
                            '</div>\
                        </div>';
                        dom+=e;
                        enIdNStest+='{\\"companyId\\":\\"'+m.enterpriseId+'\\",\\"batchIds\\":\\"'+productBachIds.join(',')+'\\",\\"productNumbers\\":\\"'+productNums.join(',')+'\\"},';
                })

                    console.log(enIdNS);
                    console.log(enIdNStest);
                $('.shopcart_dh_list').append(dom);
                var shopTotalPrice=0;
                $('.shopcart_totalprice em').each(function(){
                    shopTotalPrice+=Number($(this).text());
                })
                $('.pro_Total_Price').text(parseFloat(Number(shopTotalPrice)).toFixed(2));
                $('.need_payFor').text('￥'+parseFloat(Number(shopTotalPrice)).toFixed(2));
            })
           

        //收货地址接口
        var add_default='';
        var add_uCode=store.get('usercode');
        console.log(add_uCode);
        var addre = new MilkT(addressA,3)
            addre.send({usercode:add_uCode})
                .done(function(data){
                        console.log(data);
                        var add_data = data.addressEntity;
                        var compiled = _.template('<% _.forEach(add_data, function(pdata) { \
                        %><div class="choice-address left">\
                            <a href="javascript:;">\
                                <span> <%=pdata.username%> </span> <br/>\
                                <span><%=pdata.address%></span><br/>\
                                <span><%=pdata.phone_number%></span><br/>\
                              </a>\
                            <img src="images/icon/address_check.png" alt="">\
                            <p class="add-status" style="display:none;"><%= pdata.status%></p>\
                            <p class="add-ids" style="display:none;"><%= pdata.id%></p>\
                          </div>\
                          <% \
                    }); %>');
                    var address_list_all = compiled({'add_data':add_data});
                    $('.address-list-all').append(address_list_all);

                    $('p.add-status').each(function(){
                        var add_status = $(this).text();
                        console.log(add_status);
                         if(add_status=='1'){
                             add_default=$(this).next().text();
                             $(this).prev('img').attr('src','images/icon/address_check_on.png');
                        }
                    })
                    $('.choice-address').click(function(){
                      console.log($(this).index());
                      $('.choice-address img').attr('src','images/icon/address_check.png');
                      $('.choice-address').eq($(this).index()).find('img').attr('src','images/icon/address_check_on.png');
                        var add_id_dj = $(this).find('.add-ids').text();
                        add_default = add_id_dj;
                        console.log(add_id_dj);
                        console.log(add_default);
                    })
                })




        //订单保存接口
        var pro_ids_js = store.get('pro_ids_js');
        var pro_num_js = store.get('pro_num_js');
        console.log(add_default);
        var EIds='';
              $('.cost-sub-order').click(function(){
                  EIds='['+enIdNStest.substr(0,enIdNStest.length-1)+']';
                  console.log(enIdNS);
                  console.log(add_default);
                  console.log(add_uCode);
                  console.log(EIds);
                  store.set('addressId',add_default);
                  var enBPNums=[];
                  console.log(enterIdS);
                    console.log(shopCIds);
                  var orderS = new MilkT(orderSave,3)
                      orderS.send({address:add_default,usercode:add_uCode,shopCatIds:shopCIds,remark:''})
                        .done(function(data){
                            console.log(data);
                            $('.alert_squre').show();
                            $('.squre_orderSu a').click(function(){
                                window.location.href='D-purchaseList.html';
                            })
                        })
                        .fail(function(){
                            alert('提交失败!!!');
                        })
              })

            console.log(store.get('shopCIds').length);
            $('.totalNums').text(store.get('shopCIds').length);
            console.log($('.shopcart_totalprice em').text())
            


})
