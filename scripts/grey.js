$(function(){
		// 获取导航 ID
	     window['open'] = {};    
    open.GetQueryString=function(name){
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)','i'); 
        var r = window.location.search.substr(1).match(reg); 
        if (r!=null) return (r[2]); return ''; 
    };
    var pro_id=open.GetQueryString('categoryid');//获取URL 参数id值
         // 
         console.log( pro_id);

	var template = $('#sxlb_nr').text();
    var templateFn = _.template(template);
    $('#sxlb_conent').append(templateFn);
		
		var up=1;
		$('.dq_up').click(function(){
   			if(up==1){
   				 $(this).children('img').css('webkit-transform','rotate(180deg)');
   				 $(this).addClass('active');
   				 up=2;
   			}else{
   				$(this).children('img').css('webkit-transform','rotate(0deg)');
   				 $(this).removeClass('active');
   				up=1;
   			}
   		  $('.sx_menu').slideToggle('slow');		
  });
		
			var data_type='';
		// 	var ear_val=$('.fab_inp').val();//key  
		// 	console.log(data_type);// type 排序 值
		// 	console.log(sear_val);// key sear val
  //           console.log(lb_vlues);//  筛选值
  //           console.log(lb_ids);// 筛选ID
  //           // console.log(pages);

	// console.log("111111111");
	// console.log($(".main_nav_list ul li.active").children('a').text());
	// var pro_id=$(this).data('id');
	// var pro_id=239;
//筛选子页API
		var cf= new MilkT(prod_Category ,3)
         	cf.send({categoryId:pro_id})
              .done(function(data){
                console.log(data);
                var one_list=data.productCategoryEntityList;
                console.log(one_list);
              
	  			   var sx_nav = _.template('<% _.forEach(one_list, function(data){ \
                  %>\
								<a href="#" data-id="<%= data.categoryId %>"><%= data.categoryName %> \
								</a>\
					<%\
                });%>');
	  			    var templateTest=sx_nav({'one_list':one_list});
               		 $('#one').append(templateTest);

            	//第一个 不限 hover 的样式
            

    //        $("#cf_bx").siblings().hover(
		  // function () {
		  //   $(this).children('img').attr('src', './images/icon/arrow_sq.png');
		  //   	// $(".two_box").css("display","block");
		  // },
		  // function () {
		  // $(this).children('img').attr('src', './images/icon/arrow_zk.png');
		 	//  // $(".two_box").css("display","none");
		  // }
		  // );


    //成分  选项卡
	// $(".lefang_news_zhishi").hide();
	$('#one a:not(:first-of-type)').mouseenter(function(){
		var bx_index=$(this).data('id');
		// console.log(bx_index);
		$('#one a ').eq($(this).index()).addClass('.orange').siblings().removeClass('.orange');
		// $('.two_box').hide();
		// $('.two_box').eq($(this).index()).show();
			
	//加载two——box
	  	var yarn = new MilkT(yarn_listA ,3)
          yarn.send({categoryId:bx_index,type:'1'})
              .done(function(data){
              	// console.log(data);
                var name=data.productCategoryEntityList;
                var compiled = _.template('<% _.forEach(name, function(data){ \
                  %><a data-id="<%= data.categoryId %>"><%= data.categoryName %></a><%\
                });%>');
                $('.two_box ').empty();
                var templateTest=compiled({'name':name});
                $('.two_box').append(templateTest);

		                // 点击下拉菜单
					  $('.two_box').children('a').click(function() {
					  		$(this).addClass('orange');
							  $(this).css('color:#fff');
				            $(this).siblings().removeClass('orange');
				            var box_id=$(this).data('id');
				            console.log(box_id);

								            	//单击加载筛选数据
				  			var page= new MilkT(pro_page ,3)
				          page.send({categoryId:box_id,currentPage:'1'})
				              .done(function(data){
				                console.log(data);
				                // alert("1111111");
				                var pro_list=data.productCategoryEntityList;
				        

				                var li = _.template('<% _.forEach(pro_list, function(data){ \
				                  %><li>\
										<a href="#"><%= data.productName %></a>\
										<a href="#"><%= data.material %></a>\
										<a href="#"><%= data.yarns %></a>\
										<a href="#"><%= data.technology %></a>\
										<a href="#" class="dun"><%= data.productPrice %></a>\
										<a href="#" style="width:170px"><%= data.companyName %></a>\
										<a href="#"><%= data.batchCreateTime %></a>\
										<a href="#"><%= data.productNo %></a>\
									<a href="grey_detail.html?id=<%=data.productId%>&BatchId=<%=data.productBatchId%>" class="buy">查看详情</a>\
									</li><%\
				                });%>');
				                $('.pro_list li:not(:first-of-type)').remove();
				                var templateTest=li({'pro_list': pro_list});
				                $('.pro_list').append(templateTest);
				              }).fail(function(){
				              	// alert("数据加载失败");
				              })
				           
									  });
				              });

		    
	})

		
					// $('#one a:not(:first-of-type)').mouseleave(function(){
					// 			$('.two_box').css('display','none');
					// 	});


	$('.cf_active:first ').children('a').click(function() {
			 $(this).addClass('orange');
			 $(this).css('color:#fff');
            $(this).siblings().removeClass('orange');
  			
  			// $(this).index().eq(0).$(".two_box").css("display","none");
  			// console.log(b);
  			// var pro_id=$(this).data('id');
  			// console.log(pro_id);
  			//单击加载筛选数据
  			var page= new MilkT(pro_page ,3)
          page.send({categoryId:pro_id,currentPage:'1'})
              .done(function(data){
                console.log(data);
                var pro_list=data.productCategoryEntityList;
        

                var li = _.template('<% _.forEach(pro_list, function(data){ \
                  %><li>\
						<a href="#"><%= data.tradeName %></a>\
						<a href="#"><%= data.material %></a>\
						<a href="#"><%= data.jingyarns%>*<%=data.weiyarns%></a>\
						<a href="#"><%= data.jingdensity %>*<%= data.weidensity%></a>\
						<a href="#" class="dun"><%= data.breadth%></a>\
						<a href="#"><%= data.tissue%></a>\
						<a href="#"><%= data.purpose%></a>\
						<a href="#" class="dun"><%= data.productPrice %></a>\
						<a href="#" style="width:170px"><%= data.companyName %></a>\
						<a href="#" style="width:95px"><%= data.batchCreateTime%></a>\
						<a href="#"><%= data.productNo%></a>\
						<a href="grey_detail.html?id=<%=data.productId%>&BatchId=<%=data.productBatchId%>" class="buy">查看详情</a>\
						<a href="grey_detail.html?id=<%=data.productId%>"> 无</a>\
					</li><%\
                });%>');
                $('.pro_list li:not(:first-of-type)').remove();
                var templateTest=li({'pro_list': pro_list});
                $('.pro_list').append(templateTest);
              }).fail(function(){
              	// alert("数据加载失败");
              })
           
});


				$('.nav_bt ').children('a').click(function() {
						$(this).addClass('mr');
						$(this).siblings().removeClass('mr');
				});
					


              });

//单击 触发搜索 


					var lb_vlues=[]; //筛选  属性值
	  				var lb_ids=[];//筛选  属性ID
	  				// var lb_atrvlue='';
	  				// var lb_atrid='';
var fscgor= new MilkT(findsubclasscategory ,3)
         fscgor.send({categoryId:pro_id})
              .done(function(data){
                // console.log(data);
                var flei_dt=data.productCategoryEntityList;
                console.log(flei_dt);
                var  dom='';
                  $(flei_dt).each(function(i,m) {
                  		var a='';
                  		var arr=m.attributeValue.split(',');
                  			$(arr).each(function(j,n) { 
                  				a+='<a href=\'#\'>'+n+'</a>';
                  			});
                  		var e='<dl class=\'m-dl clearfix\'>'+
                  				'<dt class=\'m-dt\'><a href=\'#\' data-id='+m.attributeId+'>'+m.attributeName+':</a></dt>'+
                  				  '<dd class=\'m-dd cf_active\'>'+
                  				  '<a href=\'#\'id=cf_bx class=orange >不限</a> '+
                  				  		a+
                  				  '</dd>'+
                  				  '</dt>'+
                  				'</dl>'
                  		 dom+=e;
					  });
						
				 $('.sx_menu').append(dom);
				  lb_vlues=[];
					  lb_ids=[];
 				$('.m-dl').each(function(){
					 $(this).find('.m-dt').css('height',$(this).find('.m-dd').css('height'));
					  console.log($(this).index());
					 if($(this).index()>0){
						lb_vlues.push($(this).find('.m-dd a.orange').text());
					 	lb_ids.push($(this).find('.m-dt a').data('id'));
					 } 
					
						  
				 })
					 console.log( lb_vlues);
					console.log( lb_ids);
					 
 				// $(".m-dt").css("height",$(".m-dd").css("height"));
      			  // console.log($(".m-dd").css("height"));

	  				// 单击品名一下接口
	  				// var lb_vlues=[];
	  				// var lb_ids=[];
	  				// var lb_atrvlue='';
					  // var lb_atrid='';
										
	$('.cf_active:gt(0) ').children('a').click(function() {

						//获取 id 和 值
			$(this).addClass('orange');
			  $(this).css('color:#fff');
            $(this).siblings().removeClass('orange');
                 lb_vlues=[];
                 lb_ids=[];

                 //单击 循环得到id 值
             	 for(var i =1; i<=7;i++){
             	 	// console.log($(".m-dl").eq(i).find(".orange").text())
             	 	lb_vlues.push($('.m-dl').eq(i).find('.orange').text());
             	 	lb_ids.push($('.m-dl').eq(i).find('.orange').parent('.cf_active').prev('.m-dt').children('a').data('id'));
             	 }
          
               lb_vlues =String(lb_vlues);
               lb_ids=String(lb_ids);
               console.log(lb_vlues);
               console.log(lb_ids);
 
				//商品分页接口
			var page= new MilkT(pro_page ,3)
          page.send({categoryId:pro_id,currentPage:'1',attributeValues:lb_vlues,attributeIds:lb_ids})
              .done(function(data){
                // console.log(data);

                var pro_list=data.productCategoryEntityList;
               
                var li = _.template('<% _.forEach(pro_list, function(data){ \
                  %><li>\
						<a href="#"><%= data.tradeName %></a>\
						<a href="#"><%= data.material %></a>\
						<a href="#"><%= data.jingyarns%>*<%=data.weiyarns%></a>\
						<a href="#"><%= data.jingdensity %>*<%= data.weidensity%></a>\
						<a href="#" class="dun"><%= data.breadth%></a>\
						<a href="#"><%= data.tissue%></a>\
						<a href="#"><%= data.purpose%></a>\
						<a href="#" class="dun"><%= data.productPrice %></a>\
						<a href="#" style="width:170px"><%= data.companyName %></a>\
						<a href="#" style="width:95px"><%= data.batchCreateTime%></a>\
						<a href="#"><%= data.productNo%></a>\
						<a href="grey_detail.html?id=<%=data.productId%>&BatchId=<%=data.productBatchId%>" class="buy">查看详情</a>\
						<a href="grey_detail.html?id=<%=data.productId%>"> 无</a>\
					</li><%\
                });%>');
                 $('.pro_list li:not(:first-of-type)').remove();
                var templateTest=li({'pro_list': pro_list});
                $('.pro_list').append(templateTest);
              });


					});
                
              });
            
 		
                      

		/************** 默认加载 ***********/
		var pageNum = '1' //当前页
		var pages='';     //总页数
		var first_page=''; //第一页
		var page= new MilkT(pro_page ,3)
          page.send({categoryId:pro_id,currentPage:pageNum})
              .done(function(data){
              	console.log('__________________________'
              		);
               console.log(data);
               pageNum = data.pageNum;
               pages = data.pages;
               first_page = 1;
               console.log(pages);
               $('#pages').text(pages);
                var yarn_list=data.productCategoryEntityList;
                var li = _.template('<% _.forEach( yarn_list, function(data){ \
                  %><li>\
						<a href="#"><%= data.tradeName %></a>\
						<a href="#"><%= data.material %></a>\
						<a href="#"><%= data.jingyarns%>*<%=data.weiyarns%></a>\
						<a href="#"><%= data.jingdensity %>*<%= data.weidensity%></a>\
						<a href="#" class="dun"><%= data.breadth%></a>\
						<a href="#"><%= data.tissue%></a>\
						<a href="#"><%= data.purpose%></a>\
						<a href="#" class="dun"><%= data.productPrice %></a>\
						<a href="#" style="width:170px"><%= data.companyName %></a>\
						<a href="#" style="width:95px"><%= data.batchCreateTime%></a>\
						<a href="#"><%= data.productNo%></a>\
						<a href="grey_detail.html?id=<%=data.productId%>&BatchId=<%=data.productBatchId%>" class="buy">查看详情</a>\
						<a href="grey_detail.html?id=<%=data.productId%>"> 无</a>\
					</li><%\
                });%>');

                var templateTest=li({'yarn_list': yarn_list});
                $('.pro_list').append(templateTest);

                		               //得到总页数 且循环页数;
                   pages=data.pages;
                  var curr_pag=data.pageNum
                  //输出页码
                  var dom='';
                    for(i=1;i<=pages;i++){
                  	// console.log(i);
                  	if(i<=5){
                  		var e='<a href=\'javascript:;\'>'+i+'</a>';
                  	 	dom+=e;

                  	}
                  	
                  }
                  $('.pag_num').html(dom);

                  $('.pag_num a').click(function() {
                  		$(this).addClass('mr').siblings().removeClass('mr');
						var page=($(this).index())+1;
						console.log(page);
						goto_page(pro_id,page);

                  });


			   
			});
		$('.sum_pages').text(pages);
			// 下一页
				$('.next-pag').click(function() {
						//当前页面|+1
						// alert((++pageNum));
					if(pageNum<pages){
						pageNum=Number(pageNum)+1;
						console.log(pageNum);
							goto_page(pro_id,pageNum);
						
					}else{
						pageNum==pageNum;
						console.log(pageNum);
						
					}

			});
				//上一页
				$('.previous-pag').click(function() {
						//当前页面|-1
						// alert((++pageNum));
						if(pageNum<=pages&&pageNum>0){
							pageNum=Number(pageNum)-1;;
							console.log(pageNum);
							goto_page(pro_id,pageNum);
						}else{
							pageNum==pageNum;
							console.log(pageNum);
							
						}

			});
				//key search
				//键盘事件
				var sear_val='';
				$('.fab_inp').blur(function(){
							sear_val=$('.fab_inp').val();
						});
				// 上一页
				
				$('.fab_qd').click(function(){
					sear_val=$('.fab_inp').val();
					console.log(sear_val);
					// var sear_val=$('.fab_inp').val();
					// if(sear_val==""){
					// 	sear_val==239
					// }
					// attributeValues:String(lb_vlues),
					// 		attributeIds:String(lb_ids),

						var page= new MilkT(pro_page ,3)
						// page.send({categoryId:pro_id,attributeValues:String(lb_vlues),attributeIds:String(lb_ids),productSearch:sear_val,currentPage:'1'})
						page.send({
							categoryId:pro_id,
							currentPage:'1',
							attributeValues:String(lb_vlues),
							attributeIds:String(lb_ids),
							productSearch:sear_val,
							sortType:data_type
						})
							.done(function(data){
							console.log(data);
								var yarn_list=data.productCategoryEntityList;
								var li = _.template('<% _.forEach( yarn_list, function(data){ \
								%><li>\
										<a href="#"><%= data.tradeName %></a>\
										<a href="#"><%= data.material %></a>\
										<a href="#"><%= data.jingyarns%>*<%=data.weiyarns%></a>\
										<a href="#"><%= data.jingdensity %>*<%= data.weidensity%></a>\
										<a href="#" class="dun"><%= data.breadth%></a>\
										<a href="#"><%= data.tissue%></a>\
										<a href="#"><%= data.purpose%></a>\
										<a href="#" class="dun"><%= data.productPrice %></a>\
										<a href="#" style="width:170px"><%= data.companyName %></a>\
										<a href="#" style="width:95px"><%= data.batchCreateTime%></a>\
										<a href="#"><%= data.productNo%></a>\
										<a href="grey_detail.html?id=<%=data.productId%>&BatchId=<%=data.productBatchId%>" class="buy">查看详情</a>\
										<a href="grey_detail.html?id=<%=data.productId%>"> 无</a>\
									</li><%\
								});%>');
								$('.pro_list li:not(:first-of-type)').remove();
								var templateTest=li({'yarn_list': yarn_list});
								$('.pro_list').append(templateTest);


										
						}); 

						// key_order(pro_id,pages,lb_ids,lb_vlues,sear_val,data_type);


				});

				//第一页
				$('.first-pag').click(function() {
						//当前页面|-1
						// alert((++pageNum));
					$(this).addClass('mr').siblings().removeClass('mr');
							goto_page(pro_id,first_page);
					
					
			});
					function goto_page(pro_id,pages){
							var data={
								categoryId:pro_id,
								currentPage:pages
							}
								var netxt_pag= new MilkT(pro_page ,3)
							netxt_pag.send(data)
								.done(function(data){
								console.log(data);
									var yarn_list=data.productCategoryEntityList;
									var li = _.template('<% _.forEach( yarn_list, function(data){ \
									%><li>\
											<a href="#"><%= data.tradeName %></a>\
											<a href="#"><%= data.material %></a>\
											<a href="#"><%= data.jingyarns%>*<%=data.weiyarns%></a>\
											<a href="#"><%= data.jingdensity %>*<%= data.weidensity%></a>\
											<a href="#" class="dun"><%= data.breadth%></a>\
											<a href="#"><%= data.tissue%></a>\
											<a href="#"><%= data.purpose%></a>\
											<a href="#" class="dun"><%= data.productPrice %></a>\
											<a href="#" style="width:170px"><%= data.companyName %></a>\
											<a href="#" style="width:95px"><%= data.batchCreateTime%></a>\
											<a href="#"><%= data.productNo%></a>\
											<a href="grey_detail.html?id=<%=data.productId%>&BatchId=<%=data.productBatchId%>" class="buy">查看详情</a>\
											<a href="grey_detail.html?id=<%=data.productId%>"> 无</a>\
											</li><%\
									});%>');
									$('.pro_list li:not(:first-of-type)').remove();
									var templateTest=li({'yarn_list': yarn_list});
									$('.pro_list').append(templateTest);

							});

						}
					//最后一页
				$('.last-pag').click(function() {
						//当前页面|-1
						// alert((++pageNum));
						goto_page(pro_id,pages);

			

			});

			//确定跳转页面
     	$('.go_pag').click(function() {
     		var to_pag=$('#page_to').val();
     		console.log(to_pag);
     		// if(to_pag<=pages){
 			     	var netxt_pag= new MilkT(pro_page,to_pag)
			        netxt_pag.send({categoryId:pro_id,currentPage:to_pag})
			              .done(function(data){
			               console.log(data);
			                var yarn_list=data.productCategoryEntityList;
			                var li = _.template('<% _.forEach( yarn_list, function(data){ \
			                  %><li>\
									<a href="#"><%= data.tradeName %></a>\
									<a href="#"><%= data.material %></a>\
									<a href="#"><%= data.jingyarns%>*<%=data.weiyarns%></a>\
									<a href="#"><%= data.jingdensity %>*<%= data.weidensity%></a>\
									<a href="#" class="dun"><%= data.breadth%></a>\
									<a href="#"><%= data.tissue%></a>\
									<a href="#"><%= data.purpose%></a>\
									<a href="#" class="dun"><%= data.productPrice %></a>\
									<a href="#" style="width:170px"><%= data.companyName %></a>\
									<a href="#" style="width:95px"><%= data.batchCreateTime%></a>\
									<a href="#"><%= data.productNo%></a>\
									<a href="grey_detail.html?id=<%=data.productId%>&BatchId=<%=data.productBatchId%>" class="buy">查看详情</a>\
									<a href="grey_detail.html?id=<%=data.productId%>"> 无</a>\
									</li><%\
			                });%>');
			                $('.pro_list li:not(:first-of-type)').remove();
			                var templateTest=li({'yarn_list': yarn_list});
			                $('.pro_list').append(templateTest);

					});

	          			
	       
     	});
			
		 	
		$('.nav_bt a').click(function() {
			var data_type=$(this).data('type');
			console.log(data_type);// type 排序 值
			console.log(sear_val);// key sear val
            console.log(String(lb_vlues));//  筛选值
			console.log(String(lb_ids));// 筛选ID
			//   String(lb_vlues);//  筛选值
			console.log(lb_ids);// 筛选ID
			if(data_type==0){
				data_type=1;
			}
 
				 var page= new MilkT(pro_page ,3)
						page.send({
							categoryId:pro_id,
							currentPage:'1',
							attributeValues:String(lb_vlues),
							attributeIds:String(lb_ids),
							productSearch:sear_val,
							sortType:data_type
						})
			            .done(function(data){
			               	console.log(data);
			                var yarn_list=data.productCategoryEntityList;
			                var li = _.template('<% _.forEach( yarn_list, function(data){ \
			                  %><li>\
									<a href="#"><%= data.tradeName %></a>\
									<a href="#"><%= data.material %></a>\
									<a href="#"><%= data.jingyarns%>*<%=data.weiyarns%></a>\
									<a href="#"><%= data.jingdensity %>*<%= data.weidensity%></a>\
									<a href="#" class="dun"><%= data.breadth%></a>\
									<a href="#"><%= data.tissue%></a>\
									<a href="#"><%= data.purpose%></a>\
									<a href="#" class="dun"><%= data.productPrice %></a>\
									<a href="#" style="width:170px"><%= data.companyName %></a>\
									<a href="#" style="width:95px"><%= data.batchCreateTime%></a>\
									<a href="#"><%= data.productNo%></a>\
									<a href="grey_detail.html?id=<%=data.productId%>&BatchId=<%=data.productBatchId%>" class="buy">查看详情</a>\
									<a href="grey_detail.html?id=<%=data.productId%>"> 无</a>\
								</li><%\
			                });%>');
			                $('.pro_list li:not(:first-of-type)').remove();
			                var templateTest=li({'yarn_list': yarn_list});
			                $('.pro_list').append(templateTest);

						});
			//1.获取 type 值
			//2.取关键字搜索值
		});
     
		/************* 分页**************/

$('.first-pag').hover(
		  function () {
		    $(this).children('img').attr('src', './images/icon/page_first_press.png');
		  },
		  function () {
		  $(this).children('img').attr('src', './images/icon/page_first.png');
		  }
		  );
			//?ҳ
		$('.previous-pag').hover(
		  function () {
		    $(this).children('img').attr('src', '/images/icon/page_previous_press.png ');
		  },
		  function () {
		  $(this).children('img').attr('src', './images/icon/page_previous.png');
		  }
		  );
			//?һҳ
		$('.next-pag').hover(
		  function () {
		    $(this).children('img').attr('src', './images/icon/page_next_press.png');
		  },
		  function () {
		  $(this).children('img').attr('src', './images/icon/page_next.png');
		  }
		  );
			//????ҳ
		$('.last-pag').hover(
		  function () {
		    $(this).children('img').attr('src', './images/icon/page_last_press.png');
		  },
		  function () {
		  $(this).children('img').attr('src', './images/icon/page_last.png');
		  }
		  );

		/********************** hover ?ɷֲ˵?????? *******************************************/
		




















})