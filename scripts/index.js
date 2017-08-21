$(function(){
    var template_top = $('#lefang_top').text();
    var templateFn_top = _.template(template_top);
    $('#lefangtex_top').append(templateFn_top);

    var template_nav = $('#lefang_nav').text();
    var templateFn_nav = _.template(template_nav);
    $('#lefangtex_nav').append(templateFn_nav);

    var template_nav_suspend = $('#lefang_nav_suspend').text();
    var templateFn_nav_suspend = _.template(template_nav_suspend);
    $('#lefangtex_nav_suspend').append(templateFn_nav_suspend);

    var template_banner = $('#lefang_banner').text();
    var templateFn_banner = _.template(template_banner);
    $('#lefangtex_banner').append(templateFn_banner);

    //纱线板块
    // var template_yarn = $('#lefang_yarn').text();
    // var templateFn_yarn = _.template(template_yarn);
    // $('#lefangtex_yarn').append(templateFn_yarn);


    var template_grey = $('#lefang_grey').text();
    var templateFn_grey = _.template(template_grey);
    $('#lefangtex_grey').append(templateFn_grey);

     //面料板块
    // var template_the_fabric = $('#lefang_the_fabric').text();
    // var templateFn_the_fabric = _.template(template_the_fabric);
    // $('#lefangtex_the_fabric').append(templateFn_the_fabric);


    var template_lefang_news = $('#lefang_lefang_news').text();
    var templateFn_lefang_news = _.template(template_lefang_news);
    $('#lefangtex_lefang_news').append(templateFn_lefang_news);

    var template_foot_add = $('#lefang_foot_add').text();
    var templateFn_foot_add = _.template(template_foot_add);
    $('#lefangtex_foot_add').append(templateFn_foot_add);
    // var template_foot = $('#lefang_foot').text();
    // var templateFn_foot = _.template(template_foot);
    // $('#lefangtex_foot').append(templateFn_foot);


    var template_little_function = $('#lefang_little_function').text();
    var templateFn_little_function = _.template(template_little_function);
    $('#lefangtex_little_function').append(templateFn_little_function);
   
        //首页头部导航
        var homePNav = new MilkT(productCGmain,3)
        homePNav.send({})
            .done(function(data){
                // var template_nav = $('#lefang_nav').text();
                // var templateFn_nav = _.template(template_nav);
                // var dom = templateFn_nav(data);
                // $('#lefangtex_nav').append(dom);

                // var template_nav_suspend = $('#lefang_nav_suspend').text();
                // var templateFn_nav_suspend = _.template(template_nav_suspend);
                // var demo = templateFn_nav_suspend(data);
                // $('#lefangtex_nav_suspend').append(demo);
                var alldata = data.productCategoryEntityList;
                var compiled = _.template('<% _.forEach(alldata, function(pdata) { \
                  %><li>\
                        <a href="<%= pdata.navigationUrl%>" name="<%= pdata.navigationId%>">\
                           <%=pdata.navigationName%>\
                        </a>\
                    </li>\
                   <% \
                }); %>');

                var templateTest=compiled({ 'alldata': alldata});
                $('.main_nav_list ul').append(templateTest); 
                
                // $('.main_nav_list ul li').eq(0).attr('class','active');
                // $('.main_nav_suspend .main_nav_list ul li').eq(0).attr('class','active');
                if($('.main_nav_list ul li').eq(0).attr('class')=='active'){
                    store.remove('homeCate');
                }
                    $('.main_nav_list ul li').click(function(){
                        store.set('homeCate',$(this).find('a').attr('name'));
                        if(store.get('homeCate')>=4){
                            store.set('homeCate',$(this).find('a').attr('name')-1);
                        }
                        
                    })     
    
                $('.main_nav_list ul li').eq(store.get('homeCate')).attr('class','active');
                // $('.main_nav_suspend .main_nav_list ul li').eq(store.get('homeCate')).attr('class','active');

            })
                
            //首页banner图
            var banner_advert = new MilkT(advertInfo,3)            
            banner_advert.send({type:1})
                        .done(function(data){
                            console.log(data);
                            var pdata = data.entitylist[0].img_url;
                            var pdata_url = data.entitylist[0].link_url;
                            var img_banner = pdata.split(',');
                            var grey_link_url= pdata_url.split(',');
                            $(img_banner).each(function(i,m){
                                if(grey_link_url[i]==''){
                                    grey_link_url[i]='javascript:;';
                                }else{
                                    grey_link_url[i]='http://'+grey_link_url[i];
                                }
                                var a = '<li>\
                                        <a href="'+grey_link_url[i]+'" target="_blank">\
                                            <img src="'+m+'" alt="图片正在加载" />\
                                        </a>\
                                    </li>'
                                 var x = '<li><a href="javascript:;"></a></li>'
                                $('.banner_icon_list').append(x);
                                $('.banner_icon_list li').eq(0).attr('class','selected');
                                $('.banner_img_lists').append(a);
                            })
                        })
            
            //坯布banner图
            var grey_advert = new MilkT(advertInfo,3)            
             grey_advert.send({type:3})
                    .done(function(data){
                        var pdata = data.entitylist[0].img_url;
                        var pdata_url = data.entitylist[0].link_url;
                        var grey_banner = pdata.split(',');
                        var grey_link_url= pdata_url.split(',');
                        $(grey_banner).each(function(i,m){
                            console.log(grey_link_url[i]);
                            if(grey_link_url[i]==''){
                                grey_link_url[i]='javascript:;';
                            }else{
                                // var reg=/^(http:\/\/)/;
                                // reg.test(grey_link_url)
                                grey_link_url[i]='http://'+grey_link_url[i];
                                // if(grey_link_url[i])
                            }
                            var a = '<li>\
                                        <a href="'+grey_link_url[i]+'" target="_blank">\
                                            <img src="'+m+'" alt="" />\
                                        </a>\
                                </li>'
                            var x = '<li><a href="javascript:;"></a></li>'

                           
                            $('.grey_icons').append(x);
                            $('.grey_imgs').append(a);
                            $('.grey_icons li').eq(0).attr('class','selected');
                            $('.grey_icons').css('width',20*$('.grey_icons li').length+'px')
                        })
                    })

            //优商优品板块
            var homePInfo = new MilkT(homePI,3)
            homePInfo.send({})
              .done(function(data){
                console.log(data);
                var template_preferred_goods = $('#lefang_preferred_goods').text();
                var templateFn_preferred_goods = _.template(template_preferred_goods);
                $('#lefangtex_preferred_goods').append(templateFn_preferred_goods);
                // var template = $('#lefang-ysyp').text();
                // var templateFn = _.template(template);
                // $('#lefangtex-ysyp').append(templateFn);
                 //alert(JSON.stringify(dom));
                var alldata=data.homePageProductList;
                  //循环模式
                var dom='';
                $('.preferred_goods_copy').each(function(){
                    var a ='';
                    var e ='';
                    var x='<ul class="preferred_goods_list clearfix">';
                    var y='</ul>';
                    $(alldata).each(function(i,m){
                        
                        a+='<li>\
                            <a href="grey_detail.html?id='+m.productId+'&BatchId='+m.productBatchId+'" target="_blank">\
                                <img src="'+m.productImage+'" alt="" />\
                                <span>'+m.productName+'</span>\
                                <strong>￥'+m.productPrice+'<em>/'+m.productUnit+'</em></strong>\
                            </a>\
                        </li>';
                        
                        // console.log(a);
                        if(i%5==0){
                            e += x;
                        }   
                        if((i+1)%5==0){
                            e+=a+y;
                            a='';
                        }else{
                            if(i==$(alldata).length-1){
                                e+=a+y;
                            }
                        }  
                    })
                   
                    dom+=e;
                })
                $('.preferred_goods_copy').append(dom);

                $('.preferred_goods_list li').each(function(){
                    $(this).find('span').text();
                    if($(this).find('span').text()=='undefined'){
                        $(this).css('display','none');
                    }
                    if($(this).find('img').attr('src')=='undefined'){
                        $(this).css('display','none');
                    }
                    if($(this).find('strong em').text()=='undefined'){
                        $(this).css('display','none');
                    }
                })
                var pre_gUl_len=0;
                $('.preferred_goods_list li').each(function(){
                    if($(this).css('display')!='none'){
                        pre_gUl_len++;
                    }
                })
                
                if(pre_gUl_len>5){
                     pre_gUl_len=5;
                }
                $('.preferred_goods_list li').css('width',Math.floor(100/pre_gUl_len)+'%');


                // var compiled = _.template('<% _.forEach(alldata, function(pdata) { \
                //   %><li>\
                //         <a href="yarn_detail.html?id=<%=pdata.productId%>" target="_blank">\
                //             <img src="<%=pdata.productImage%>" alt="" />\
                //             <span><%= pdata.productName%></span>\
                //             <strong>￥<%=pdata.productPrice%><em>/<%= pdata.productUnit%></em></strong>\
                //         </a>\
                //     </li>\
                //    <% \
                // }); %>');

                // var templateTest=compiled({ 'alldata': alldata});
                // $('.ul1').append(templateTest);
                // console.log($('.preferred_goods_copy li').length);
                // if($(".ul1 li").length>=4){
                //     for(var i=0;i<$(".ul li").length-4;i++){
                //         $(".ul2").append($(".ul1 li").eq(i+5));
                //     }
                // }
                // 滚动图
                // var k=0;
                // var clo=$('.preferred_goods_copy').children('.preferred_goods_list').first().clone();
                // $('.preferred_goods_copy').append(clo).width($('.preferred_goods_container').children('.preferred_goods_list').length*($('.preferred_goods_container').children('.preferred_goods_list').width));
                // $('.preferred_goods_prev').click(function(){
                //     k++;
                //     if(k==$('.preferred_goods_copy').children('.preferred_goods_list').length){
                //         k=1;
                //         $('.preferred_goods_copy').css({'left':0})
                //     }
                //     $('.preferred_goods_copy').stop().animate({'left':-k*1200},500);
                // })

                // $('.preferred_goods_next').click(function(){
                //     k--;
                //     if(k==-1){
                //         k=$('.preferred_goods_copy').children('.preferred_goods_list').length-2;
                //         $('.preferred_goods_copy').css({'left':-($('.preferred_goods_copy').children('.preferred_goods_list').length-1)*1200})
                //     }
                //     $('.preferred_goods_copy').stop().animate({'left':-k*1200},500);
                // })
            })



    //闭包轮播
    for(var j=0;j<=$('.banner').length-1;j++){
        (function(m){
            var i=1;
            var timer=setInterval(playing,3000);
            $('.banner').eq(m).find('.banner_img li').eq(0).show();
            $('.banner').eq(0).find('.banner_prev').hide();
            $('.banner').eq(0).find('.banner_next').hide();
            function playing(){
                if(i>$('.banner').eq(m).find('.banner_img li').length-1){
                    i=0;
                }
                // console.log(i);
                imgRun(i);
                spanRun(i);
                i++;
            }
            function imgRun(i){
                $('.banner').eq(m).find('.banner_img>li').hide().eq(i).show();

            }
            function spanRun(i){
                $('.banner').eq(m).find('.banner_circle li').removeClass('selected').eq(i).addClass('selected')
            }
            $('.banner').eq(m).mouseenter(function(){
                clearInterval(timer);
                $('.banner').eq(m).find('.banner_circle li').mouseenter(function(){
                    imgRun($(this).index());
                    spanRun($(this).index());
                }).mouseleave(function(){
                    i=$(this).index()+1;
                })
                $('.banner').eq(0).find('.banner_prev').show();
                $('.banner').eq(0).find('.banner_next').show();
            }).mouseleave(function(){
                timer=setInterval(playing,3000);
                $('.banner').eq(0).find('.banner_prev').hide();
                $('.banner').eq(0).find('.banner_next').hide();
            })
            $('.banner').eq(m).find('.banner_prev').click(function(){
                // alert(i);
                // i=i-($('.banner').eq(m).find('.banner_img li').length-1);
                i=i-2;
                if(i==0-($('.banner').eq(m).find('.banner_img li').length-1)){
                    // i=$('.banner_img li:not(:last-of-type)').length-2;
                    i=1;
                }
                playing();
            })
            $('.banner').eq(m).find('.banner_next').click(function(){
                playing();
            })
        })(j)
    }

    //首页导航
    $('.main_nav_list ul li a').click(function(){
        $('.main_nav_list ul li').eq($(this).parent().index()).addClass('active').siblings().removeClass('active');
    })



    //纺织资讯选项卡
    $('.lefang_news_zhishi').hide();
    $('.lefang_news_xk a').mouseover(function(){
        $('.lefang_news_xk a').eq($(this).index()).addClass('active').siblings().removeClass('active');
        $('.lefang_news_list').hide();
        $('.lefang_news_list').eq($(this).index()).show();
    })


    //返回顶部
    $('.return_top').click(function(){
		$('html,body').animate({scrollTop:0},1000);
		return false;
	})
    $('.little_function').hide();
    $(window).scroll(function(){
        // console.log($(document).scrollTop());
        if($(document).scrollTop()<=420){
            $('.little_function').hide();
        }else{
            $('.little_function').show();
        }
    })

    //图标
    $('.little_function_container li>div').hide();
    $('.feedback').next('p').hide();
    $('.little_function_container li').mouseenter(function(){
        $('.little_function_container li').eq($(this).index()).css('background','#252C3C')
        .siblings().css('background','');
        $('.little_function_container li>div').hide();
        $('.little_function_container li').eq($(this).index()).children('div').show();
        $('.feedback').next('p').hide();
    })
    $('.little_function').mouseleave(function(){
        $('.little_function_container li>div').hide();
        $('.little_function_container li').css('background','');
    })


    //头部悬浮
    $(window).scroll(function(){
        if($(document).scrollTop()>=40){
            if(!$('.main_nav_suspend').is(':animated')){
                // $('.main_nav_suspend').show();
                $('.main_nav').css({'position':'fixed','z-index':'100000','background':'#fff','top':'0px','left':'0px','border-bottom':'1px solid #ccc'});
            }
        }else{
            if(!$('.main_nav_suspend').is(':animated')){
                // $('.main_nav_suspend').hide();
            }
            // $('.main_nav_suspend').hide();
            $('.main_nav').css({'position':'relative','border-bottom':'none'});
        }
    })

        // 单击加入购物车  导航购物车 数量 同步
    if(store.get('shoping_cart')){
       $('.main_nav_shopcart').children('a').find('span').text(store.get('shoping_cart'));
       console.log( $('.main_nav_shopcart').children('a').find('span').text());
       console.log(store.get('shoping_cart'));
    }

    var homepage_Yarn=new MilkT(homepageYarn,3)
        homepage_Yarn.send({type:1})
            .done(function(data){
                console.log(data);
                // var alldata = data.homePageProductList;
                // var compiled = _.template('<% _.forEach(alldata, function(pdata) { \
                //   %><li>\
                //         <a href="yarn_detail.html?id=<%=pdata.productId%>" target="_blank">\
                //             <img src="<%=pdata.productImage%>" alt="" />\
                //             <span><%= pdata.productName%></span>\
                //             <strong>￥<%=pdata.productPrice%><em>/<%= pdata.productUnit%></em></strong>\
                //         </a>\
                //     </li>\
                //    <% \
                // }); %>');

                // var templateTest=compiled({ 'alldata': alldata});
                // $('.ul1').append(templateTest);

                // var dom='';
                // $(alldata).each(function(i,m){
                //     var a ='';
                //     var e ='';
                    // a+='<li class="yarn_imgs_typeo">\
                    //         <a href="yarn.html" target="_blank">\
                    //             <img src="images/pic/Yarn (4).png" alt="">\
                    //             <p>\
                    //                 <span>亚麻印花布料纯棉麻手工DIY</span>\
                    //                 <span>麻布桌布沙发抱枕窗帘面料亚麻布</span>\
                    //                 <strong>￥0.00<em>/千克</em></strong>\
                    //             </p>\
                    //         </a>\
                    //     </li>';
                    // if(i%2==0){
                    //    // a+='<li class="yarn_imgs_typeo">\
                    //         <a href="yarn.html" target="_blank">\
                    //             <img src="images/pic/Yarn (4).png" alt="">\
                    //             <p>\
                    //                 <span>亚麻印花布料纯棉麻手工DIY</span>\
                    //                 <span>麻布桌布沙发抱枕窗帘面料亚麻布</span>\
                    //                 <strong>￥0.00<em>/千克</em></strong>\
                    //             </p>\
                    //         </a>\
                    //     </li>';
                    // }else{
                            // a+='<li class="yarn_imgs_typet yarn_imgs_t" target="_blank">\
                            //             <a href="yarn.html">\
                            //                 <img src="images/pic/Yarn (2).png" alt="">\
                            //                 <p>\
                            //                     <span>100%纯天然手工亚麻线</span>\
                            //                     <strong>￥0.00<em>/千克</em></strong>\
                            //                 </p>\
                            //             </a>\
                            //         </li>';
                    // }
                //     dom+=a;
                // })
                // $('.yarn_proli_lists').append(dom);
            })
        

        var homeCate_Yarn= new MilkT(homeYarnCategory,3)
        homeCate_Yarn.send({type:272})
                    .done(function(data){
                        console.log(data);
                        var alldata = data.productCategoryEntityList;
                        var compiled = _.template('<% _.forEach(alldata, function(pdata) { \
                        %><li>\
                                <a href="yarn.html?id=<%=pdata.categoryId%>">\
                                    <%=pdata.categoryName%>\
                                </a>\
                            </li>\
                        <% \
                        }); %>');

                        var templateTest=compiled({ 'alldata': alldata});
                        $('.yarn_lists ul').prepend(templateTest); 
                    })
        //坯布
        var homepage_Grey=new MilkT(homepageYarn,3)
        homepage_Grey.send({type:2})
            .done(function(data){
                console.log(data);
                var alldata = data.homePageProductList;
                var compiled = _.template('<% _.forEach(alldata, function(pdata) { \
                  %><li>\
                        <a href="grey_detail.html?id=221" target="_blank">\
                            <img src="<%=pdata.productImage%>" alt="" />\
                            <span><%= pdata.productName%></span>\
                            <strong>￥<%=pdata.productPrice%><em>/<%= pdata.productUnit%></em></strong>\
                        </a>\
                    </li>\
                   <% \
                }); %>');

                var templateTest=compiled({ 'alldata': alldata});
                $('.grey_pro_lists').append(templateTest);
                
            })

        var homeCate_Grey= new MilkT(homeYarnCategory,3)
        homeCate_Grey.send({type:239})
                    .done(function(data){
                        console.log(data);
                        var alldata = data.productCategoryEntityList;
                        var compiled = _.template('<% _.forEach(alldata, function(pdata) { \
                        %><li>\
                             <a href="grey.html?categoryid=<%=pdata.categoryId%>">\
                                    <%=pdata.categoryName%>\
                                </a>\
                            </li>\
                        <% \
                        }); %>');

                        var templateTest=compiled({ 'alldata': alldata});
                        $('.grey_lists ul').prepend(templateTest); 


                        $('.grey_lists ul li').click(function(){
                            store.set('homeCate',2);
                        })
                    })
        
        //面料
        var homepage_Fabric=new MilkT(homepageYarn,3)
        homepage_Fabric.send({type:3})
            .done(function(data){
                console.log(data);
            })



        //意见反馈
        function checkregist(){
            var testLinkTel =$('#feedback_number').val();
            var regLinkTel = /^(0|86|17951)?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;
            var resultLinkTel = regLinkTel.test(testLinkTel);
            if (!resultLinkTel || resultLinkTel == '') {
            return false;
            } else {
            return true;
            }
        }    
        
        $('.feedback_sub').click(function(){
            var m = 1;
            var myDate = new Date();
            var year=myDate.getFullYear();
            //获取当前月
            var month=myDate.getMonth()+1;
            //获取当前日
            var date=myDate.getDate(); 
            var h=myDate.getHours();       //获取当前小时数(0-23)
            var m=myDate.getMinutes();     //获取当前分钟数(0-59)
            var s=myDate.getSeconds(); 

            var feedback_time=year+'年'+month+'月'+date+'日 '+h+':'+m+':'+s;
            var feedback_type='1';
            if(store.get('usercode')){
                feedback_type='2';
            }
            
            if($('#feedback_number').val()!=''&&checkregist()){
                var feedback = new MilkT(feedbackfrom,3)
                feedback.send({phone_number:$('#feedback_number').val(),content:$('#feed_back').val(),create_time:feedback_time,type:feedback_type})
                    .done(function(data){
                        console.log(data);
                        $('.feedback').hide();
                        m=2;
                        $('.feedback').next('p').show();
                        $('#feedback_number').val('');
                        $('#feed_back').val('');
                    })
            }
            if(m==2){
                $('.feedback').next('p').show();
                var t=setTimeout(function(){
                    $('.feedback').next('p').hide();
                },3000)
                m=1;  
            }
            
        })

        

        
})





