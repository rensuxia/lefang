 $(function(){
    

    

     //选项卡
	$('.cp_nav a').mouseover(function(){
		$('.cp_nav a').eq($(this).index()).addClass('active').siblings().removeClass('active');
	$(' .cp_nr .cp_txt').hide();
	$(' .cp_nr .cp_txt').eq($(this).index()).show();
})



















})