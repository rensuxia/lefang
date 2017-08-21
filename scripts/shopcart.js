$(function(){
    console.log(store.get('usercode'));
     
    var uCode=store.get('usercode');
    if(store.get('usercode')==undefined){
        window.location.href = 'login.html';
    }
    var template = $('#lefang_shopcart').text();
    var templateFn = _.template(template);
    $('#lefangtex_shopcart').append(templateFn);
    $('.shopcart_step ul li.active img').attr('src','images/icon/step_point2.png');
    var shoppingCart = new MilkT(shopCart,3);
    shoppingCart.send({usercode:uCode})
        .done(function(data){
            console.log(data);
            
            
            //购物车列表循环
            var shopCdata = data.shoppingCartEntityList;
            var dom='';
            $(shopCdata).each(function(i,m){
                    var a = '';
                    var arr = m.shoppingCartEntityList;
                    $(arr).each(function(j,n){
                        if(n.productPrice===undefined){
                            n.productPrice='100.00';
                        }
                        if(n.productUnit===undefined){
                            n.productUnit='码';
                        }

                        a+='<ul class="clearfix">\
                                <li>\
                                    <img class="checking" src="images/icon/check_on.png" alt="">\
                                    <a href="javascript:;">\
                                        <img src="'+n.productImage+'" alt="">\
                                    </a>\
                                </li>\
                                <li class="pro_Name">\
                                    <a href="javascript:;">\
                                        '+n.productName+'\
                                    </a>\
                                </li>\
                                 <!--<li class="pro_sCation">\
                                    <span>'+n.productSpecification+'</span>\
                                </li>-->\
                                <li class="shopcart_price pro-danjia">\
                                    <em>￥</em><em class="pro-price">'+n.productPrice+'</em><em>/</em><em>'+n.productUnit+'</em>\
                                </li>\
                                <li class="shopcart_num">\
                                    <a href="javascript:;" class="shop-jian">-</a>\
                                    <span class="shopnum">'+n.productNumber+'</span>\
                                    <a href="javascript:;" class="shop-jia">+</a>\
                                    <strong style="display:none;">'+n.shopCartId+'</strong>\
                                </li>\
                                <li class="shopcart_totalprice por-totalP">\
                                    <span>￥</span><span class="shopcart_total_price pro-money">'+n.totalPrice+'</span>\
                                </li>\
                                <li class="shopcart_delete">\
                                    <a href="javascript:;" class="shopdel">\
                                        <span>\
                                            <img src="images/icon/delete.png" alt="">\
                                            删除\
                                        </span>\
                                    </a>\
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
                })
            $('.shopcart_dh_list').append(dom);

              //商品删除
            $('.shopdel').click(function(){
                console.log($(this).parent().prevAll('.shopcart_num').find('strong').text());
                //调用商品删除的接口
                var shopDel = new MilkT(shopCartDel,3)
                //id为购物产品id
                shopDel.send({id:$(this).parent().prevAll('.shopcart_num').find('strong').text()})
                    .done(function(data){
                        console.log(data);
                        console.log(data.value);
                        if(data.value==1){
                        alert('删除成功');
                        var pro_id_jh=[];
                        $('.pro_id_jh').each(function(){
                            pro_id_jh.push($(this).text());
                        })
                        var pro_ids_jh=pro_id_jh.join(',');
                        store.set('pro_ids_js',pro_ids_jh);
                        history.go(0);
                        }else{
                        alert('删除失败');
                        }
                    })
            })

            var shopcart_nums = 0;
            function nums_sum(){
                $('img[class=\'checking\']').each(function(){
                    if($(this).attr('src')=='images/icon/check_on.png'){
                        // shopcart_nums+=Number($(this).parent().nextAll('.shopcart_num').find('.shopnum').text());
                        shopcart_nums++;
                    }
                    $('.shopcart_pro_nums').text(shopcart_nums);
                 })
            }
            nums_sum();
            var totalP =0;
            function price_sum(){
                $('img[class=\'checking\']').each(function(){
                    if($(this).attr('src')=='images/icon/check_on.png'){
                        totalP=parseFloat(Number(totalP)+Number($(this).parent().nextAll('.por-totalP').find('.shopcart_total_price').text())).toFixed(2);
                    }
                 })
                 $('.shopcart_pro_total').text('￥'+totalP);
            }
            price_sum();
            //购物车数量减
            if($('.shop-jian').length>0){
                $('.shop-jian').each(function(){
                    var pro_nums=0;
                      $(this).bind('click',function(){
                        var shopCount=$(this).next('span').text();
                        if(Number(shopCount)<=1){
                          shopCount=1;
                        }else{
                          shopCount=Number(shopCount-1);
                        }
                       $(this).next('span').text(shopCount);
                       pro_nums=$(this).next('span').text();
                       var pro_unit_price=$(this).parent().prev('.shopcart_price').find('.pro-price').text();
                       var updateNums='';
                       var updateHtml=$(this);
                       var numsChange = new MilkT(shopcartUpdate,3);
                        numsChange.send({shopCartId:$(this).nextAll('strong').text(),nums:$(this).next().text()})
                         .done(function(data){
                             console.log(data);
                            updateNums=data.totalPrice;
                            console.log(updateNums);
                            $(updateHtml).parent().next('.shopcart_totalprice').find('.pro-money').text(updateNums);
                            totalP=0;
                            price_sum();  
                         })
                    
                        shopcart_nums = 0;
                        nums_sum();
                         
                      });
                });

            };

            //购物车数量加
            if($('.shop-jia').length>0){
                $('.shop-jia').each(function(){
                    $(this).bind('click',function(){
                        var shopCount=$(this).prev('span').text();
                        shopCount=Number(shopCount);
                        shopCount=Number(shopCount)+1;
                        $(this).prev('span').text(shopCount);
                        var updateNums='';
                        var updateHtml=$(this);
                        var numsChange = new MilkT(shopcartUpdate,3);
                        numsChange.send({shopCartId:$(this).nextAll('strong').text(),nums:$(this).prev().text()})
                         .done(function(data){
                             console.log(data);
                            updateNums=data.totalPrice;
                            console.log(updateNums);
                             $(updateHtml).parent().next('.shopcart_totalprice').find('.pro-money').text(updateNums);
                             totalP=0;
                             price_sum();
                         })
                        shopcart_nums = 0;
                        nums_sum();
                        
                    });
                });
            };

            //选中，全选
            
            $('.choAll').click(function(){
                console.log($(this).attr('src'));
              if($(this).find('img').attr('src')=='images/icon/check_all.png'){
                $('img[class=\'checking\']').each(function(){
                    $(this).attr('src','images/icon/check_on.png');
                });
                $('.choAll').find('img').attr('src','images/icon/check_on.png');
                $('.check_dh').attr('src','images/icon/check_on.png');
              }else{
                $('img[class=\'checking\']').each(function(){
                  $(this).attr('src','images/icon/check.png');
                });
                $('.choAll img').attr('src','images/icon/check_all.png');
                $('.check_dh').attr('src','images/icon/check_all.png');
              }
                shopcart_nums = 0;
                nums_sum();
                totalP=0;
                price_sum();
            });

            $('.check_dh').click(function(){
                console.log($(this).attr('src'));
              if($(this).attr('src')=='images/icon/check_all.png'){
                $('img[class=\'checking\']').each(function(){
                    $(this).attr('src','images/icon/check_on.png');
                });
                $(this).attr('src','images/icon/check_on.png');
                $('.check_dh').attr('src','images/icon/check_on.png');
              }else{
                $('img[class=\'checking\']').each(function(){
                  $(this).attr('src','images/icon/check.png');
                });
                $(this).attr('src','images/icon/check_all.png');
                $('.check_dh').attr('src','images/icon/check_all.png');
              }
                shopcart_nums = 0;
                nums_sum();
                totalP=0;
                price_sum();
            });

            $('.checking').click(function(){
                if($(this).attr('src')=='images/icon/check.png'){
                    $(this).attr('src','images/icon/check_on.png');
                   
                }else{
                    $(this).attr('src','images/icon/check.png');
                }
                 shopcart_nums = 0;
                 nums_sum();
                totalP=0;
                price_sum();
            })

            //将选中的shopcartId保存
            var shopCIds=[];
            $('.haveSBuy').click(function(){
                 $('img[class=\'checking\']').each(function(){
                     if($(this).attr('src')=='images/icon/check_on.png'){
                         shopCIds.push($(this).parent().nextAll('.shopcart_num').find('strong').text());
                     }
                 })
                    // console.log(store.get("shopCIds").join(","));
                    if(shopCIds.join(',')){
                        // alert("11");
                        window.location.href='order.html';
                        store.set('shopCIds',shopCIds);
                    }else{
                        alert('请选择商品');
                    }
                   
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
        })
})
