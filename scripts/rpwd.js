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


    /***获得用户原密码**/
     var opwd=store.get('userPWD');
   //当前原密码不能为空提示并且输入的密码与原密码相等
  function isNull() {
    var upwd=$('#current').val();  //用户输入的原密码
    if(upwd==''){
      $('#current').css('border','1px solid #e4393c');
      $('#current').next('span').html('请填写当前密码！');
    }else if(upwd!=opwd){
      $('#current').css('border','1px solid #e4393c');
      $('#current').next('span').html('请正确输入原密码！');
    }else {
      $('#current').css('border','');
      $('#current').next('span').html('');
      return true;
    }
  }
  /**----新密码不能为空新密码不能与原密码相同的设置---****/
  function isOk() {
    var password=$('#newpassword').val();
    if(password==''){
      $('#newpassword').css('border','1px solid #e4393c');
      $('#newpassword').next('span').html('请填写新密码！');
      return false;
    }else if(password==opwd){
      $('#newpassword').css('border','1px solid #e4393c');
      $('#newpassword').next('span').html('新密码与原密码不能相同！');
      return false;
    }
    else {
      $('#newpassword').css('border','');
      $('#newpassword').next('span').html('');
      return true;
    }
  }
  /**----重复新密码不能为空的设置---****/
  function isNo() {
    var repeat=$('#aginpassword').val();
    var password=$('#newpassword').val();
    if(repeat==''){
      $('#aginpassword').css('border','1px solid red');
      $('#aginpassword').next('span').html('请再次填写新密码！');
      return false;
    }else if (repeat!==password){
      $('#aginpassword').css('border','1px solid red');
      $('#aginpassword').next('span').html('两次填写密码不一样!');
      return false;
    } else {
      $('#aginpassword').css('border','');
      $('#aginpassword').next('span').html('');
      return true;
    }
  }
  //验证当前密码
  $('#current').blur(function () {
    isNull();
  })
  $('#newpassword').blur(function () {
    isOk();
  })
  var repeat='';
  $('#aginpassword').blur(function () {
    repeat=$(this).val();
    isNo();
  });

  /*****---修改密码接口对接--****/
  var ucode=store.get('usercode');
  $('#rcommit').on('click',function () {
    console.log(ucode);
    console.log(opwd);
    console.log(repeat);
    if(isNull()&&isOk()&&isNo()){
      /*如若以上判断符合发送接口请求***/
      var stance = new MilkT(rpwd,3);
      stance.send({
        usercode:ucode ,
        password:md5(opwd),
        freshpassword:md5(repeat)
      }).done(function(data) {
        console.log(data);
        alert('密码修改成功');
        window.location.href='login.html';
        localStorage.clear();
      })
    }else {
      console.log('修改失败');
    }
  })


})
