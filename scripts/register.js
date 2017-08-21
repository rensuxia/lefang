$(function(){
	  var template_zhuc = $('#lefang-zhuc').text();
    var templateFn_zhuc = _.template(template_zhuc);
    $('#lefangtex-zhuc').append(templateFn_zhuc);

    var template_zhuct = $('#lefang-zhuct').text();
    var templateFn_zhuct = _.template(template_zhuct);
    $('#lefangtex-zhuct').append(templateFn_zhuct);

    var template_zhucth = $('#lefang-zhucth').text();
    var templateFn_zhucth = _.template(template_zhucth);
    $('#lefangtex-zhucth').append(templateFn_zhucth);

    var template_nav_main_foot = $('#lefang-nav-main-foot').text();
    var templateFn_nav_main_foot = _.template(template_nav_main_foot);
    $('#lefangtex-nav-main-foot').append(templateFn_nav_main_foot);

      $('.two-type').hide();
      $('.three-type').hide();
      var linkTel=document.getElementById('linkTel');
      var msgyzm=document.getElementById('msgyzm');

      //验证手机号
      function checkregist(){
        var testLinkTel =$('#linkTel').val();
        var regLinkTel = /^(0|86|17951)?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;
        var resultLinkTel = regLinkTel.test(testLinkTel);
        if (!resultLinkTel || resultLinkTel == '') {
          $('#linkTel').css('border','1px solid red');
          $('#linkTel').next('span').html('请输入正确的手机号');
          return false;
        } else {
          $('#linkTel').css('border','');
          $('#linkTel').next('span').html('');
          return true;
        }
      }
      //调接口用来验证手机号
      var bol=false;
       function checkNumber(){
          if(checkregist()){
            var userPhoneNum = new MilkT(userPhoneN,3)
            userPhoneNum.send({phone_number:$('#linkTel').val()})
                .done(function(data){
                  console.log(data);
                  $('#linkTel').css('border','');
                  $('#linkTel').next('span').html('');
                 bol=true;
                }).fail(function(){
                  $('#linkTel').css('border','1px solid red');
                  $('#linkTel').next('span').html('手机号已存在');
                  bol=false;
                });
            }
            return bol;
        }
      $('#linkTel').blur(function(){
        checkregist();
        checkNumber();

      })

        //产生验证码
          var codex='';
          function createCode(){
             codex = '';
             var codeLength = 4;//验证码的长度
             // var checkCode = document.getElementById('code');
             var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',
             'S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z');
             for(var i = 0; i < codeLength; i++) {
                var index = Math.floor(Math.random()*36);
                codex += random[index];
            }
            $('#code').html(codex);
          }
          createCode();

         $('#code').click(function(){
          createCode();
         })


        //校验验证码
         function validate(){
          var inputCode = document.getElementById('tpyzm').value.toUpperCase();
          if(inputCode.length <= 0) {
              $('#tpyzm').css('border','1px solid red');
               $('.reg-yzm').next('span').html('请输入正确的验证码');
               return false;
          }
          else if(inputCode != codex ) {
             $('#tpyzm').css('border','1px solid red');
              $('.reg-yzm').next('span').html('请输入正确的验证码');
              createCode();
              document.getElementById('tpyzm').value = '';
              return false;

          }else{
            $('#tpyzm').css('border','');
            $('.reg-yzm').next('span').html('');
            return true;
          }
        }

        $('#tpyzm').blur(function(){
          validate();
          console.log(checkregist());
        })


          var timer='';
          var mesgInfo='';
          //短息验证码接口
          $('#msgyzm').click(function(){
            if(checkregist()&& checkNumber() && validate() ){
              var dxyz=new MilkT(dxyzm,1);
                dxyz.send({telephone:$('#linkTel').val(),username:'用户',type:1})
                  .done(function(data){
                    console.log(data);
                    mesgInfo=data.smscode;
                    $('#msgyzm').css('background','grey');
                    $('#msgyzm').unbind('click');
                    timer=setInterval(distime,1000);
                })
                // console.log(mesgInfo);   //输出验证码
            }
          })

                //短信验证倒计时
                function distime(){
                  var xx=$('.seconds').text();
                  xx-=1;
                  $('.seconds').html(xx);
                  if(xx<=0){
                    $('#msgyzm').css('background','');
                    clearInterval(timer);
                    $('.seconds').html(60);
                    $('#msgyzm').click(function(){
                        if(checkregist()&&checkNumber()&&validate()){
                          var dxyz=new MilkT(dxyzm,1);
                          dxyz.send({telephone:$('#linkTel').val(),username:'用户',type:1})
                            .done(function(data){
                              console.log(data);
                              mesgInfo=data.smscode;
                            // $('.reg-yzm-sucess').show();
                            $('#msgyzm').css('background','grey');
                            $('#msgyzm').unbind('click');
                            timer=setInterval(distime,1000);
                          })
                        }
                    })
                  }else{
                    $('#msgyzm').css('background','grey');
                  }
                }
      function msgInfoCheck(){
        if($('#new_yzm').val()!=mesgInfo){
          $('#new_yzm').attr('placeholder','请输入正确的验证码');
          $('#new_yzm').css('border','1px solid red');
          return false;
        }else{
          $('#new_yzm').attr('placeholder','验证码');
          $('#new_yzm').css('border','');
          return true;
        }
      }
      $('#new_yzm').blur(function(){
        checkregist();
        validate();
        checkNumber();
        msgInfoCheck();
      })
      //省市
      var cPro='';
      var re_cCit='';
      var cCity='';
      var cProvince = new MilkT(city_province,1)
          cProvince.send({})
                    .done(function(data){
                            console.log(data);
                        var compiled = _.template('<% _.forEach(pCity, function(pdata) { \
                                    %>\
                                    <option value=<%= pdata.number %> title=<%= pdata.name %>><%=pdata.name%></option>\
                                    <% \
                                    }); %>');
                        var qyrz_pro = compiled({'pCity':data.city});
                        $('#companyS').append(qyrz_pro);
                        $('#companyS').change(function(){

                          cPro=$(this).val();
                          // re_cCit=$(this).find('option:selected').attr('title');
                          $('#companyC option:not(:first-of-type)').remove();
                          var regist_ccity = new MilkT(city_city,1);
                          regist_ccity.send({pid:cPro})
                                    .done(function(data){
                                      console.log(data);
                                       var compiled = _.template('<% _.forEach(cCity, function(pdata) { \
                                                %>\
                                                <option value=<%=pdata.name%>><%=pdata.name%></option>\
                                                <% \
                                                }); %>');
                                      var qyrz_pro = compiled({'cCity':data.city});
                                      $('#companyC').append(qyrz_pro);
                                      $('#companyC').change(function(){
                                        cCity=$(this).val();
                                      })
                                    })
                        })
                     })

        $('.regt-agree input').attr('name','2');
        $('.reg-btn').css('background','grey');
        $('.regt-agree input').click(function(){
          if($('.regt-agree input').attr('name')=='1'){
            $('.regt-agree input').attr('name','2');
            $('.reg-btn').css('background','grey');
          }else{
            $('.regt-agree input').attr('name','1');
            $('.reg-btn').css('background','#FC5F1A');
          }

        })
        $('.reg-btn').click(function(){
          console.log($('.regt-agree input').attr('name'));
        })
        //验证企业名称接口
        var flag=false;
        function CompanyN(){
          if($('#companyName').val()){
            var userCN = new MilkT(userCompanyN,3)
            userCN.send({company_name:$('#companyName').val()})
              .done(function(data){
                console.log(data);
                 $('#companyName').next('span').html('');
                 $('#companyName').css('border','');
                flag=true;
              }).fail(function(){
                console.log('企业账号已存在');
                $('#companyName').css('border','1px solid red');
                $('#companyName').next('span').html('企业账号已存在');
                flag=false;
              })
          }else{
            $('#companyName').css('border','1px solid red');
            $('#companyName').next('span').html('请输入企业账号');
            flag=false;
          }
          return flag;
        }
        $('#companyName').blur(function(){
            CompanyN();
        })



         //判断省市
        function CHpc(){
          console.log($('#companyC').find('option:selected').attr('title')=='请选择城市');
          console.log($('#companyC').val()=='请选择城市');
          if($('#companyS').find('option:selected').attr('title')!='请选择省份'&&$('#companyS').val()!='请选择省份'&&$('#companyC').find('option:selected').attr('title')!='请选择城市'&&$('#companyC').val()!='请选择城市'){
             $('.regt-address span').html('');
            $('#companyS').css('border','');
            //  $('.regt-address span').html('');
            $('#companyC').css('border','');
            return true;
          }else{
             $('.regt-address span').html('请选择省市');
             if($('#companyS').find('option:selected').attr('title')=='请选择省份'&&$('#companyS').val()=='请选择省份'){
                $('#companyS').css('border','1px solid red');
             }else{
               $('#companyS').css('border','');
              $('#companyC').css('border','1px solid red');
             }
            
            // $('.regt-address span').html('请选择省市');
           
            return false;
          }

        }
         $('.regt-address select').blur(function(){
            CHpc();
        })

        //管理密码
        function GLsec(){
           var admin_pwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/;
            if(!admin_pwd.test($('#glmm').val())){
              // alert("请输入6-12位数字与字母的结合");
              $('#glmm').val();
              $('#glmm').next('span').html('请输入6-12位数字与字母');
              $('#glmm').css('border','1px solid red');
              return false;
            }else{
              $('#glmm').next('span').html('');
              $('#glmm').css('border','');
              return true;
            }
        }
        $('#glmm').blur(function(){
          GLsec()
        })

        //点击注册以后调用注册的接口
        $('.reg_return').click(function(){
             if(!$('#userName').val()){
               $('#userName').next('span').html('请输入姓名');
               $('#userName').css('border','1px solid red');
               return false;
             }else{
               $('#userName').next('span').html('');
               $('#userName').css('border','');
             }
            if(CompanyN()&&CHpc()&&GLsec()&&$('.regt-agree input').attr('name')=='1' ){

                var ureg = new MilkT(uregist,3)
                ureg.send({company_name:$('#companyName').val(),province:cPro,
                  city:cCity,password:md5($('#glmm').val()),username:$('#userName').val(),
                  phone_number:$('#linkTel').val(),code:$('#new_yzm').val()})
                    .done(function(data){
                      console.log(data);
                      store.set('userPWD',$('#glmm').val());
                      $('.one-type').hide();
                      $('.two-type').hide();
                      $('.three-type').show();
                  })

            }


        })



       $('.next-type').click(function(){
         checkNumber();
        if(checkregist()&&validate()&&$('#new_yzm').val()!=''&&msgInfoCheck()){
          $('.one-type').hide();
          $('.two-type').show();
        }else{
          $('.one-type').show();
          $('.two-type').hide();
        }
      })








})
