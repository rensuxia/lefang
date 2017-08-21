$(function(){
	  // var template_shopcar = $('#lefang-shopcar').text();
    // var templateFn_shopcar = _.template(template_shopcar);
    // $('#lefangtex-shopcar').append(templateFn_shopcar);
    console.log(store.get('usercode'));
    var uCode=store.get('usercode');
    var shoppingCart = new MilkT(shopCart,3);
    shoppingCart.send({usercode:uCode})
        .done(function(data){
          console.log(data);
          var template = $('#lefang-shopcar').text();
          var templateFn = _.template(template);
          var dom = templateFn(data);
          $('#lefangtex-shopcar').append(dom);

          //购物车列表循环
          var shopCdata = data.ShoppingCartEntity;
          var compiled = _.template('<% _.forEach(shopCdata, function(pdata) { \
              %><div class="shopcar-order">\
              <div class="shopcar-store">\
                <input type="checkbox" class="checkNO1">\
                <a href="javascript:;">\
                  店铺:<em>foss旗舰店</em>\
                </a>\
              </div>\
              <div class="shopcar-des-line">\
                <ul class="shopcar-des-pro">\
                  <li>\
                    <input type="checkbox" name="" class="checkNO1">\
                    <a href="javascript:;">\
                      <img src="images/2f_bamboo_cloth.png" alt="">\
                    </a>\
                  </li>\
                  <li class="shpcar-pro-des">\
                    <a href="javascript:;">\
                      <%= pdata.ProductEntityList[0].product_name%>\
                      ASICS亚瑟士GEL-LYTEIII男女鞋运动跑步鞋FOSS H6X2L\
                    </a>\
                    <span>\
                      <em>鞋码:<i>39.5</i></em>\
                      <br>\
                      <em>颜色分类:<i>蓝黑/蓝黑</i></em>\
                    </span>\
                  </li>\
                  <li class="pro-danjia">\
                    <del class="pro-exp">￥890.00</del>\
                    <br>\
                    <span class="pro-price">￥<%= pdata.unit_price%></span>\
                  </li>\
                  <li class="shopcar-des-num">\
                    <strong class="shop-jian">-</strong>\
                      <input type="text" class="shopnum" value="<%= pdata.nums %>">\
                    <strong class="shop-jia">+</strong>\
                  </li>\
                  <li class="pro-totalP">\
                    <span class="pro-money">￥<%= pdata.total_price%></span>\
                  </li>\
                  <li>\
                    <a href="javascript:;" class="shopdel">删除</a>\
                  </li>\
                </ul>\
              </div>\
            </div>\
            <p class="pro_nums_jh" style="display:none"><%= pdata.nums %></p>\
            <p class="pro_id_jh" style="display:none"><%= pdata.productId %></p><% \
          }); %>');
          var shopcar_des_pro = compiled({'shopCdata':shopCdata});
          $('.shopcar-order-des').append(shopcar_des_pro);
            console.log($('.pro_nums_jh').text());
             var pro_num_jh=[];
              $('.shopnum').each(function(){     
                pro_num_jh.push($(this).val());
              })
              var pro_nums_jh=pro_num_jh.join(',');
              console.log(pro_nums_jh);
              store.set('pro_num_js',pro_nums_jh);
            $('.shopnum').change(function(){
              var pro_num_jh=[];
              $('.shopnum').each(function(){     
                pro_num_jh.push($(this).val());
              })
              var pro_nums_jh=pro_num_jh.join(',');
              console.log(pro_nums_jh);
              store.set('pro_num_js',pro_nums_jh);
            })
            
            
           var pro_id_jh=[];
          $('.pro_id_jh').each(function(){
            pro_id_jh.push($(this).text());
          })
          var pro_ids_jh=pro_id_jh.join(',');
            store.set('pro_ids_js',pro_ids_jh);
            
          
            $('.shopnum').each(function(){
              $(this).blur(function(){
                var nums=$(this).val();
                var danjia=$(this).parent().prev('.pro-danjia').find('.pro-price').text();
                var danj=danjia.substring(1,danjia.length-1);
                $(this).parent().next('.pro-totalP').find('.pro-money').text('￥'+Number(nums)*parseFloat(danj).toFixed(2));
              })
            })
            // var tt=0;
            // $(".pro-totalP").each(function(){
            //   var xx = $(this).text();
            //   console.log(xx.length);
            //   var totalp = xx.substring(1,xx.length-1);
            //   console.log(totalp);
            //   tt = tt + Number(totalp);
            // })
            // console.log(tt);

            if($('.shop-jian').length>0){    
                $('.shop-jian').each(function(){
                      $(this).bind('click',function(){
                        var shopCount=$(this).next('input').val();        
                        if(Number(shopCount)<=1){
                          shopCount=1;
                        }else{
                          console.log(shopCount);
                          shopCount=Number(shopCount-1);
                          console.log(shopCount);
                        }                 
                       $(this).next('input').val(shopCount);
                      });
                });
            };
            
        
            
            if($('.shop-jia').length>0){
                $('.shop-jia').each(function(){
                      $(this).bind('click',function(){
                        var shopCount=$(this).prev('input').val();
                     
                        shopCount=Number(shopCount); 
                          shopCount=Number(shopCount)+1; 
                        $(this).prev('input').val(shopCount);
                      });
                });
            };

            //选中，全选
            $('.choAll').click(function(){
              if(this.checked){
                $('input[class^=\'checkNO\']').each(function(){
                  $(this).prop('checked',true);
                });
              }else{
                $('input[class^=\'checkNO\']').each(function(){
                  $(this).prop('checked',false);
                });
              }  
            });
          $('.shopdel').click(function(){
            //调用商品删除的接口
            var shopDel = new MilkT(shopCartDel,3)
            //id为购物产品id
            shopDel.send({id:data.ShoppingCartEntity[0].id})
                  .done(function(data){
                    console.log(data);
                    console.log(data.value);
                    if(data.value==1){
                      alert('删除成功');
                      history.go(0);
                    }else{
                      alert('删除失败');
                    }
                  })
            })

            //全部删除（有待处理）
            $('.shopcar-delete').click(function(){
              $('.pro_id_jh').each(function(){
                var shopDel = new MilkT(shopCartDel,3)
                //id为购物产品id
                shopDel.send({id:data.ShoppingCartEntity[0].id})
                      .done(function(data){
                        console.log(data);
                        console.log(data.value);
                        if(data.value==1){
                          alert('删除成功');
                          history.go(0);
                        }else{
                          alert('删除失败');
                        }
                      })
              })
            })

            //验证input框只有正整数
            $('.shopnum').change(function(){
                  var reg =  /^[0-9]*[1-9][0-9]*$/;
                    if(!reg.test($(this).val())){
                      if($(this).val()==''){
                        $(this).val(1);
                      }else{
                        $(this).val(1);
                      }
                    }
              })
        });
        
        

      
       
       
});