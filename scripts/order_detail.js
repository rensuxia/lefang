$(function() {
	//  var template_qygl = $('#lefang_qygl').text();
    //     var templateFn_qygl = _.template(template_qygl);
    //     $('#lefangtex_qygl').append(templateFn_qygl);
        /*会员中心和实名认证的切换*/
        $('.qygl-left-con>ul>li').mouseenter(function(){
            $('.qygl-left-con>ul>li>div').hide();
            $(this).find('div').show();
        })
        $('.qygl-left').mouseleave(function(){
            $('.qygl-left-con>ul li div').hide();
        })
        $('.qygl-left-con>ul>li:first-of-type').hover(function(){
            $(this).css('background','#fff');
        })
		$('.qygl-left ul li.active img').attr('src','images/icon/订单管理_press.png');

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
        $('.qygl-left-con>ul>li').eq(1).mouseenter(function(){
            $(this).find('img').attr('src','images/icon/会员中心_press.png');
        }).mouseleave(function(){
            $(this).find('img').attr('src','images/icon/会员中心.png');
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


	//订单详情
	var template_check = $('#lefang_check').text();
	var templateFn_check = _.template(template_check);
	$('.qygl-right').append(templateFn_check);
	$('.order_logistics .order_logistics_main').hide();
	$('.order_logistics .order_logistics_detail').hide();
	$('.order_logistics').append('<div class="order_logistics_img"><img src="images/pic/no_wuliu.jpg"></div>');
	$('.order_logistics_img').css({'width':'926px','text-align':'center'});
	$('.order_logistics_img img').css({'width':'500px','margin':'40px auto'});
	var x = store.get('order_id');
	console.log(x);
	// alert(x.order_id);
	//  alert(x.receiving_address_id);
	/*订单详情*/
				$('.order_information>div').css('width',100/$('.order_information>div').length+'%');
				if($('.order_information>div').length==3){
					$('.order_information>div ul').css({'width':'80%','margin':'0 auto'})
				}
				// $('.order_information>div').css({'width':'232px'});
	            var stance = new MilkT(orderDetail, 3);
	                stance.send({id:x}).done(function (data) {
								console.log(data);
								$('.order_bath_no').append(data.order_code);						
								$('.order_buyers_companyName').append(data.seller);
								$('.order_buyers_address').append(data.position);
								$('.order_buyers_mobile').append(data.buyers);
								var pdata = data.OrderProducts;
								console.log(pdata);
								$(pdata).each(function(i,m){
									var e = ''; 
									
									e+='<ul class="order_pro_msg clearfix">\
											<li class="order_pro_name clearfix">\
													<a href="javascript:;" class="left order_img">\
														<img src="'+m.main_pic+'" alt="">\
													</a>\
													<a href="javascript:;" class="left">\
														'+m.product_name+'\
													</a>\
											</li>\
											<li>\
												<span>￥<em>'+m.refer_price+'</em>/<em>码</em></span>\
											</li>\
											<li class="order_pro_num">\
												<span>'+m.count+'</span>\
											</li>\
											<li class="order_pro_statu order_pro_money">\
												<span>\
													订单总额:\
													<strong>\
														￥<em>'+data.total_price+'</em>\
													</strong>\
												</span>\
											</li>\
											<li class="order_pro_statu order_pro_dsh">\
												<span>待收货</span>\
											</li>\
											<li class="order_true_sh">\
												<a href="javascript:;">确认收货</a>\
											</li>\
										</ul>';

										$('.order_pro_information').append(e);
										if(data.ispay==1){
											$('.order_pro_dsh span').text('未支付');
											$('.order_true_sh a').text('确认支付');
										}else if(data.isplay==2){
											$('.order_pro_dsh span').text('已支付');
											$('.order_true_sh a').css('background','#ccc');
											$('.order_true_sh a').attr('href','javascript:;');
										}else if(data.isplay==3){
											$('.order_pro_statu span').text('部分支付');
										}else if(data.isplay==4){
											$('.order_pro_statu span').text('已取消订单');
										}
										$('.order_pro_name a:nth-of-type(2)').css('line-height','70px');
								})

	//                           // data.order_time=todate(data.order_time,'-',true);
	                            // var template_check = $('#lefang_check').text();
	                            // var templateFn_check=_.template(template_check);
	                            // var dom = templateFn_check(data);
	                            //    $('.qygl-right').append(dom);
	//                                   if($('.oPay').text()==2){
	//                                       $('.oPay').text('已支付');
	//                                       $('.oPay').css('color','#e61');
	//                                   }else if($('.oPay').text()==1){
	//                                       $('.oPay').text('未支付');
	//                                       $('.oPay').css('color','#169BD5');
	//                                 }
	//                            var compiled = _.template('<% _.forEach(productData, function(productData) { \
	//                         %><ul class="clearfix goods_buy">\
	//                         <li>\
	//                              <a href="javascript:;">\
	//                     <img src="<%= productData.main_pic%>" alt="">\
	//                     </a>\
	//                     </li>\
	//                     <li>\
	//                     <a href="javascript:;">\
	//                        <%= productData.product_name%>\
	//                     </a>\
	//                     </li>\
	//                     \
	//                     \ <li>\
	//                     <a href="javascript:;">\
	//                        <%= data.seller%>\
	//                     </a>\
	//                     </li>\
	//                     <li>\
	//                     <em  id="pcount">￥<%= productData.count%></em><em>码</em>\
	//                   </li>\
	//                    <li>\
	//                     <span id="pprice"><%= productData.refer_price%></span>\
	//                     </li>\
	//                     <li>\
	//                     <span>499</span>\
	//                     </li>\
	//                     <li>\
	//                     <span>￥0.00</span>\
	//                   </li>\
	//                   <li >\
	//                   <a href="javascript:;">\
	//                     联系商家\
	//                     </a>\
	//                     </li></ul>\
	//                           <% \
	//                     }); %>');

	//                      console.log(pp,cc);
	//                   var tempProduct= compiled({'productData':data.OrderProducts,'data':data});
	//                   $('.goods_info').append(tempProduct);

	//                   function mul(a, b) {
	//                     var mul=a*b;
	//                     return mul;
	//                   }
	//                   mul(2,3);
					})
				


					//判断是否为空
					function IsEmpty(value){
						return value=='' || value=='null' || value=='undefined' ||  typeof(value)=='undefined' || value==undefined || value==null;
					}



	//      /*收货地址*/

	//             var uBuyer=store.get('usercode');
	//             var address=new MilkT(addressList,3);
	//             address.send({usercode:uBuyer})
	//                   .done(function (data) {
	//                           // console.log(data);
	//                           var resultData=data.addressEntity;
	//                           for(var i=0;i<resultData.length;i++){
	//                             // console.log(resultData[i].id);
	//                             if(resultData[i].id==x.receiving_address_id){
	//                                   var resultData=data.addressEntity;
	//                                   var compiled = _.template('\
	//                                         <div class="choice_addrr">\
	//                                     <a href="javascript:;">\
	//                                 <span> <%= resultData.username%> </span> <br/>\
	//                                 <span> <%= resultData.address%></span><br/>\
	//                                 <span>  <%= resultData.pbone_number%></span><br/>\
	//                                 </a>\
	//                                 <img src="images/icon/address_check_on.png" alt="">\
	//                                 </div> ');
	//                                     var templateOrder=compiled({ 'resultData': resultData[i]});
	//                                   $('.receive_addrr').append(templateOrder);
	//                             }
	//                          }
	//               });
})

/**转换日期格式*/
// function todate(inputstr, showsplit, showweek) {
//   //Wed Mar 22 13:38:37 CST 2017
//   inputstr = inputstr + ''; //末尾加一个空格
//   var date = '';
//   var month = new Array();
//   var week = new Array();
//   month['Jan'] = 1;
//   month['Feb'] = 2;
//   month['Mar'] = 3;
//   month['Apr'] = 4;
//   month['May'] = 5;
//   month['Jan'] = 6;
//   month['Jul'] = 7;
//   month['Aug'] = 8;
//   month['Sep'] = 9;
//   month['Oct'] = 10;
//   month['Nov'] = 11;
//   month['Dec'] = 12;
//   week['Mon'] = '一';
//   week['Tue'] = '二';
//   week['Wed'] = '三';
//   week['Thu'] = '四';
//   week['Fri'] = '五';
//   week['Sat'] = '六';
//   week['Sun'] = '日';
//   var str = inputstr.split(' ');
//   date = str[5];
//   date += showsplit + month[str[1]] + showsplit + str[2];
//   if(showweek){
//     date += '    ' + ' 星期' + week[str[0]];
//   }
//   return date;
// }
