$(function(){
    var pCity='';   //获取省名称
    var cCity='';  //获取市名称


    var uCode=store.get('usercode');

    var enterQS = new MilkT(enterpriseQS,3);
    enterQS.send({usercode:uCode})
        .done(function(data){
            // console.log(data);
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
            //统一社会信用代码
            if(data.unified_code=='null'){
                data.unified_code='';
            }
            //注册号
            if(data.register_code=='null'){
                data.register_code='';
            }
            //法人代表
            if(data.legalperson=='null'){
                data.legalperson='';
            }
            //法人代表身份证
            if(data.legalperson_code=='null'){
                data.legalperson_code='';
            }
            //所在城市
            if(data.province=='null'){
                data.province='';
            }
            if(data.city=='null'){
                data.city='';
            }
            //详细地址
            if(data.address=='null'){
                data.address='';
            }
            //注册电话
            if(data.phone_number=='null'){
                data.phone_number='';
            }
            //注册资本
            if(data.registered_capital=='null'){
                data.registered_capital='';
            }
            //成立时间
            if(data.founding_time=='null'){
                data.founding_time='';
            }
            //企业类型
            if(data.enterprise_nature=='null'){
                data.enterprise_nature='';
            }
            //产品范围
            if(data.main_business=='null'){
                data.main_business='';
            }
            //商业模式
            if(data.mgmt_model=='null'){
                data.mgmt_model='';
            }


            var reg = new RegExp('[\\u4E00-\\u9FFF]+','g');
            if(reg.test(data.province)){
                var template_qysmrz = $('#lefang_qysmrz_right').text();
                var templateFn_qysmrz = _.template(template_qysmrz);
                var dom = templateFn_qysmrz(data);
                $('#lefangtex_qysmrz_right').append(dom);
            }
            else{
                //省份
                var cPro = new MilkT(city_province,1);
                cPro.send({})
                    .done(function(dataP){
                        // var pCity='';   //获取省名称
                        // var cCity='';  //获取市名称
                        for(var i=0;i<dataP.city.length;i++){
                            if(dataP.city[i].number==data.province){
                                pCity=dataP.city[i].name;
                                var cnumber=dataP.city[i].number;
                            }
                        }
                        //城市
                        var cCro = new MilkT(city_city,1)
                        cCro.send({pid:cnumber})
                            .done(function(dataC){
                                // console.log(dataC);
                                for(var i=0;i<dataC.city.length;i++){
                                    if(data.city==dataC.city[i].number){
                                        cCity=dataC.city[i].name;
                                    }
                                }
                                data.city=cCity;
                                data.province=pCity;
                                var template_qysmrz = $('#lefang_qysmrz_right').text();
                                var templateFn_qysmrz = _.template(template_qysmrz);
                                var dom = templateFn_qysmrz(data);
                                $('#lefangtex_qysmrz_right').append(dom);

                                //认证成功后隐藏申请认证的按钮
                                if(data.apply_status==1){
                                    $('.envip_status').text('审核中');
                                    $('.envip_identifi').css('display','block');
                                }else if(data.apply_status==2){
                                    $('.envip_status').text('已认证');
                                    $('.envip_identifi').css('display','none');
                                    $('.envip_reg').css('display','none');
                                }else if(data.apply_status==3){
                                    $('.envip_status').text('认证不成功');
                                    $('.envip_identifi').css('display','block');
                                }else if(data.apply_status==4){
                                    $('.envip_status').text('未认证');
                                    $('.envip_identifi').css('display','block');
                                }

                                //注册号和统一社会信用代码的显示和隐藏
                                // console.log(data.register_code);
                                if(data.register_code==''){
                                    $('.register_code').hide();
                                }else{
                                    $('.unified_code').show();
                                }

                            })
                    });
            }


            $('.qygl-left-con>ul>li').mouseenter(function(){
                $('.qygl-left-con>ul>li>div').hide();
                $(this).find('div').show();
            });
            $('.qygl-left').mouseleave(function(){
                $('.qygl-left-con>ul li div').hide();
            });
            $('.qygl-left-con>ul>li:first-of-type').hover(function(){
                $(this).css('background','#fff');
            });
            $('.qygl-left ul li.active img').attr('src','images/icon/会员中心_press.png');
            $('.qygl-left-con>ul>li').eq(2).mouseenter(function(){
                $(this).find('img').attr('src','images/icon/企业信息管理_press.png');
            }).mouseleave(function(){
                $(this).find('img').attr('src','images/icon/企业信息管理.png');
            });
            $('.qygl-left-con>ul>li').eq(3).mouseenter(function(){
                $(this).find('img').attr('src','images/icon/商品管理_press.png');
            }).mouseleave(function(){
                $(this).find('img').attr('src','images/icon/商品管理.png');
            });
            $('.qygl-left-con>ul>li').eq(4).mouseenter(function(){
                $(this).find('img').attr('src','images/icon/订单管理_press.png');
            }).mouseleave(function(){
                $(this).find('img').attr('src','images/icon/订单管理.png');
            });
            $('.qygl-left-con>ul>li').eq(5).mouseenter(function(){
                $(this).find('img').attr('src','images/icon/合同管理_press.png');
            }).mouseleave(function(){
                $(this).find('img').attr('src','images/icon/合同管理.png');
            });
            $('.qygl-left-con>ul>li').eq(6).mouseenter(function(){
                $(this).find('img').attr('src','images/icon/发票管理_press.png');
            }).mouseleave(function(){
                $(this).find('img').attr('src','images/icon/发票管理.png');
            });
            $('.qygl-left-con>ul>li').eq(7).mouseenter(function(){
                $(this).find('img').attr('src','images/icon/支付管理_press.png');
            }).mouseleave(function(){
                $(this).find('img').attr('src','images/icon/支付管理.png');
            });

        });


});
