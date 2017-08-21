

$(function(){
    window['open'] = {};    
    open.GetQueryString=function(name){
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)','i'); 
        var r = window.location.search.substr(1).match(reg); 
        if (r!=null) return (r[2]); return ''; 
    };
    var pro_ids=open.GetQueryString('id');//获取URL 参数id值
    var batchid=open.GetQueryString('BatchId');//获取URL 参数bachid值
         var usercode=store.get('usercode');
         console.log(typeof(usercode));
         console.log(typeof(usercode));
         console.log(batchid);




    var tem_carnum='';
       var tem_carsum='';
      // var count_num='';
       var bat_detail= new MilkT(pro_batch,3)
         bat_detail.send({goods_id:pro_ids,batch_id:batchid})
              .done(function(data){
                console.log(data+'*******************');
                  // var Batchid=data.batch_id;
                  var batch_id=data.batch_id;
                  console.log(batch_id);
                var datas=data.AttrList;
                console.log(datas);
                var template_left = $('#lefang_cont_left').text();
                var templateFn_left = _.template(template_left);
                var dom = templateFn_left(data);
                $('.cont_left').append(dom);

                
                 // 商品展示 放大镜效果
                $('#magnifier').magnifier();


                //纱线详情—— 产品基础属性列表  
                  
                // console.log(datas);
                var compiled = _.template('<% _.forEach(datas, function(pdata){ \
                   %>\
                   <li><%=pdata.name%></li>\
                   <li><%=pdata.attr_value%></li>\
                <% \
                 }); %>');
                var yarn_arr = compiled({'datas':datas});
                $('.base_attr').append(yarn_arr );

                // 产品信息
            
                // 获取库存总数量
               var count_num=data.count;
                // console.log( count_num);
                
                    var num=$('.buy_num').val();

                           //判断 当前文本内的值大于 总数值  时 小于0时
                $('.buy_num').blur(function(){
                  // 获取 input 值
                 num=Number($('.buy_num').val());

                 var re = /^[1-9]*[1-9][1-9]*$/
                 if(!re.test(num)){
                    $('.buy_num').val(1);
                 }
                      if($('.buy_num').val()>=Number(count_num)){
                          $('.buy_num').val(count_num);
                      }else if($('.buy_num').val()<=0 ) {
                          $('.buy_num').val(1);
                          // num=1;
                      }
                    });

                $('.jian').click(function(){
                                   
                  if(num<=1){
                    num=1;

                  }else if(num >= Number(count_num)){
                    num=Number(count_num)-1;
                  }else{
                    num=Number(num)-1; 
                  }    
                   $('.buy_num').val(num); 
                })
                    // console.log(num);
                
                //点击加数量
                $('.jia').click(function(){
                  // var num=$('.buy_num').val();
                  if(num >= Number(count_num)){
                    num=Number(count_num);
                  }else{
                    num=Number(num)+1;
                  }  
                   $('.buy_num').val(num);
                })


                  //点击立即购买 加入购入车接口
                  if(store.get('shoping_cart')){
                    var cart_amount=store.get('shoping_cart');
                  }else{
                    var cart_amount=Number($('main_nav_shopcart').children('a').find('span').text());
                  }
      
                  function login_after(){

                  $('.top_nav_login').html('退出');
                  $('.top_nav_login').next('a').html(' ');
                  $('.top_nav_login').next('a').css('border-left', 'none');
                  
              }  

               store.set('nums',num);
               store.set('batchId',batchid);
               
               store.set('yb_val','');
               //单击 购买样布
                $('#btn_yb').click(function(){
                    store.set('yb_val','2');
                    if(usercode==undefined){
                      $('.detail_zz').css('display','block');
                      $('.deta_login').css('display','block');
                       // 关闭按钮
                      $('.yarn_close').click(function() {
                          $('.detail_zz').css('display','none');
                         $('.deta_login').css('display','none');

                      });
                        $('.login_current').click(function () {
                        var ulog = new MilkT(eh, 3)
                        ulog.send({ usercode: $('#username').val(), password: md5($('#pwd').val()) })
                            .done(function (data) {
                                // console.log(data);
                                $('.hyuser').html(data.username + ',欢迎来到乐纺!');
                                login_after();
                                store.set('csrfToken', data.csrftoke);
                                store.set('usercode', data.usercode);
                                store.set('username', data.username);
                                store.set('userinfo', JSON.stringify(data.usercode));
                                // window.location.href = 'index.html';
                                $('.deta_login').css('display','none');
                                history.go(0);
                                })
                            .fail(function () {
                                alert('用户名或密码错误');
                                
                            })
                    });
                    }else{
                      $('.deta_login').css('display','none');
                      // var oScript= document.createElement("script");
                      // $(oScript).attr("type","text/javascript");
                      // $(oScript).attr("src","scripts/enterQPapply.js");
                      // document.body.append(oScript);
                      $('.btn_yb').attr('href', 'order_yang.html');
                     }
                 
            }); 
                          //单击 立即购买
             $('.btn_buy').click(function(){
                       num=$('.buy_num').val();
                         store.set('nums', num);
                    store.set('yb_val','1');
                    if(usercode==undefined){
                      $('.detail_zz').css('display','block');
                      $('.deta_login').css('display','block');
                          // 关闭按钮
                      $('.yarn_close').click(function() {
                          $('.detail_zz').css('display','none');
                         $('.deta_login').css('display','none');

                      });
                        $('.login_current').click(function () {
                        var ulog = new MilkT(eh, 3)
                        ulog.send({ usercode: $('#username').val(), password: md5($('#pwd').val()) })
                            .done(function (data) {
                                // console.log(data);
                                $('.hyuser').html(data.username + ',欢迎来到乐纺!');
                                login_after();
                                store.set('csrfToken', data.csrftoke);
                                store.set('usercode', data.usercode);
                                store.set('username', data.username);
                                store.set('userinfo', JSON.stringify(data.usercode));
                                // window.location.href = 'index.html';
                                $('.deta_login').css('display','none');
                                history.go(0);
                                })
                            .fail(function () {
                                alert('用户名或密码错误');
                                
                            })
                    });
                    }else{
                      $('.deta_login').css('display','none');
                      // var oScript= document.createElement("script");
                      // $(oScript).attr("type","text/javascript");
                      // $(oScript).attr("src","scripts/enterQPapply.js");
                      // document.body.append(oScript);
                      $('.btn_buy').attr('href','order_yang.html');

                     }
                 
            });
              // console.log(cart_amount);
                // 单击 加入购物车
                // console.log($('.btn_buy'));
                $('#goto_carty').click(function(){
                   // console.log(Batchid);
                    if(usercode==undefined){
                      $('.detail_zz').css('display','block');
                      $('.deta_login').css('display','block');
                       store.set('shoping_cart',0);
                       // var carts_nums=0;
                         // 关闭按钮
                      $('.yarn_close').click(function() {
                          $('.detail_zz').css('display','none');
                         $('.deta_login').css('display','none');

                      });
                        $('.login_current').click(function () {
                        var ulog = new MilkT(eh, 3)
                        ulog.send({ usercode: $('#username').val(), password: md5($('#pwd').val()) })
                            .done(function (data) {
                                // console.log(data);
                                $('.hyuser').html(data.username + ',欢迎来到乐纺!');
                                login_after();
                                store.set('csrfToken', data.csrftoke);
                                store.set('usercode', data.usercode);
                                store.set('username', data.username);
                                store.set('userinfo', JSON.stringify(data.usercode));
                                // window.location.href = 'index.html';
                                $('.deta_login').css('display','none');
                                history.go(0);
                                })
                            .fail(function () {
                                alert('用户名或密码错误');
                                
                            })
                    });
                }else{
                   $('.deta_login').css('display','none');
                        var shopcart_nums = new MilkT(shopcat_nums, 3)

                        shopcart_nums.send({usercode:usercode})
                            .done(function(data){
                                // console.log(data.value+"\\\\\\\\");
                                // $('.main_nav_shopcart').children('a').find('span').text(data.value);
                                // store.set('shopcar_val', data.value);
                                var tem_carnum=data.value;
                            //    console.log(tem_carnum=data.value+"==========================") ;
                            var  tem_carsum =Number(tem_carnum)+Number(carts_nums);
                              console.log(tem_carnum +'$$$$');
                              console.log(carts_nums+'$$$$');
                              console.log( tem_carsum+'$$$$');

                               $('.main_nav_shopcart').children('a').find('span').text(tem_carsum);
                               
                            })
                            .fail(function() {
                                $('.main_nav_shopcart').children('a').find('span').text('0');

                                    console.log('您尚未登录！');
                            })
                  
                //    tem_carsum =Number(tem_carnum)+Number(carts_nums);
                //    console.log(tem_carnum+"0000000000000");
                  $('.main_nav_shopcart').children('a').find('span').text(tem_carsum);
                    //1.获取导航的 cart 的数量
                     var carts_nums=++cart_amount;
                     store.set('shoping_cart',carts_nums)
                      console.log(carts_nums);
                      num=$('.buy_num').val();
                      $('.main_nav_shopcart').children('a').find('span').text(num);
                     // console.log(Batchid);

                    var shopcart_add = new MilkT(shopCartadd,3);
                        // console.log(batch_id);
                        shopcart_add.send({productId:pro_ids,batchId:batchid,nums:num,usercode:usercode})
                                    .done(function(data){
                                        console.log(data.value+'============================');
                                         $('.success_cart').css('display','block');
                                        setTimeout('$(\'.success_cart\').attr(\'style\',\'display:none\')',2000);
                                        // $('.main_nav_shopcart').children('a').find('span').text(store.get('shoping_cart'));
                                      })
                                    .fail(function() {
                                      console.log('失败');
                                
                                     })
                     
                 }
                 
                   });
             })

          
        

           var proCinfo = new MilkT(productCInfo,3)
            proCinfo.send({goods_id:pro_ids})
              .done(function(data){
                // console.log(data);
                  if(typeof(data.legalperson)=='undefined'){
                            data.legalperson='';
                        }

                        if(typeof(data.telphone)=='undefined'){
                            data.telphone='';
                        }
                        
                        if(typeof(data.enterprise_nature)=='undefined'){
                            data.enterprise_nature='';
                        }

                        if(typeof(data.area)=='undefined'){
                            data.area=' ';
                        }
                var template_info = $('#lefang_sj_info').text();
                var templateFn_info = _.template(template_info);
                var dom = templateFn_info(data);
                 $('.company_info').append(dom);

              })

     

                
})