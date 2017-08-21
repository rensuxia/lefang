$(function(){
	var template_resetmphone = $('#lefang-resetmphone').text();
    var templateFn_resetmphone = _.template(template_resetmphone);
    $('#lefangtex-resetmphone').append(templateFn_resetmphone);


    var template_resetpwd = $('#lefang-resetpwd').text();
    var templateFn_resetpwd = _.template(template_resetpwd);
    $('#lefangtex-resetpwd').append(templateFn_resetpwd);



    var template_resetsuccess = $('#lefang-resetsuccess').text();
    var templateFn_resetsuccess = _.template(template_resetsuccess);
    $('#lefangtex-resetsuccess').append(templateFn_resetsuccess);

    var template_nav_main_foot = $('#lefang-nav-main-foot').text();
    var templateFn_nav_main_foot = _.template(template_nav_main_foot);
    $('#lefangtex-nav-main-foot').append(templateFn_nav_main_foot);

    $('.reset-sec').hide();
      $('.reset-thir').hide();

      function checkregist(){
        var testLinkTel =$('#rephone').val();
        var regLinkTel = /^(0|86|17951)?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;
        var resultLinkTel = regLinkTel.test(testLinkTel);
        if (!resultLinkTel || resultLinkTel == '') {
          $('#rephone').css('border','1px solid red');
          $('#rephone').next('span').html('请输入正确的手机号');
          return false;
        } else {
          $('#rephone').css('border','');
          $('#rephone').next('span').html('');
          return true;
        } 
      }
      $('#rephone').blur(function(){
        checkregist();
      })
      //产生验证码
          var cod='';
          function createCo(){  
             cod = '';   
             var codeLeng = 4;//验证码的长度  
             // var checkCode = document.getElementById('code');   
             var rando = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',  
             'S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'); 
             for(var i = 0; i < codeLeng; i++) {
                var index = Math.floor(Math.random()*36);  
                cod += rando[index]; 
            }  
            $('#resetcode').html(cod);
         } 
         createCo();

         $('#resetcode').click(function(){
          createCo();
         })

         // var cheCode = document.getElementById('code');
         // cheCode.onclick=function(){
          
         // }
         //校验验证码
          function validat(){  
            var inputCode = document.getElementById('resetval').value.toUpperCase();      
            if(inputCode.length <= 0) { 
                $('#resetval').css('border','1px solid red');
                $('.reg-yzm').next('span').html('请输入正确的验证码');  
                return false;
            }         
            else if(inputCode != cod ) { 
              $('#resetval').css('border','1px solid red');  
                $('.reg-yzm').next('span').html('请输入正确的验证码');
                createCo(); 
                document.getElementById('resetval').value = '';
                return false;
              
            }else{
              $('#resetval').css('border','');
              $('.reg-yzm').next('span').html('');
              return true;
            }                   
          }  

        $('#resetval').blur(function(){
          validat();
        })

        //发送短信验证码
          var timer='';
          var mesgInfo = '';
          $('.reset-get-code').one('click',function(){
            if(validat()&&checkregist()){
           
              var dxyz=new MilkT(dxyzm,3);
              dxyz.send({telephone:$('#rephone').val(),username:'用户',type:2})
                    .done(function(data){
                      console.log(data);
                      mesgInfo=data.smscode;
                      timer=setInterval(distime,1000);
                    })
              
            }
          })

           function distime(){
            var xx=$('.reseconds').text();
            xx-=1;
            // console.log($(".seconds").text());
            $('.reseconds').html(xx);
            if(xx<=0){
              $('.reset-get-code').css('background','');
              clearInterval(timer);
              $('.reseconds').html(20);
              $('.reset-get-code').one('click',function(){
                  timer=setInterval(distime,1000);
                  var dxyz=new MilkT(dxyzm,3);
                  dxyz.send({telephone:$('#rephone').val(),username:'用户',type:2})
                      .done(function(data){
                          console.log(data);
                           mesgInfo=data.smscode;
                    })

              })
            }else{
              $('.reset-get-code').css('background','grey');
            }
           }

          function msgInfoCheck(){
            if($('#redxyzm').val()==mesgInfo&&$('#redxyzm').val()!=''){
                $('#redxyzm').attr('placeholder','验证码');
                $('#redxyzm').css('border','');
              return true;
            }else{
              $('#redxyzm').attr('placeholder','请输入正确的验证码');
              $('#redxyzm').css('border','1px solid red');
              return false;
            }
          }
          
          $('#redxyzm').blur(function(){
            msgInfoCheck();
          })


          //3秒自动跳转 
          var time='';
          function ds(){
            var tim=$('.djstz em').html();
            tim-=1;
            $('.djstz em').html(tim);
            if(tim==0){
              window.location.href ='login.html';
              clearInterval(time);
            }
          }    
          
          
          //管理密码
          function GLsec(){
            var admin_pwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/;
              if(!admin_pwd.test($('#renewse').val())){
                // alert("请输入6-12位数字与字母的结合");
                $('#renewse').val();
                $('#renewse').next('span').html('请输入6-12位数字与字母');
                $('#renewse').css('border','1px solid red');
                return false;
              }else{
                $('#renewse').next('span').html('');
                $('#renewse').css('border','');
                return true;
              }
          }
          $('#renewse').blur(function(){
            GLsec();
          })

          //确认密码
          function trueSec(){
            if($('#renewse').val()==$('#renewsere').val()){
              $('#renewsere').css('border','');
              $('#renewsere').next('span').html('');
              return true;
            }else{
              $('#renewsere').css('border','1px solid red');
              $('#renewsere').next('span').html('输入的密码不一致');
              return false;
            }
          }

          $('#renewsere').blur(function(){
            trueSec();
          })

          //找回密码
          $('.reg-btn').click(function(){
            // alert(GLsec());
            // alert(trueSec());
            if(GLsec()&&trueSec()){
              var urepwd=new MilkT(repwd,1)
              urepwd.send({messagevalidate:$('#redxyzm').val(),phonenumber:$('#rephone').val(),freshpassword:md5($('#renewse').val())})
                .done(function(data){
                    console.log(data);
                    $('.reset-thir').show();
                    $('.reset-sec').hide();
                    time=setInterval(ds,1000);
                })
            }
    	
    })
    
	      
    //点击返回跳转页面
    $('.tzindex').click(function(){
      window.location.href ='login.html';
    })


      $('.next-type').click(function(){
        // alert(checkregist());
        // alert(validat());
        // alert(msgInfoCheck());
      
        if(checkregist()&&validat()&&msgInfoCheck()){
          $('.reset-fir').hide();
          $('.reset-sec').show();
        }else{
          $('.reset-fir').show();
          $('.reset-sec').hide();
        }
      })   

    
      
      // $('.reset-fir .reset-next-type').click(function(){
        // $('.reset-sec').show();
        // $('.reset-fir').hide();
      // })
      // $('.reset-sec .reset-next-type').click(function(){
      //   $('.reset-thir').show();
      //   $('.reset-sec').hide();
        
                    
      // })
             
                    
})