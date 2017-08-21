$(function () {
  var template_qygl = $('#lefang_qygl').text();
  var templateFn_qygl = _.template(template_qygl);
  $('#lefangtex_qygl').append(templateFn_qygl);
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


  var template_check = $('#lefang_qygl_right').text();
  var templateFn_check = _.template(template_check);
  $('.qygl-right').append(templateFn_check);
})
