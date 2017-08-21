$(function(){
    var template_login = $('#lefang_login').text();
    var templateFn_login= _.template(template_login);
    $('#lefangtex_login').append(templateFn_login);
    $('.login_list ul').eq(1).hide();
    $('.login_choose a').click(function(){
        $('.login_choose a').eq($(this).index()).addClass('active').siblings().removeClass('active');
        $('.login_list ul').hide();
        $('.login_list ul').eq($(this).index()).show();
    })

    // function Save() {
    //     if ($('.serven_login').find('img').attr('src')=='images/pic/check_on.png') {
    //         var str_username = $('#username').val();
    //         var str_password = $('#pwd').val();
    //         $.cookie('rmbUser', 'true', { expires: 7 }); //存储一个带7天期限的cookie
    //         $.cookie('username', str_username, { expires: 7 });
    //         $.cookie('password', str_password, { expires: 7 });
    //     }
    //     else {
    //         $.cookie('rmbUser', 'false', { expire: -1 });
    //         $.cookie('username', '', { expires: -1 });
    //         $.cookie('password', '', { expires: -1 });
            
    //     }
    // };

    $('.serven_login').click(function(){
        if($(this).find('img').attr('src')=='images/pic/check_on.png'){
            $(this).find('img').attr('src','images/pic/check.png');

        }else{
            $(this).find('img').attr('src','images/pic/check_on.png');
        }
        //  Save();
        
    })
    
    

})