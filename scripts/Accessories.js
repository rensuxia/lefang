$(function(){
		var template = $('#sxlb_nr').text();
    // var templateFn = _.template(template);
    // $('#sxlb_conent').append(templateFn);
		//1.筛选条件开关	
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
		

		$('#one a:not(:first-of-type)').mouseover(function(){
			var bx_index=$(this).data('id');
			console.log(bx_index);
		$('#one a ').eq($(this).index()).addClass('.orange').siblings().removeClass('.orange');
		$('.two_box').hide();
		$('.two_box').eq($(this).index()).show();
	    
	

		

	
		$('.cf_active:first ').children('a').click(function() {
				$(this).addClass('orange');
				$(this).css('color:#fff');
							$(this).siblings().removeClass('orange');
					
					// $(this).index().eq(0).$(".two_box").css("display","none");
					// console.log(b);
					var pro_id=$(this).data('id');
					// console.log(pro_id);
					//单击加载筛选数据
		
						
		});


		$('.nav_bt ').children('a').click(function() {
				$(this).addClass('mr');
				$(this).siblings().removeClass('mr');
		});
		


              });

//单击 触发搜索 


// 

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
		










  				$('.fab_list').children('li').eq(4).css('margin-right','0');
                $('.fab_list').children('li').eq(9).css('margin-right','0');
                $('.fab_list').children('li').eq(14).css('margin-right','0');
   


 $('.buxian').mouseenter(function() {
             			$('.two_box').css('display','none');
           
             });






})