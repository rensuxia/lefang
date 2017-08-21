$(function(){

	// var template_qygl = $('#lefang_qygl').text();
    // var templateFn_qygl = _.template(template_qygl);
    // $('#lefangtex_qygl').append(templateFn_qygl);


   


	$('.qygl-left-con ul li').click(function(){
		$('.qygl-left-con ul li').eq($(this).index()).addClass('active').siblings().removeClass('active');
	})
	$('.qygl-right-top ul li').click(function(){
		$('.qygl-right-top ul li a').removeClass('active');
		$('.qygl-right-top ul li').eq($(this).index()).find('a').addClass('active');
	})

	$('.qyrz-zch').hide();
	$('.qyrz-dzhy').click(function(){
		$('.qyrz-xydm').show();
		$('.qyrz-zch').hide();
	})
	$('.qyrz-yzcm').click(function(){
		$('.qyrz-xydm').hide();
		$('.qyrz-zch').show();
	})
	
})