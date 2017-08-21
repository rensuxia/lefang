$(function(){
	     window['open'] = {};    
    open.GetQueryString=function(name){
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)','i'); 
        var r = window.location.search.substr(1).match(reg); 
        if (r!=null) return (r[10]); return ''; 
    };
    var pro_id=open.GetQueryString('categoryid');//获取URL 参数id值
         // 
         console.log( pro_id);
	
	var template = $('#sxlb_nr').text();
    // var templateFn = _.template(template);
    // $('#sxlb_conent').append(templateFn);
		
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
		
//筛选子页API
var cf= new MilkT(prod_Category ,3)
         cf.send({categoryId:pro_id})
              .done(function(data){
                console.log(data);
                var one_list=data.productCategoryEntityList;
                // console.log(one_list);
              
	  			   var sx_nav = _.template('<% _.forEach(one_list, function(data){ \
                  %>\
								<a href="#" data-id="<%= data.categoryId %>"><%= data.categoryName %> \
									<img src="./images/icon/arrow_zk.png " style="width: 10px;" alt="">\
								</a>\
					<%\
                });%>');
	  			    var templateTest=sx_nav({'one_list':one_list});
               		 $('#one').append(templateTest);

            //第一个 成分 hover 的样式
    //        $(".cf_icon").nextAll().hover(
		  // function () {
		  // 	alert("wo shi icon");
		  //   $(this).children('img').attr('src', './images/icon/arrow_sq.png');
		  //   	// $(".two_box").css("display","block");
		  //   	// console.log($(this).parent().parent());
		  // },
		  // function () {
		  // $(this).children('img').attr('src', './images/icon/arrow_zk.png');
		 	//  // $(".two_box").css("display","none");
		  // });


    //成分  选项卡
	// $(".lefang_news_zhishi").hide();
	$('#one a:not(:first-of-type)').mouseover(function(){
		var bx_index=$(this).data('id');
		// console.log(bx_index);
	$('#one a ').eq($(this).index()).addClass('.orange').siblings().removeClass('.orange');
	$('.two_box').hide();
	$('.two_box').eq($(this).index()).show();
	    
	//加载two——box
	  var yarn = new MilkT(yarn_listA ,3)
          yarn.send({categoryId:bx_index,type:'1'})
              .done(function(data){
              	console.log(data);
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
										<a href="fabric_detail.html?id=<%=data.productId%>" class="buy">立即购买</a>\
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


		


	$('.cf_active:first ').children('a').click(function() {
			 $(this).addClass('orange');
			 $(this).css('color:#fff');
            $(this).siblings().removeClass('orange');
  			
  			// $(this).index().eq(0).$(".two_box").css("display","none");
  			// console.log(b);
  			var pro_id=$(this).data('id');
  			// console.log(pro_id);
  			//单击加载筛选数据
  			var page= new MilkT(pro_page ,3)
          page.send({categoryId:pro_id,currentPage:'1'})
              .done(function(data){
                // console.log(data);
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
						<a href="fabric_detail.html?id=<%=data.productId%>" class="buy">立即购买</a>\
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


// 
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
                  		var e='<dl class=\'m-dl\'>'+
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
	  				// 单击品名一下接口
	  				var lb_vlues=[];
	  				var lb_ids=[];
	  				var lb_atrvlue='';
	  				var lb_atrid='';
	$('.cf_active:gt(0) ').children('a').click(function() {
						//获取 id 和 值
			$(this).addClass('orange');
			  $(this).css('color:#fff');
            $(this).siblings().removeClass('orange');
                 lb_vlues=[];
                 lb_ids=[];

                 //单击 循环得到id 值
             	 for(var i =1; i<=4;i++){
             	 	// console.log($(".m-dl").eq(i).find(".orange").text())
             	 	lb_vlues.push($('.m-dl').eq(i).find('.orange').text());
             	 	lb_ids.push($('.m-dl').eq(i).find('.orange').parent('.cf_active').prev('.m-dt').children('a').data('id'));
             	 }
          
               lb_vlues =String(lb_vlues);
               lb_ids=String(lb_ids);
 
				//商品分页接口
			var page= new MilkT(pro_page ,3)
          page.send({categoryId:pro_id,currentPage:'1',attributeValues:lb_vlues,attributeIds:lb_ids})
              .done(function(data){
                // console.log(data);

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
						<a href="fabric_detail.html?id=<%=data.productId%>" class="buy">立即购买</a>\
					</li><%\
                });%>');
                 $('.pro_list li:not(:first-of-type)').remove();
                var templateTest=li({'pro_list': pro_list});
                $('.pro_list').append(templateTest);
              });


					});
                
              });
            
 		
                      

		/**************默认加载 ***********/
		var page= new MilkT(pro_page ,3)
          page.send({categoryId:pro_id,currentPage:'1'})
              .done(function(data){
               console.log(data);
                var yarn_list=data.productCategoryEntityList;
                var li = _.template('<% _.forEach( yarn_list, function(data){ \
                  %><li>\
						<a href="#">\
					<img src="<%=data.imgurl%>" alt="" class="fab_imgs">\
					<h3><%= data.productName %></h3>\
					<span class="fab_price"><%= data.productPrice %></span>\
					<a class="fab_btn" href="fabric_detail.html?id=<%=data.productId%>">立即购买</a>\
				</a>\
				<img src="./images/icon/hz.png" alt="" class="hz">\
					</li><%\
                });%>');

                var templateTest=li({'yarn_list': yarn_list});
                $('.fab_list').append(templateTest);


                               var sx_pags=data;
                  var sx_pag = _.template('\
						<a href="#"><%= sx_pags.pageNum%></a>\
                ');

                var templateTest=sx_pag({'sx_pags':sx_pags});
                $('.pag_num').append(templateTest);

                //
                $('.fab_list').children('li').eq(4).css('margin-right','0');
                $('.fab_list').children('li').eq(9).css('margin-right','0');
                $('.fab_list').children('li').eq(14).css('margin-right','0');
   
			});
     

/*var page= new MilkT(pro_page ,3)
          page.send({categoryId:pro_id,currentPage:'1'})
              .done(function(data){
               console.log(data);
               var sx_pags=data;
                  var sx_pag = _.template('<% _.forEach( sx_pags, function(data){ \
                  %>\
						<a href="#" class="first-pag">\
						<img src="./images/icon/page_first.png" alt="">\
					</a>\
					<a href="#" class="previous-pag">\
							<img src="./images/icon/page_previous.png" alt="">\
					</a>\
						<a href="#"><%= sx_pags.pageNum%></a>\
						<a href="#" class="next-pag">\
							<img src="./images/icon/page_next.png" alt="">\
						</a>\
						<a href="#" class="last-pag">\
							<img src="./images/icon/page_last.png" alt="">\
						</a>\
					<%\
                });%>');

                var templateTest=sx_pag({'sx_pags':sx_pags});
                $(".pag").append(templateTest);
			});*/
     
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
		













 $('.buxian').mouseenter(function() {
             			$('.two_box').css('display','none');
           
             });






})