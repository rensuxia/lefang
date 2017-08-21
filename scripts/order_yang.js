$(function(){
                 var nums =store.get('nums');

                 var batch_id =store.get('batchId');
                 var yb_val=store.get('yb_val');
                 var usercode =store.get('usercode');
                 // console.log(yb_val);
                 console.log(nums);
                 console.log(batch_id);
                 console.log(usercode);



                // 判断小样和大货
                if(store.get('yb_val')==2){
                            var types=store.get('yb_val');
                           var SmallOrder= new MilkT(Small_Order,3);
                                 SmallOrder.send({productBatchId:batch_id,productNumbers:'1'})
                                    .done(function(data){
                                        console.log(data);
                                        // var price=data.productPrice;
                                          var template_order = $('#lefang_order').text();
                                          var templateFn_order = _.template(template_order);
                                          // $('').append(templateFn_order);
                                        var dom = templateFn_order(data);
                                        $('#lefangtex_order').append(dom);

                                         $('#order_title').text('小样订单');

                                         //订单保存接口
                                                  //订单保存接口   
                                        $('.cost-sub-order').click(function(){
                                                var Smallorder_save= new MilkT(smorder_save,3);
                                                Smallorder_save.send({address:add_default,productBatchId:batch_id,productNumbers:'1',usercode:usercode,type:types})
                                                            .done(function(data){
                                                                     console.log(data);
                                                             window.location.href='D-purchaseList.html';

                                                                 })
                                                             
                                                     })
     

                                      })

                                    .fail(function() {
                                      console.log('失败');
                                
                                     })

                        }
                        else{
                            var types=store.get('yb_val');

                                 var SmallOrder= new MilkT(Small_Order,3);
                                    SmallOrder.send({productBatchId:batch_id,productNumbers:nums})
                                    .done(function(data){
                                        console.log(data);
                                        var price=data.productPrice;
                                        var nums =data.productNumber;
                                        // var sum=price*nums;
                                        var sum=(parseFloat(Number(nums)*Number(price))).toFixed(2);
                                        console.log(sum);
                                          var template_order = $('#lefang_order').text();
                                          var templateFn_order = _.template(template_order);
                                          // $('').append(templateFn_order);
                                        var dom = templateFn_order(data);
                                        $('#lefangtex_order').append(dom);
                                        
                                        $('#order_title').text('大货订单');
                                        $('#shopcart_price').text('￥'+data.productPrice);
                                        $('#shopcart_totalprice').text('￥'+data.productPrice);
                                        $('#shopcart_num').text(data.productNumber);
                                        $('#shopcart_totalprice').text('￥'+sum);
                                        $('.pro_Total_Price').text('￥'+sum);
                                        $('.need_payFor').text('￥'+sum);
                                                         //订单保存接口   
                                        $('.cost-sub-order').click(function(){
                                                var Smallorder_save= new MilkT(smorder_save,3);
                                                Smallorder_save.send({address:add_default,productBatchId:batch_id,productNumbers:nums,usercode:usercode,type:types})
                                                            .done(function(data){
                                                                     console.log(data);
                                                             window.location.href='D-purchaseList.html';
                                                             
                                                                 })
                                                           
                                                     })
     

                                      })

                                    .fail(function() {
                                      console.log('失败');
                                
                                     })

                            


                }

    
  
        //收货地址接口
        var add_default='';
        var addre = new MilkT(addressA,3)
            addre.send({usercode:usercode})
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
        // var pro_ids_js = store.get('pro_ids_js');
        // var pro_num_js = store.get('pro_num_js');
        
        // var EIds='';
        //       $('.cost-sub-order').click(function(){
        //         console.log(add_default);
        //           // EIds='['+enIdNStest.substr(0,enIdNStest.length-1)+']';
        //           // console.log(enIdNS);
        //           alert('订单已生成，即将为您跳转到支付页面');
                //   console.log(add_default);
                //   console.log(add_uCode);
                //   console.log(EIds);
                //   var enBPNums=[];
                //   console.log(enterIdS);
                // //   $(enterIdS).each(function(i,a){
                // //     console.log(a);
                // //     $(productNums).each(function(j,k){
                // //         console.log(k);
                // //     })
                // //   })
                // //   alert(pro_ids_js+pro_num_js+add_uCode+add_default);
                //     console.log(shopCIds);
                //   var orderS = new MilkT(orderSave,3)
                //       orderS.send({address:add_default,usercode:add_uCode,shopCatIds:shopCIds,remark:''})
                //           .done(function(data){
                //               console.log(data);
                //               alert('提交成功!!!');
                //           })
                //           .fail(function(){
                //               alert('提交失败!!!');
              //   //           })
              // })

              // console.log(store.get('shopCIds').length);
            //   console.log(shopCIds);
            // $('.totalNums').text(store.get('shopCIds').length);
            // console.log($('.shopcart_totalprice em').text())





          

})
