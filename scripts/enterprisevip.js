$(function(){
    var pCity='';   //获取省名称
    var cCity='';  //获取市名称

        var template_qygl = $('#lefang_qygl').text();
        var templateFn_qygl = _.template(template_qygl);
        $('#lefangtex_qygl').append(templateFn_qygl);

        var uCode=store.get('usercode');

        var enterQS = new MilkT(enterpriseQS,3);
            enterQS.send({usercode:uCode})
                    .done(function(data){
                        // console.log(data);
         /*-------------会员中心-----------------*/
                        //会员账号
                        if(data.userid=='null'){
                            data.userid='';
                        }
                        //会员编号
                        if(data.lfcode=='null'){
                            data.lfcode='';
                        }
                        //注册名称
                        if(data.company_name=='null'){
                            data.company_name='';
                        }
                        //注册时间
                        if(data.create_time=='null'){
                            data.create_time=' ';
                        }
                        //注册时间
                        if(data.founding_time=='null'){
                            data.founding_time=' ';
                        }
                        var template_qygl_right = $('#lefang_qygl_right').text();
                        var templateFn_qygl_right = _.template(template_qygl_right);
                        var dom = templateFn_qygl_right(data);
                        $('#lefangtex_right').append(dom);



                        if(data.apply_status==1){
                            $('.envip_status').text('审核中');
                            $('.envip_identifi').css('display','block');
                            $('.vip_number').text('(认证成功后将会显示)');
                            $('.vip_number').css('color','red');
                        }else if(data.apply_status==2){
                            $('.envip_status').text('已认证');
                            $('.envip_identifi').css('display','none');
                            $('.envip_reg').css('display','none');
                        }else if(data.apply_status==3){
                            $('.envip_status').text('认证不成功');
                            $('.envip_identifi').css('display','block');
                            $('.vip_number').text('(认证成功后将会显示)');
                            $('.vip_number').css('color','red');
                        }else if(data.apply_status==4){
                            $('.envip_status').text('未认证');
                            $('.envip_identifi').css('display','block');
                            $('.vip_number').text('(认证成功后将会显示)');
                            $('.vip_number').css('color','red');
                        }
    })

  /*用户权限子菜单设置*/
  var uCode=store.get('usercode');
  var roleid=store.get('roleid');
  var stance=new MilkT(user,3)
  stance.send({usercode:uCode,roleid:roleid})
    .done(function (data) {
      // console.log(data);
      var resultData = data.list;
      var dom='';
      $(resultData).each(function (i, m) {
        if(m.menuurl=='暂无'){
            m.menuurl='';
        }
        var e='';
        var mList=m.list;
          $(mList).each(function (j,n) {
            e+='<li onclick="showFather(this)">'+
              '<a href='+n.menuurl+'>'+
              n.menname+
              '</a>'+
              '</li>';
            // console.log(e);
          });
        var a='<li >'+
          '<a href='+m.menuurl+'>'+
          '<i>'+
          '<img src="images/icon/+'+m.menname+'+.png">'+
          '</i>'+
          m.menname+
          '</a>'+
          '<div class="light">'+
          '<ul>'+
          e+
          '</ul>'+
          '</div>'+
          '</li>';
        // console.log(a);
        dom+=a;
      });
      $('#qygl').append(dom);

      //菜单隐藏
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

       // $('.light ul li').on('click',function () {
       //  $(this).parent().parent().prev().addClass('active');
       //  // alert('111');
       //     console.log($(this));
       // })



      $('.qygl-left ul li:eq(1)').addClass('active');
      $('.qygl-left-con ul li:nth-of-type(2) img').attr('src','images/icon/会员中心.png');
      $('.qygl-left-con ul li:nth-of-type(3) img').attr('src','images/icon/企业信息管理.png');
      $('.qygl-left-con ul li:nth-of-type(4) img').attr('src','images/icon/商品管理.png');
      $('.qygl-left-con ul li:nth-of-type(5) img').attr('src','images/icon/订单管理.png');
      $('.qygl-left-con ul li:nth-of-type(6) img').attr('src','images/icon/合同管理.png');
      $('.qygl-left-con ul li:nth-of-type(7) img').attr('src','images/icon/发票管理.png');
      $('.qygl-left-con ul li:nth-of-type(8) img').attr('src','images/icon/支付管理.png');
      $('.qygl-left-con>ul>li').eq(1).mouseenter(function(){
        $(this).find('img').attr('src','images/icon/会员中心_press.png');
      }).mouseleave(function(){
        $(this).find('img').attr('src','images/icon/会员中心.png');
      })
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
      $('.qygl-left-con>ul>li').eq(4).mouseenter(function(){
        $(this).find('img').attr('src','images/icon/订单管理_press.png');
      }).mouseleave(function(){
        $(this).find('img').attr('src','images/icon/订单管理.png');
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
    })

});
//点击li切换父元素的激活状态
function showFather(obj) {
    // $(obj).parents('#qygl>li').removeClass('active');
    // $(obj).parents().find('#qygl>li').addClass('active');
}

