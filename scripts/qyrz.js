$(function(){
    var uCode=store.get('usercode');

    var enterQS = new MilkT(enterpriseQS,3);
    enterQS.send({usercode:uCode})
        .done(function(data){
            // console.log(data);
            //审核中或认证不成功
            if(data.apply_status=='1'||data.apply_status=='3'){
                if(data.unified_code=='null'){
                    data.unified_code='';
                    $('.qyrz_yzcm').attr('checked','checked');
                }
                if(data.register_code=='null'){
                    data.register_code='';
                    $('.qyrz-dzhy').attr('checked','checked');
                }
                //注册电话
                if(data.phone_number=='null'){
                    data.phone_number='';
                }
                var template_qyrz_right_detail = $('#lefang-qyrz-right_detail').text();
                var templateFn_qyrz_right_detail = _.template(template_qyrz_right_detail);
                var dom=templateFn_qyrz_right_detail(data);
                $('.qygl-right').append(dom);

                //证件类型的切换
                $('.qyrz-zch').hide();
                $('.qyrz-dzhy').click(function(){
                    $('.qyrz-xydm').show();
                    $('.qyrz-zch').hide();
                })
                $('.qyrz-yzcm').click(function(){
                    $('.qyrz-xydm').hide();
                    $('.qyrz-zch').show();
                })
                $('.qyrz-yzfilebtn').click(function(){
                    layerWin_Detail('r_uploadFile.html','上传营业执照');
                });
                $('.qyrz-yzfilebtnT').click(function(){
                    layerWin_Detail('r_uploadFile.html','上传认证授权书');
                });

                //下载认证授权书模板(在新窗口中打开)
                $('#down_detail').on('click',function () {
                    window.open(
                        'qyrz_authorization.html',
                        'newwindow',
                        'height=100,width=600,height=450,top=250,left=600,toolbar=no,menubar=no,scrollbars=no,resizable=yes,location=no, status=no'
                    )
                });

                //判断认证授权书的值
                function Certificate() {
                    if($('.qyrz_img').attr('src')=='images/rzsq.png'){
                        $('.qyrz-rzsq').next('b').css('background','url(../dist/images/icon.png) -60px 0');
                        $('.qyrz-rzsq').nextAll('strong').html('请上传企业认证授权书');
                    }
                    else{
                        $('.qyrz-rzsq').next('b').css('background','url(../dist/images/icon.png) -30px 0');
                        $('.qyrz-rzsq').nextAll('strong').html(' ');
                    }
                }
                $('.eighteen_code').focus(function () {
                    Certificate();
                })
                $('.fifteen_code').focus(function () {
                    Certificate();
                })

                //判断营业执照的值
                function Licence() {
                    if($('.yyzz_img').attr('src')=='images/yyzz.png'){
                        $('.yyzz').next('b').css('background','url(../dist/images/icon.png) -60px 0');
                        $('.yyzz').nextAll('strong').html('请上传营业执照');
                    }
                    else{
                        $('.yyzz').next('b').css('background','url(../dist/images/icon.png) -30px 0');
                        $('.yyzz').nextAll('strong').html('');
                    }
                }
                $('.qyrz_company_name').focus(function () {
                    Licence();
                })
                //统一社会信用代码
                function credit_code(){
                    if($('.eighteen_code').val().length!=18){
                        $('.eighteen_code').css('border','1px solid red');
                        $('.qyrz-xydm').parent().find('b').css('background','url(../dist/images/icon.png) -60px 0');
                        $('.qyrz-xydm').parent().find('strong').html('请填写正确的18位信用代码');
                        return false;
                    }else{
                        $('.eighteen_code').css('border','');
                        $('.qyrz-xydm').parent().find('b').css('background','url(../dist/images/icon.png) -30px 0');
                        // $('.qyrz-xydm').parent().find('strong').css('color','#11CD6D');
                        $('.qyrz-xydm').parent().find('strong').html('');
                    }
                }

                $('.eighteen_code').blur(function(){
                    $('.fifteen_code').val('');
                    credit_code();

                });

                //注册号
                function regist_number(){
                    if($('.fifteen_code').val().length!=15){
                        $('.fifteen_code').css('border','1px solid red');
                        $('.qyrz-xydm').parent().find('b').css('background','url(../dist/images/icon.png) -60px 0');
                        $('.qyrz-xydm').parent().find('strong').html('请填写15位的注册号');
                        return false;
                    }else{
                        $('.fifteen_code').css('border','');
                        $('.qyrz-xydm').parent().find('b').css('background','url(../dist/images/icon.png) -30px 0');
                        $('.qyrz-xydm').parent().find('strong').html('');
                    }
                }
                $('.fifteen_code').blur(function(){
                    $('.eighteen_code').val('');
                    regist_number();
                })

                //企业名称
                function qyrz_CName(){
                    if($('.qyrz_company_name').val()==''){
                        $('.qyrz_company_name').css('border','1px solid red');
                        $('.qyrz_company_name').parent().next('b').css('background','url(../dist/images/icon.png) -60px 0');
                        $('.qyrz_company_name').parent().nextAll('strong').html('请输入企业名称');
                        return false;
                    }else{
                        $('.qyrz_company_name').css('border','');
                        $('.qyrz_company_name').parent().next('b').css('background','url(../dist/images/icon.png) -30px 0');
                        $('.qyrz_company_name').parent().nextAll('strong').html('');
                        return true;
                    }
                }
                //    当企业名称失去焦点时调用
                $('.qyrz_company_name').blur(function () {
                    qyrz_CName();
                })
                //法人代表
                function legal_repre(){
                    if($('.legal_repre').val()==''){
                        $('.legal_repre').css('border','1px solid red');
                        $('.legal_repre').parent().next('b').css('background','url(../dist/images/icon.png) -60px 0');
                        $('.legal_repre').parent().nextAll('strong').html('请输入法人代表');
                        return false;
                    }else{
                        $('.legal_repre').css('border','');
                        $('.legal_repre').parent().next('b').css('background','url(../dist/images/icon.png) -30px 0');
                        $('.legal_repre').parent().nextAll('strong').html('');
                        return true;
                    }
                }
                //当法人代表失去焦点时
                $('.legal_repre').blur(function () {
                    legal_repre();
                })

                //身份证检验
                var vcity={ 11:'北京',12:'天津',13:'河北',14:'山西',15:'内蒙古',
                    21:'辽宁',22:'吉林',23:'黑龙江',31:'上海',32:'江苏',
                    33:'浙江',34:'安徽',35:'福建',36:'江西',37:'山东',41:'河南',
                    42:'湖北',43:'湖南',44:'广东',45:'广西',46:'海南',50:'重庆',
                    51:'四川',52:'贵州',53:'云南',54:'西藏',61:'陕西',62:'甘肃',
                    63:'青海',64:'宁夏',65:'新疆',71:'台湾',81:'香港',82:'澳门',91:'国外'
                };

                function checkCard(card){
                    //是否为空
                    if(!card||!isCardNo(card)||!checkProvince(card)||!checkBirthday(card)||!checkParity(card)){
                        $('.legal_repre_idCard').parent().next('b').css('background','url(../dist/images/icon.png) -60px 0');
                        $('.legal_repre_idCard').parent().nextAll('strong').html('请输入正确的身份证号码');
                        // jQuery(".sf_list").focus();
                        return false;
                    }
                    $('.legal_repre_idCard').parent().next('b').css('background','url(../dist/images/icon.png) -30px 0');
                    $('.legal_repre_idCard').parent().nextAll('strong').html('');
                    return true;
                };


                //检查身份证号码是否符合规范，包括长度，类型
                function isCardNo(card){
                    //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
                    var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
                    if(reg.test(card) === false){
                        return false;
                    }
                    $('.legal_repre_idCard').parent().next('b').css('background','url(../dist/images/icon.png) -30px 0');
                    $('.legal_repre_idCard').parent().nextAll('strong').html('');
                    return true;
                };

                //取身份证前两位,校验省份
                function checkProvince(card){
                    var province = card.substr(0,2);
                    if(vcity[province] == undefined) {
                        return false;
                    }
                    $('.legal_repre_idCard').parent().next('b').css('background','url(../dist/images/icon.png) -30px 0');
                    $('.legal_repre_idCard').parent().nextAll('strong').html('');
                    return true;
                };

                //检查生日是否正确
                function checkBirthday(card){
                    var len = card.length;
                    //身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
                    if(len == '15'){
                        var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
                        var arr_data = card.match(re_fifteen);
                        var year = arr_data[2];
                        var month = arr_data[3];
                        var day = arr_data[4];
                        var birthday = new Date('19'+year+'/'+month+'/'+day);
                        return verifyBirthday('19'+year,month,day,birthday);
                    }
                    //身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
                    if(len == '18'){
                        var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
                        var arr_data = card.match(re_eighteen);
                        var year = arr_data[2];
                        var month = arr_data[3];
                        var day = arr_data[4];
                        var birthday = new Date(year+'/'+month+'/'+day);
                        return verifyBirthday(year,month,day,birthday);
                    }
                    return false;
                };

                //校验日期
                function verifyBirthday(year,month,day,birthday){
                    var now = new Date();
                    var now_year = now.getFullYear();
                    //年月日是否合理
                    if(birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day){
                        //判断年份的范围（3岁到100岁之间)
                        var time = now_year - year;
                        if(time >= 3 && time <= 100)
                        {
                            $('.legal_repre_idCard').parent().next('b').css('background','url(../dist/images/icon.png) -30px 0');
                            $('.legal_repre_idCard').parent().nextAll('strong').html('');
                            return true;
                        }
                        return false;
                    }
                    return false;
                };

                //校验位的检测
                function checkParity(card){
                    //15位转18位
                    card = changeFivteenToEighteen(card);
                    var len = card.length;
                    if(len == '18'){
                        var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                        var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
                        var cardTemp = 0, i, valnum;
                        for(i = 0; i < 17; i ++){
                            cardTemp += card.substr(i, 1) * arrInt[i];
                        }
                        valnum = arrCh[cardTemp % 11];
                        if(valnum == card.substr(17, 1)){
                            $('.legal_repre_idCard').parent().next('b').css('background','url(../dist/images/icon.png) -30px 0');
                            $('.legal_repre_idCard').parent().nextAll('strong').html('');
                            return true;
                        }
                        return false;
                    }
                    return false;
                };

                //15位转18位身份证号
                function changeFivteenToEighteen(card){
                    if(card.length == '15'){
                        var arrInt = new array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                        var arrCh = new array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
                        var cardTemp = 0, i;
                        card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6);
                        for(i = 0; i < 17; i ++){
                            cardTemp += card.substr(i, 1) * arrInt[i];
                        }
                        card += arrCh[cardTemp % 11];
                        $('.legal_repre_idCard').parent().next('b').css('background','url(../dist/images/icon.png) -30px 0');
                        $('.legal_repre_idCard').parent().next('strong').html('');
                        return card;
                    }
                    $('.legal_repre_idCard').parent().next('b').css('background','url(../dist/images/icon.png) -30px 0');
                    $('.legal_repre_idCard').parent().next('strong').html('');
                    return card;
                };
                $('.legal_repre_idCard').blur(function(){
                    if (!checkCard($(this).val())) {
                        $(this).parent().next('b').css('background','url(../dist/images/icon.png) -60px 0');
                        $(this).parent().next('strong').html('请输入正确的身份证号码');
                        return false;
                    }
                })



                //判断省市
                function CHpc(){
                    // $('.qyrz_select option:checked').val()=='请选择'
                    if($('#qyrz_province_detail option:checked').val()=='请选择省份'){
                        $('.qyrz-city strong').html('请选择省份');
                        $('#qyrz_province_detail').css('border','1px solid red');
                        $('.qyrz-city b').css('background','url(../dist/images/icon.png) -60px 0');
                        return false;
                    }else{
                        $('#qyrz_province_detail').css('border','');
                        if($('#qyrz_city_detail option:selected').val()=='请选择城市'){
                            $('.qyrz-city strong').html('请选择城市');
                            $('#qyrz_city_detail').css('border','1px solid red');
                            $('.qyrz-city b').css('background','url(../dist/images/icon.png) -60px 0');
                            return false;
                        }else{
                            $('.qyrz-city strong').html('');
                            $('#qyrz_city_detail').css('border','');
                            $('.qyrz-city b').css('background','url(../dist/images/icon.png) -30px 0');
                            return true;
                        }
                    }

                }
                $('.qyrz-city select').blur(function(){
                    CHpc();
                });

                //详细地址
                function qyrz_add(){
                    if($('.qyrz-add').val()==''){
                        $('.qyrz-add').css('border','1px solid red');
                        $('.qyrz-add').parent().next('b').css('background','url(../dist/images/icon.png) -60px 0');
                        $('.qyrz-add').parent().nextAll('strong').html('请输入详细地址');
                        return false;
                    }else{
                        $('.qyrz-add').css('border','');
                        $('.qyrz-add').parent().next('b').css('background','url(../dist/images/icon.png) -30px 0');
                        $('.qyrz-add').parent().nextAll('strong').html('');
                        return true;
                    }
                }
                $('.qyrz-add').blur(function () {
                    qyrz_add();
                });

                //开户银行
                function oBankT(){
                    if($('.oBank').val()==''){
                        $('.oBank').css('border','1px solid red');
                        $('.oBank').parent().next('b').css('background','url(../dist/images/icon.png) -60px 0');
                        $('.oBank').parent().nextAll('strong').html('请输入开户银行');
                        return false;
                    }else{
                        $('.oBank').css('border','');
                        $('.oBank').parent().next('b').css('background','url(../dist/images/icon.png) -30px 0');
                        $('.oBank').parent().nextAll('strong').html('');
                        return true;
                    }
                }

                $('.oBank').blur(function () {
                    oBankT();
                });
                //银行账户
                function CheckBankNo() {
                    var bankCard = $('.bankAccount');
                    var bankno = bankCard.val();
                    if (bankno == '') {
                        $('.bankAccount').css('border','1px solid red');
                        $('.bankAccount').parent().next('b').css('background','url(../dist/images/icon.png) -60px 0')
                        $('.bankAccount').parent().nextAll('strong').html('请填写银行卡号');
                        // bankCard.focus();
                        return false;
                    }

                    if (16 > bankno.length || 19 < bankno.length) {
                        $('.bankAccount').css('border','1px solid red');
                        $('.bankAccount').parent().next('b').css('background','url(../dist/images/icon.png) -60px 0');
                        $('.bankAccount').parent().nextAll('strong').html('银行卡号长度应该在16位到19位之间');
                        // bankCard.focus();
                        return false;
                    }
                    var num = /^\d*$/; //全数字
                    if(!num.exec(bankno)) {
                        $('.bankAccount').css('border','1px solid red');
                        $('.bankAccount').parent().next('b').css('background','url(../dist/images/icon.png) -60px 0');
                        $('.bankAccount').parent().nextAll('strong').html('银行卡号必须全为数字');
                        // bankCard.focus();
                        return false;
                    }

                    //开头6位
                    var strBin = '10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99';

                    if(strBin.indexOf(bankno.substring(0, 2)) == -1) {
                        $('.bankAccount').css('border','1px solid red');
                        $('.bankAccount').parent().next('b').css('background','url(../dist/images/icon.png) -60px 0');
                        $('.bankAccount').parent().nextAll('strong').html('银行卡号开头6位不符合规范');
                        // bankCard.focus();
                        return false;
                    }
                    $('.bankAccount').css('border','');
                    $('.bankAccount').parent().next('b').css('background','url(../dist/images/icon.png) -30px 0');
                    $('.bankAccount').parent().nextAll('strong').html('');
                    return true;
                }
                $('.bankAccount').blur(function(){
                    CheckBankNo();
                });

                //注册资本
                function registerC(){
                    var reg = /^[0-9]+$/;
                    var str = $('.registeredCapital').val();
                    if($('.registeredCapital').val()==''){
                        $('.registeredCapital').css('border','1px solid red');
                        $('.registeredCapital').parent().next('b').css('background','url(../dist/images/icon.png) -60px 0');
                        $('.registeredCapital').parent().nextAll('strong').html('注册资本不能为空');
                        return false;
                    }else if(!reg.test(str)){
                        $('.registeredCapital').css('border','1px solid red');
                        $('.registeredCapital').parent().next('b').css('background','url(../dist/images/icon.png) -60px 0');
                        $('.registeredCapital').parent().nextAll('strong').html('注册资本只能输入数字');
                        return false;
                    }
                    else{
                        $('.registeredCapital').css('border','');
                        $('.registeredCapital').parent().next('b').css('background','url(../dist/images/icon.png) -30px 0');
                        $('.registeredCapital').parent().nextAll('strong').html('');
                        return true;
                    }
                }
                $('.registeredCapital').blur(function () {
                    registerC();
                });
                //成立日期
                function get_Date(){
                    if($('.date').val()==''){
                        $('.date').css('border','1px solid red');
                        $('.date').parent().next('b').css('background','url(../dist/images/icon.png) -60px 0');
                        $('.date').parent().nextAll('strong').html('成立日期不能为空');
                        return false;
                    }else{
                        $('.date').css('border','');
                        $('.date').parent().next('b').css('background','url(../dist/images/icon.png) -30px 0');
                        $('.date').parent().nextAll('strong').html('');
                        return true;
                    }
                }
                $('.date').blur(function () {
                    get_Date();
                });

                //企业类型
                function enterprise(){
                    if($('.qyrz_select option:checked').val()=='请选择'){
                        $('.qyrz_select').css('border','1px solid red');
                        $('.qyrz_select').parent().next('b').css('background','url(../dist/images/icon.png) -60px 0');
                        $('.qyrz_select').parent().nextAll('strong').html('请选择企业类型');
                        return false;
                    }else{
                        $('.qyrz_select').css('border','');
                        $('.qyrz_select').parent().next('b').css('background','url(../dist/images/icon.png) -30px 0');
                        $('.qyrz_select').parent().nextAll('strong').html('');
                        return true;
                    }
                }
                if(data.enterprise_nature!==''){
                    $('#qyrz_select_eqone').html(data.enterprise_nature);
                    $('#qyrz_select_eqone').val(data.enterprise_nature);
                    // enterprise();
                }else{
                    $('.qyrz_select').blur(function () {
                        enterprise();
                    });
                }

                //产品范围
                function product() {
                    if($('input:checkbox[name=\'range\']:checked').length > 0){
                        $('.product_range').next('b').css('background','url(../dist/images/icon.png) -30px 0');
                        $('.product_range').nextAll('strong').html('');
                        return true;
                    }else{
                        $('.product_range').next('b').css('background','url(../dist/images/icon.png) -60px 0');
                        $('.product_range').nextAll('strong').html('至少选择一种');
                        return false;
                    }
                }
                if(data.main_business!==''){
                    var test=data.main_business.split(',');
                    $('.product_range input[type=\'checkbox\']').each(function(){ 
                        for(var i=0;i<test.length;i++){
                            if(test[i]==$(this).val()){
                               $(this).prop('checked', true);
                            }
                        }
                    });
                }else{
                    $('.product_range input').blur(function () {
                        product();
                    });
                }

                //商业模式
                function commercial() {
                    if($('input:checkbox[name=\'model\']:checked').length > 0){
                        $('.commercial_model').next('b').css('background','url(../dist/images/icon.png) -30px 0');
                        $('.commercial_model').nextAll('strong').html('');
                        return true;
                    }else{
                        $('.commercial_model').next('b').css('background','url(../dist/images/icon.png) -60px 0');
                        $('.commercial_model').nextAll('strong').html('至少选择一种');
                        return false;
                    }
                }
                if(data.mgmt_model!==''){
                    var test=data.mgmt_model.split(',');
                    $('.commercial_model input[type=\'checkbox\']').each(function(){
                        for(var i=0;i<test.length;i++){
                            if(test[i]==$(this).val()){
                                $(this).prop('checked', true);
                            }
                        }
                    });
                }else{
                    $('.commercial_model input').blur(function () {
                        commercial();
                    });
                }
                //获取选中的产品范围的值
                function jqproduct(){ //jquery获取复选框值
                    var chk_product =[];
                    $('input[name="range"]:checked').each(function(){
                        chk_product.push($(this).val());
                    });
                    // console.log(chk_value);
                    return chk_product.toString();
                    // console.log(chk_product.toString());
                }
                //获取选中的商业模式的值
                function jqmodel() {
                    var chk_model =[];
                    $('input[name="model"]:checked').each(function(){
                        chk_model.push($(this).val());
                    });
                    // console.log(chk_value);
                    return chk_model.toString();
                    // console.log(chk_model.toString());
                }

                var certifi_type='';
                var certi='';
                var certit='';
                certi=$('.qyrz-dzhy').eq(0).next('span.certifi_type').text();
                $('.qyrz-dzhy').click(function(){
                    certi=$(this).next('span.certifi_type').text();
                    if($(this).index==0){
                        $('.fifteen_code').val('');
                        $('.qyrz-xydm').parent().find('strong').html('');
                        if($('.eighteen_code').val().length==0){
                            $('.eighteen_code').blur(function(){
                                certi = $(this).val();
                                console.log(certi);
                                credit_code();
                            })
                        }else{
                            certi = $('.eighteen_code').val();
                            alert(certi);
                            credit_code();
                        }

                    }else{
                        $('.eighteen_code').val('');
                        $('.qyrz-xydm').parent().find('strong').html('');
                        if($('.fifteen_code').val().length==0){
                            $('.fifteen_code').blur(function(){//当元素失去焦点时
                                certit = $(this).val();
                                console.log(certit);
                                regist_number();
                            })
                        }
                        else{
                            certit = $('.fifteen_code').val();
                            regist_number();
                        }
                    }
                });

                var cName='';
                if($('.qyrz_company_name').val()==''){
                    $('.qyrz_company_name').blur(function(){
                        cName=$(this).val();
                    });
                }else{
                    $('.qyrz_company_name').change(function () {
                        cName=$('.qyrz_company_name').val();
                    })
                    cName=$('.qyrz_company_name').val();
                }
                //法人代表
                var legal_pre = '';
                if($('.legal_repre').val()==''){
                    $('.legal_repre').blur(function(){
                        legal_pre=$(this).val();
                    });
                }else{
                    $('.legal_repre').change(function () {
                        legal_pre=$('.legal_repre').val();
                    })
                    legal_pre=$('.legal_repre').val();
                }
                //法人代表身份证
                var legal_pre_idCard = '';
                if($('.legal_repre_idCard').val()==''){
                    $('.legal_repre_idCard').blur(function(){
                        legal_pre_idCard=$(this).val();
                    });
                }else{
                    $('.legal_repre_idCard').change(function () {
                        legal_pre_idCard=$('.legal_repre_idCard').val();
                    })
                    legal_pre_idCard=$('.legal_repre_idCard').val();
                }

                //省份
                var pCity='';   //获取省代码
                var cCity='';  //获取市代码
                var cPro = new MilkT(city_province,1);
                cPro.send({})
                    .done(function(Data){
                        var Number='';
                        // console.log(Data);
                        var Province=Data.city;
                        for(var i=0;i<Province.length;i++){
                            if(data.province==Province[i].number){
                                data.province=Province[i].name;
                                 Number=Province[i].number;
                            }
                        }
                        $('#qyrz_province_detail').eq(0).html('<option value='+Number+'>'+data.province+'</option>');

                            var compiled = _.template('<% _.forEach(pCity, function(pdata) { \
                                    %>\
                                    <option value=<%= pdata.number %> title=<%= pdata.name%> ><%=pdata.name%></option>\
                                    <% \
                                    }); %>');
                        var qyrz_pro = compiled({'pCity':Data.city});
                        $('#qyrz_province_detail').append(qyrz_pro);
                        if(Number!==''){
                            pCity=Number;
                            var cCro = new MilkT(city_city,1)
                            $('#qyrz_city_detail option:not(:first-of-type)').remove();
                            cCro.send({pid:pCity})
                                .done(function(DaTa){
                                    var CCity='';
                                    var City=DaTa.city;
                                    for(var i=0;i<City.length;i++){
                                        if(data.city==City[i].number){
                                            data.city=City[i].name;
                                            CCity=City[i].number;
                                        }
                                    }
                                    $('#qyrz_city_detail').eq(0).html('<option value='+CCity+'>'+data.city+'</option>');
                                    var compiled = _.template('<% _.forEach(cCity, function(pdata) { \
                                                %>\
                                                <option value=<%=pdata.number%> title=<%=pdata.name%>><%=pdata.name%></option>\
                                                <% \
                                                }); %>');
                                    var qyrz_pro = compiled({'cCity':DaTa.city});
                                    $('#qyrz_city_detail').append(qyrz_pro);
                                    cCity=CCity;
                                    $('#qyrz_city_detail').change(function(){
                                        cCity=$(this).val();
                                        // console.log(cCity);
                                    })
                                })
                        }
                        else{
                            $('#qyrz_province_detail').change(function(){
                                pCity=$(this).val();
                                // console.log(pCity);
                                //城市
                                var cCro = new MilkT(city_city,1)
                                $('#qyrz_city_detail option:not(:first-of-type)').remove();
                                cCro.send({pid:pCity})
                                    .done(function(DaTa){
                                        // console.log(DaTa);
                                        var compiled = _.template('<% _.forEach(cCity, function(pdata) { \
                                                %>\
                                                <option value=<%=pdata.number%> title=<%=pdata.name%>><%=pdata.name%></option>\
                                                <% \
                                                }); %>');
                                        var qyrz_pro = compiled({'cCity':DaTa.city});
                                        $('#qyrz_city_detail').append(qyrz_pro);
                                        $('#qyrz_city_detail').change(function(){
                                            cCity=$(this).val();
                                            // console.log(cCity);
                                        })
                                    })
                            })
                        }



                    });
                //注册电话
                var regist_N = '';
                if($('.regist_number').val()==''){
                    $('.regist_number').blur(function(){
                        regist_N=$(this).val();
                    })
                }
                else{
                    $('.regist_number').change(function () {
                        regist_N=$('.regist_number').val();
                    })
                    regist_N=$('.regist_number').val();
                }
                //开户银行
                var oBank = '';
                if($('.oBank').val()==''){
                    $('.oBank').blur(function(){
                        oBank = $(this).val();
                    })
                }
                else{
                    $('.oBank').change(function () {
                        oBank = $('.oBank').val();
                        $('.oBank').blur(function(){
                            oBank = $(this).val();
                        })
                    })
                    oBank = $('.oBank').val();
                }
                //银行账户
                var bank_account='';
                if($('.bankAccount').val()==''){
                    $('.bankAccount').blur(function(){
                        bank_account=$(this).val();
                    })
                }
                else{
                    $('.bankAccount').change(function () {
                        bank_account=$('.bankAccount').val();
                    })
                    bank_account=$('.bankAccount').val();
                }
                //认证中的提交按钮
                $('#load_submit').click(function(){

                    if(certi=='多证合一营业执照'){
                        credit_code();
                        certifi_type=1;
                    }else{
                        regist_number();
                        certifi_type=2;
                    }
                    // console.log(regist_N);
                    // console.log(oBank);
                    // console.log(bank_account);
                    if(qyrz_CName()&&legal_repre()&&checkCard($('.legal_repre_idCard').val())&&CHpc()&&qyrz_add()&&oBankT()&&CheckBankNo()&&registerC()&&get_Date()&&enterprise()&&product()&&commercial()){
                        // var uCode = store.get('usercode');
                        var enQu = new MilkT(enterpriseQu,3);
                        enQu.send({
                            usercode:uCode,
                            document_type:certifi_type,
                            licence_url:$('.yYimg').val(),
                            unified_code: $('.eighteen_code').val(),
                            register_code:$('.fifteen_code').val(),
                            company_name:cName,
                            legalperson:legal_pre,
                            legalperson_code:legal_pre_idCard,
                            province:pCity,
                            city:cCity,
                            address:$('.qyrz-add').val(),
                            phone_number:regist_N,
                            open_bank:oBank,
                            bank_account:bank_account,
                            coabook:$('.hTimg').val(),
                            enterprise_nature:$('.qyrz_select').val(),
                            registered_capital:$('.registeredCapital').val(),
                            founding_time:$('.date').val(),
                            mgmt_model:jqmodel(),
                            main_business:jqproduct()
                        })
                            .done(function(data){
                                if(data.value==1){
                                    window.location.href='qygl.html';
                                }
                            })
                    }
                });
                //认证中的取消按钮
                $('#load_cancle').on('click',function () {
                    window.location.href='qygl.html';
                });

            }
            //未认证
            else if(data.apply_status=='4'){
                var template_qyrz_right = $('#lefang-qyrz-right').text();
                var templateFn_qyrz_right = _.template(template_qyrz_right);
                $('.qygl-right').append(templateFn_qyrz_right);
                //证件类型的切换
                $('.qyrz-zch').hide();
                $('.qyrz-dzhy').click(function(){
                    $('.qyrz-xydm').show();
                    $('.qyrz-zch').hide();
                })
                $('.qyrz-yzcm').click(function(){
                    $('.qyrz-xydm').hide();
                    $('.qyrz-zch').show();
                })
                $('.qyrz-yzfilebtn').click(function(){
                    layerWin('r_uploadFile.html','上传营业执照');
                });
                $('.qyrz-yzfilebtnT').click(function(){
                    layerWin('r_uploadFile.html','上传认证授权书');
                });

                //下载认证授权书模板(在新窗口中打开)
                $('#down').on('click',function () {
                    window.open(
                        'qyrz_authorization.html',
                        'newwindow',
                        'height=100,width=600,height=450,top=250,left=600,toolbar=no,menubar=no,scrollbars=no,resizable=yes,location=no, status=no'
                    )
                });

                //判断认证授权书的值
                function Certificate() {
                    if($('.qyrz_img').attr('src')=='images/rzsq.png'){
                        $('.qyrz-rzsq').next('b').css('background','url(../dist/images/icon.png) -60px 0');
                        $('.qyrz-rzsq').nextAll('strong').html('请上传企业认证授权书');
                    }
                    else{
                        $('.qyrz-rzsq').next('b').css('background','url(../dist/images/icon.png) -30px 0');
                        $('.qyrz-rzsq').nextAll('strong').html(' ');
                    }
                }
                $('.eighteen_code').focus(function () {
                    Certificate();
                })
                $('.fifteen_code').focus(function () {
                    Certificate();
                })

                //判断营业执照的值
                function Licence() {
                    if($('.yyzz_img').attr('src')=='images/yyzz.png'){
                        $('.yyzz').next('b').css('background','url(../dist/images/icon.png) -60px 0');
                        $('.yyzz').nextAll('strong').html('请上传营业执照');
                    }
                    else{
                        $('.yyzz').next('b').css('background','url(../dist/images/icon.png) -30px 0');
                        $('.yyzz').nextAll('strong').html('');
                    }
                }
                $('.qyrz_company_name').focus(function () {
                    Licence();
                })



                //统一社会信用代码、注册号
                function credit_code(){
                    if($('.eighteen_code').val().length!=18){
                        $('.eighteen_code').css('border','1px solid red');
                        $('.qyrz-xydm').parent().find('b').css('background','url(../dist/images/icon.png) -60px 0');
                        $('.qyrz-xydm').parent().find('strong').html('请填写正确的18位信用代码');
                        return false;
                    }else{
                        $('.eighteen_code').css('border','');
                        $('.qyrz-xydm').parent().find('b').css('background','url(../dist/images/icon.png) -30px 0');
                        // $('.qyrz-xydm').parent().find('strong').css('color','#11CD6D');
                        $('.qyrz-xydm').parent().find('strong').html('');
                    }
                }
                $('.eighteen_code').blur(function(){
                    $('.fifteen_code').val('');
                    credit_code();
                })

                function regist_number(){
                    if($('.fifteen_code').val().length!=15){
                        $('.fifteen_code').css('border','1px solid red');
                        $('.qyrz-xydm').parent().find('b').css('background','url(../dist/images/icon.png) -60px 0');
                        $('.qyrz-xydm').parent().find('strong').html('请填写15位的注册号');
                        return false;
                    }else{
                        $('.fifteen_code').css('border','');
                        $('.qyrz-xydm').parent().find('b').css('background','url(../dist/images/icon.png) -30px 0');
                        $('.qyrz-xydm').parent().find('strong').html('');
                    }
                }
                $('.fifteen_code').blur(function(){
                    $('.eighteen_code').val('');
                    regist_number();
                })

                //企业名称
                function qyrz_CName(){
                    if($('.qyrz_company_name').val()==''){
                        $('.qyrz_company_name').css('border','1px solid red');
                        $('.qyrz_company_name').parent().next('b').css('background','url(../dist/images/icon.png) -60px 0');
                        $('.qyrz_company_name').parent().nextAll('strong').html('请输入企业名称');
                        return false;
                    }else{
                        $('.qyrz_company_name').css('border','');
                        $('.qyrz_company_name').parent().next('b').css('background','url(../dist/images/icon.png) -30px 0');
                        $('.qyrz_company_name').parent().nextAll('strong').html('');
                        return true;
                    }
                }
                //    当企业名称失去焦点时调用
                $('.qyrz_company_name').blur(function () {
                    qyrz_CName();
                })
                //法人代表
                function legal_repre(){
                    if($('.legal_repre').val()==''){
                        $('.legal_repre').css('border','1px solid red');
                        $('.legal_repre').parent().next('b').css('background','url(../dist/images/icon.png) -60px 0');
                        $('.legal_repre').parent().nextAll('strong').html('请输入法人代表');
                        return false;
                    }else{
                        $('.legal_repre').css('border','');
                        $('.legal_repre').parent().next('b').css('background','url(../dist/images/icon.png) -30px 0');
                        $('.legal_repre').parent().nextAll('strong').html('');
                        return true;
                    }
                }
                //当法人代表失去焦点时
                $('.legal_repre').blur(function () {
                    legal_repre();
                })

                //身份证检验
                var vcity={ 11:'北京',12:'天津',13:'河北',14:'山西',15:'内蒙古',
                    21:'辽宁',22:'吉林',23:'黑龙江',31:'上海',32:'江苏',
                    33:'浙江',34:'安徽',35:'福建',36:'江西',37:'山东',41:'河南',
                    42:'湖北',43:'湖南',44:'广东',45:'广西',46:'海南',50:'重庆',
                    51:'四川',52:'贵州',53:'云南',54:'西藏',61:'陕西',62:'甘肃',
                    63:'青海',64:'宁夏',65:'新疆',71:'台湾',81:'香港',82:'澳门',91:'国外'
                };

                function checkCard(card){
                    //是否为空
                    if(!card||!isCardNo(card)||!checkProvince(card)||!checkBirthday(card)||!checkParity(card)){
                        $('.legal_repre_idCard').parent().next('b').css('background','url(../dist/images/icon.png) -60px 0');
                        $('.legal_repre_idCard').parent().nextAll('strong').html('请输入正确的身份证号码');
                        // jQuery(".sf_list").focus();
                        return false;
                    }
                    $('.legal_repre_idCard').parent().next('b').css('background','url(../dist/images/icon.png) -30px 0');
                    $('.legal_repre_idCard').parent().nextAll('strong').html('');
                    return true;
                };


                //检查身份证号码是否符合规范，包括长度，类型
                function isCardNo(card){
                    //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
                    var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
                    if(reg.test(card) === false){
                        return false;
                    }
                    $('.legal_repre_idCard').parent().next('b').css('background','url(../dist/images/icon.png) -30px 0');
                    $('.legal_repre_idCard').parent().nextAll('strong').html('');
                    return true;
                };

                //取身份证前两位,校验省份
                function checkProvince(card){
                    var province = card.substr(0,2);
                    if(vcity[province] == undefined) {
                        return false;
                    }
                    $('.legal_repre_idCard').parent().next('b').css('background','url(../dist/images/icon.png) -30px 0');
                    $('.legal_repre_idCard').parent().nextAll('strong').html('');
                    return true;
                };

                //检查生日是否正确
                function checkBirthday(card){
                    var len = card.length;
                    //身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
                    if(len == '15'){
                        var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
                        var arr_data = card.match(re_fifteen);
                        var year = arr_data[2];
                        var month = arr_data[3];
                        var day = arr_data[4];
                        var birthday = new Date('19'+year+'/'+month+'/'+day);
                        return verifyBirthday('19'+year,month,day,birthday);
                    }
                    //身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
                    if(len == '18'){
                        var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
                        var arr_data = card.match(re_eighteen);
                        var year = arr_data[2];
                        var month = arr_data[3];
                        var day = arr_data[4];
                        var birthday = new Date(year+'/'+month+'/'+day);
                        return verifyBirthday(year,month,day,birthday);
                    }
                    return false;
                };

                //校验日期
                function verifyBirthday(year,month,day,birthday){
                    var now = new Date();
                    var now_year = now.getFullYear();
                    //年月日是否合理
                    if(birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day){
                        //判断年份的范围（3岁到100岁之间)
                        var time = now_year - year;
                        if(time >= 3 && time <= 100)
                        {
                            $('.legal_repre_idCard').parent().next('b').css('background','url(../dist/images/icon.png) -30px 0');
                            $('.legal_repre_idCard').parent().nextAll('strong').html('');
                            return true;
                        }
                        return false;
                    }
                    return false;
                };

                //校验位的检测
                function checkParity(card){
                    //15位转18位
                    card = changeFivteenToEighteen(card);
                    var len = card.length;
                    if(len == '18'){
                        var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                        var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
                        var cardTemp = 0, i, valnum;
                        for(i = 0; i < 17; i ++){
                            cardTemp += card.substr(i, 1) * arrInt[i];
                        }
                        valnum = arrCh[cardTemp % 11];
                        if(valnum == card.substr(17, 1)){
                            $('.legal_repre_idCard').parent().next('b').css('background','url(../dist/images/icon.png) -30px 0');
                            $('.legal_repre_idCard').parent().nextAll('strong').html('');
                            return true;
                        }
                        return false;
                    }
                    return false;
                };

                //15位转18位身份证号
                function changeFivteenToEighteen(card){
                    if(card.length == '15'){
                        var arrInt = new array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                        var arrCh = new array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
                        var cardTemp = 0, i;
                        card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6);
                        for(i = 0; i < 17; i ++){
                            cardTemp += card.substr(i, 1) * arrInt[i];
                        }
                        card += arrCh[cardTemp % 11];
                        $('.legal_repre_idCard').parent().next('b').css('background','url(../dist/images/icon.png) -30px 0');
                        $('.legal_repre_idCard').parent().next('strong').html('');
                        return card;
                    }
                    $('.legal_repre_idCard').parent().next('b').css('background','url(../dist/images/icon.png) -30px 0');
                    $('.legal_repre_idCard').parent().next('strong').html('');
                    return card;
                };
                $('.legal_repre_idCard').blur(function(){
                    if (!checkCard($(this).val())) {
                        $(this).parent().next('b').css('background','url(../dist/images/icon.png) -60px 0');
                        $(this).parent().next('strong').html('请输入正确的身份证号码');
                        return false;
                    }
                })



                //判断省市
                function CHpc(){
                    // $('.qyrz_select option:checked').val()=='请选择'
                    if($('#qyrz_province option:checked').val()=='请选择省份'){
                        $('.qyrz-city strong').html('请选择省份');
                        $('#qyrz_province').css('border','1px solid red');
                        $('.qyrz-city b').css('background','url(../dist/images/icon.png) -60px 0');
                        return false;
                    }else{
                        $('#qyrz_province').css('border','');
                        if($('#qyrz_city option:selected').val()=='请选择城市'){
                            $('.qyrz-city strong').html('请选择城市');
                            $('#qyrz_city').css('border','1px solid red');
                            $('.qyrz-city b').css('background','url(../dist/images/icon.png) -60px 0');
                            return false;
                        }else{
                            $('.qyrz-city strong').html('');
                            $('#qyrz_city').css('border','');
                            $('.qyrz-city b').css('background','url(../dist/images/icon.png) -30px 0');
                            return true;
                        }
                    }

                }
                $('.qyrz-city select').blur(function(){
                    CHpc();
                })

                //详细地址
                function qyrz_add(){
                    if($('.qyrz-add').val()==''){
                        $('.qyrz-add').css('border','1px solid red');
                        $('.qyrz-add').parent().next('b').css('background','url(../dist/images/icon.png) -60px 0');
                        $('.qyrz-add').parent().nextAll('strong').html('请输入详细地址');
                        return false;
                    }else{
                        $('.qyrz-add').css('border','');
                        $('.qyrz-add').parent().next('b').css('background','url(../dist/images/icon.png) -30px 0');
                        $('.qyrz-add').parent().nextAll('strong').html('');
                        return true;
                    }
                }
                $('.qyrz-add').blur(function () {
                    qyrz_add();
                })
                //注册电话

                // function checkregist(){
                //     var testLinkTel =$('.regist_number').val();
                //     var regLinkTel = /^(0|86|17951)?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;
                //     var resultLinkTel = regLinkTel.test(testLinkTel);
                //     if (!resultLinkTel || resultLinkTel == '') {
                //     $('.regist_number').css('border','1px solid red');
                //         // $('.qyrz_smile').css('background','url("../scripts/skin/default/icon.png") -60px 0')
                //     $('.regist_number').next('strong').html('请输入正确的手机号');
                //     } else {
                //     $('.regist_number').css('border','');
                //         // $('.qyrz_smile').css('background','url("../scripts/skin/default/icon.png") -30px 0')
                //     $('.regist_number').next('strong').html('');
                //     return true;
                //     }
                // }

                //开户银行
                function oBankT(){
                    if($('.oBank').val()==''){
                        $('.oBank').css('border','1px solid red');
                        $('.oBank').parent().next('b').css('background','url(../dist/images/icon.png) -60px 0');
                        $('.oBank').parent().nextAll('strong').html('请输入开户银行');
                        return false;
                    }else{
                        $('.oBank').css('border','');
                        $('.oBank').parent().next('b').css('background','url(../dist/images/icon.png) -30px 0');
                        $('.oBank').parent().nextAll('strong').html('');
                        return true;
                    }
                }

                $('.oBank').blur(function () {
                    oBankT();
                })
                //银行账户
                function CheckBankNo() {
                    var bankCard = $('.bankAccount');
                    var bankno = bankCard.val();
                    if (bankno == '') {
                        $('.bankAccount').css('border','1px solid red');
                        $('.bankAccount').parent().next('b').css('background','url(../dist/images/icon.png) -60px 0')
                        $('.bankAccount').parent().nextAll('strong').html('请填写银行卡号');
                        // bankCard.focus();
                        return false;
                    }

                    if (16 > bankno.length || 19 < bankno.length) {
                        $('.bankAccount').css('border','1px solid red');
                        $('.bankAccount').parent().next('b').css('background','url(../dist/images/icon.png) -60px 0');
                        $('.bankAccount').parent().nextAll('strong').html('银行卡号长度应该在16位到19位之间');
                        // bankCard.focus();
                        return false;
                    }
                    var num = /^\d*$/; //全数字
                    if(!num.exec(bankno)) {
                        $('.bankAccount').css('border','1px solid red');
                        $('.bankAccount').parent().next('b').css('background','url(../dist/images/icon.png) -60px 0');
                        $('.bankAccount').parent().nextAll('strong').html('银行卡号必须全为数字');
                        // bankCard.focus();
                        return false;
                    }

                    //开头6位
                    var strBin = '10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99';

                    if(strBin.indexOf(bankno.substring(0, 2)) == -1) {
                        $('.bankAccount').css('border','1px solid red');
                        $('.bankAccount').parent().next('b').css('background','url(../dist/images/icon.png) -60px 0');
                        $('.bankAccount').parent().nextAll('strong').html('银行卡号开头6位不符合规范');
                        // bankCard.focus();
                        return false;
                    }
                    $('.bankAccount').css('border','');
                    $('.bankAccount').parent().next('b').css('background','url(../dist/images/icon.png) -30px 0');
                    $('.bankAccount').parent().nextAll('strong').html('');
                    return true;
                }
                $('.bankAccount').blur(function(){
                    CheckBankNo();
                })

                //注册资本
                function registerC(){
                    var reg = /^[0-9]+$/;
                    var str = $('.registeredCapital').val();
                    if($('.registeredCapital').val()==''){
                        $('.registeredCapital').css('border','1px solid red');
                        $('.registeredCapital').parent().next('b').css('background','url(../dist/images/icon.png) -60px 0');
                        $('.registeredCapital').parent().nextAll('strong').html('注册资本不能为空');
                        return false;
                    }else if(!reg.test(str)){
                        $('.registeredCapital').css('border','1px solid red');
                        $('.registeredCapital').parent().next('b').css('background','url(../dist/images/icon.png) -60px 0');
                        $('.registeredCapital').parent().nextAll('strong').html('注册资本只能输入数字');
                        return false;
                    }
                    else{
                        $('.registeredCapital').css('border','');
                        $('.registeredCapital').parent().next('b').css('background','url(../dist/images/icon.png) -30px 0');
                        $('.registeredCapital').parent().nextAll('strong').html('');
                        return true;
                    }
                }
                $('.registeredCapital').blur(function () {
                    registerC();
                })
                //成立日期
                function get_Date(){
                    if($('.date').val()==''){
                        $('.date').css('border','1px solid red');
                        $('.date').parent().next('b').css('background','url(../dist/images/icon.png) -60px 0');
                        $('.date').parent().nextAll('strong').html('成立日期不能为空');
                        return false;
                    }else{
                        $('.date').css('border','');
                        $('.date').parent().next('b').css('background','url(../dist/images/icon.png) -30px 0');
                        $('.date').parent().nextAll('strong').html('');
                        return true;
                    }
                }
                $('.date').blur(function () {
                    get_Date();
                })

                //企业类型
                function enterprise() {
                    if($('.qyrz_select option:checked').val()=='请选择'){
                        $('.qyrz_select').css('border','1px solid red');
                        $('.qyrz_select').parent().next('b').css('background','url(../dist/images/icon.png) -60px 0');
                        $('.qyrz_select').parent().nextAll('strong').html('请选择企业类型');
                        return false;
                    }else{
                        $('.qyrz_select').css('border','');
                        $('.qyrz_select').parent().next('b').css('background','url(../dist/images/icon.png) -30px 0');
                        $('.qyrz_select').parent().nextAll('strong').html('');
                        return true;
                    }
                }
                $('.qyrz_select').blur(function () {
                    enterprise();
                })
                //产品范围
                function product() {
                    if($('input:checkbox[name=\'range\']:checked').length > 0){
                        $('.product_range').next('b').css('background','url(../dist/images/icon.png) -30px 0');
                        $('.product_range').nextAll('strong').html('');
                        return true;
                    }else{
                        $('.product_range').next('b').css('background','url(../dist/images/icon.png) -60px 0');
                        $('.product_range').nextAll('strong').html('至少选择一种');
                        return false;
                    }
                }
                $('.product_range input').blur(function () {
                    product();
                })
                //商业模式
                function commercial() {
                    if($('input:checkbox[name=\'model\']:checked').length > 0){
                        $('.commercial_model').next('b').css('background','url(../dist/images/icon.png) -30px 0');
                        $('.commercial_model').nextAll('strong').html('');
                        return true;
                    }else{
                        $('.commercial_model').next('b').css('background','url(../dist/images/icon.png) -60px 0');
                        $('.commercial_model').nextAll('strong').html('至少选择一种');
                        return false;
                    }
                }
                $('.commercial_model input').blur(function () {
                    commercial();
                })

                //获取选中的产品范围的值
                function jqproduct(){ //jquery获取复选框值
                    var chk_product =[];
                    $('input[name="range"]:checked').each(function(){
                        chk_product.push($(this).val());
                    });
                    // console.log(chk_value);
                    return chk_product.toString();
                    // console.log(chk_product.toString());
                }
                //获取选中的商业模式的值
                function jqmodel() {
                    var chk_model =[];
                    $('input[name="model"]:checked').each(function(){
                        chk_model.push($(this).val());
                    });
                    // console.log(chk_value);
                    return chk_model.toString();
                    // console.log(chk_model.toString());
                }

                var certifi_type='';
                var certi='';
                var certit='';
                certi=$('.qyrz-dzhy').eq(0).next('span.certifi_type').text();
                $('.qyrz-dzhy').click(function(){
                    certi=$(this).next('span.certifi_type').text();
                    if($(this).index==0){
                        $('.fifteen_code').val('');
                        $('.qyrz-xydm').parent().find('strong').html('');
                        $('.eighteen_code').blur(function(){
                            certi = $(this).val();
                            console.log(certi);
                            credit_code();
                            // console.log($(this).val().length);
                        })
                    }else{
                        $('.eighteen_code').val('');
                        $('.qyrz-xydm').parent().find('strong').html('');
                        $('.fifteen_code').blur(function(){//当元素失去焦点时
                            certit = $(this).val();
                            // console.log(certit);
                            regist_number();
                        })
                    }
                });

                var cName='';
                $('.qyrz_company_name').blur(function(){
                    cName=$(this).val();
                });
                var legal_pre = '';
                $('.legal_repre').blur(function(){
                    legal_pre=$(this).val();
                });
                var legal_pre_idCard = '';
                $('.legal_repre_idCard').blur(function(){
                    legal_pre_idCard=$(this).val();
                });

                //省份
                var pCity='';   //获取省代码
                var cCity='';  //获取市代码
                var cPro = new MilkT(city_province,1);
                cPro.send({})
                    .done(function(data){
                        // console.log(data);
                        var compiled = _.template('<% _.forEach(pCity, function(pdata) { \
                                    %>\
                                    <option value=<%= pdata.number %> title=<%= pdata.name%>><%=pdata.name%></option>\
                                    <% \
                                    }); %>');
                        var qyrz_pro = compiled({'pCity':data.city});
                        $('#qyrz_province').append(qyrz_pro);
                        $('#qyrz_province').change(function(){
                            pCity=$(this).val();
                            // console.log(pCity);

                            //城市
                            var cCro = new MilkT(city_city,1)
                            $('#qyrz_city option:not(:first-of-type)').remove();
                            cCro.send({pid:pCity})
                                .done(function(data){
                                    // console.log(data);
                                    var compiled = _.template('<% _.forEach(cCity, function(pdata) { \
                                                %>\
                                                <option value=<%=pdata.number%> title=<%=pdata.name%>><%=pdata.name%></option>\
                                                <% \
                                                }); %>');
                                    var qyrz_pro = compiled({'cCity':data.city});
                                    $('#qyrz_city').append(qyrz_pro);
                                    $('#qyrz_city').change(function(){
                                        cCity=$(this).val();
                                        // console.log(cCity);
                                    })
                                })
                        })


                    });

                var regist_N = '';
                $('.regist_number').blur(function(){
                    regist_N=$(this).val();
                });

                var oBank = '';
                $('.oBank').blur(function(){
                    oBank = $(this).val();
                });

                var bank_account='';
                $('.bankAccount').blur(function(){
                    bank_account=$(this).val();
                });


                //提交按钮
                $('#sub_audit').click(function(){
                    // alert($('.hTimg').val());
                    // alert($('.yYimg').val());
                    if(certi=='多证合一营业执照'){
                        credit_code();
                        certifi_type=1;
                    }else{
                        regist_number();
                        certifi_type=2;
                    }
                    // console.log(certifi_type);
                    if(qyrz_CName()&&legal_repre()&&checkCard($('.legal_repre_idCard').val())&&CHpc()&&qyrz_add()&&oBankT()&&CheckBankNo()&&registerC()&&get_Date()&&enterprise()&&commercial()&&product()){
                        // var uCode = store.get('usercode');
                        // console.log(uCode);
                        // console.log(certifi_type);
                        // console.log($('.yYimg').val());
                        // console.log($('.eighteen_code').val());
                        // console.log(certit);
                        // console.log(cName);
                        // console.log(legal_pre);
                        // console.log(legal_pre_idCard);
                        // console.log(pCity);
                        // console.log(cCity);
                        // console.log($('.qyrz-add').val());
                        // console.log(regist_N);
                        // console.log(oBank);
                        // console.log(bank_account);
                        // console.log($('.hTimg').val());
                        // console.log($('.registeredCapital').val());
                        // console.log($('.date').val());
                        // console.log($('.qyrz_select').val());
                        // console.log(jqproduct());
                        // console.log(jqmodel());
                        var enQu = new MilkT(enterpriseQu,3);
                        enQu.send({
                            usercode:uCode,
                            document_type:certifi_type,
                            licence_url:$('.yYimg').val(),
                            unified_code: $('.eighteen_code').val(),
                            register_code:$('.fifteen_code').val(),
                            company_name:cName,
                            legalperson:legal_pre,
                            legalperson_code:legal_pre_idCard,
                            province:pCity,
                            city:cCity,
                            address:$('.qyrz-add').val(),
                            phone_number:regist_N,
                            open_bank:oBank,
                            bank_account:bank_account,
                            coabook:$('.hTimg').val(),
                            enterprise_nature:$('.qyrz_select').val(),
                            registered_capital:$('.registeredCapital').val(),
                            founding_time:$('.date').val(),
                            mgmt_model:jqmodel(),
                            main_business:jqproduct()
                        })
                            .done(function(data){
                                // console.log(data);
                                // console.log(data.value);
                                if(data.value==1){
                                    // alert('提交成功');
                                    window.location.href='qygl.html';
                                }
                            })
                    }
                    // credit_code();
                    // regist_number();
                    // qyrz_CName();
                    // legal_repre();
                    // legal_repre_idCard();
                    // CHpc();
                    // qyrz_add();
                    // checkregist();
                    // oBankT();
                    // CheckBankNo();
                });
                //取消按钮的点击事件
                $('#cal_audit').on('click',function () {
                    window.location.href='qygl.html';
                    // parent.window.location.reload();
                    // var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
                    // parent.layer.close(index);
                });

            }
        });



    // // $('.uploadFile-all').hide();
    // // $('.uploadFile-allT').hide();
    // $('.qyrz-yzfilebtn').click(function(){
    //     // $('.uploadFile-all').show();
    //     layerWin('r_uploadFile.html','上传营业执照');
    //     // $('.yYimg').val(localStorage.getItem('img_url'));
    //     // $('.yYimg').val($('.yYimg').val().substr(1,$('.yYimg').val().length-2));
    // })
    // // $('.motaikO').click(function(){
    // //     $('.uploadFile-all').hide();
    // //     $('.yYimg').val(localStorage.getItem('img_url'));
    // //     $('.yYimg').val($('.yYimg').val().substr(1,$('.yYimg').val().length-2));
    // //     if($('.yYimg').val()!==''){
    // //         $('#yyzz').attr('src',$('.yYimg').val());
    // //     }
    // //     localStorage.removeItem('img_url');//清除localstorage里面的img_url
    // // })
    // // $('.uploadFile-allT').hide();
    // $('.qyrz-yzfilebtnT').click(function(){
    //     // $('.uploadFile-allT').show();
    //     layerWin('r_uploadFile.html','上传认证授权书');
    //     // $('.hTimg').val(localStorage.getItem('img_url'));
    //     // $('.hTimg').val($('.hTimg').val().substr(1,$('.hTimg').val().length-2));
    //
    // })
    // // $('.motaikT').click(function(){
    // //     $('.uploadFile-allT').hide();
    // //     $('.hTimg').val(localStorage.getItem('img_url'));
    // //     $('.hTimg').val($('.hTimg').val().substr(1,$('.hTimg').val().length-2));
    // //     if($('.hTimg').val()!==''){
    // //         $('#rzsqs').attr('src',$('.hTimg').val());
    // //     }
    // //     localStorage.removeItem('img_url');//清除localstorage里面的img_url
    // // })
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

    $('.qygl-left ul li.active img').attr('src','images/icon/企业信息管理_press.png');
    $('.qygl-left-con>ul>li').eq(1).mouseenter(function(){
        $(this).find('img').attr('src','images/icon/会员中心_press.png');
    }).mouseleave(function(){
        $(this).find('img').attr('src','images/icon/会员中心.png');
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
    })








});
//弹出上传照片的弹框
function layerWin(url,title){

    // layer.open({
    //     type: 2,
    //     title: false,
    //     closeBtn: false,
    //     shade: [0],
    //     area: ['340px', '215px'],
    //     offset:'rb', //右下角弹出
    //     time: 2000, //2秒后自动关闭
    //     shift: 2,
    //     content: [url, 'no'], //iframe的url，no代表不显示滚动条
    //     end: function(){ //此处用于演示
    //         layer.open({
    //             type: 2,
    //             title: title,
    //             shadeClose: true,
    //             shade: false,
    //             maxmin: true, //开启最大化最小化按钮
    //             area: ['1150px', '650px'],
    //             content: url
    //         });
    //     }
    // });
    layer.open({
        type: 2,
        title: title,
        shadeClose: true,
        shade: false,
        maxmin: true, //开启最大化最小化按钮
        area: ['666px', '500px'],
        content: url,
        success:function (layero,index) {},
        end: function() {
           if(title=='上传认证授权书'){
               $('.hTimg').val(localStorage.getItem('img_url'));
               $('.hTimg').val($('.hTimg').val().substr(1,$('.hTimg').val().length-2));
               if($('.hTimg').val()!==''){
                   $('#rzsqs').attr('src',$('.hTimg').val());
               }
               localStorage.removeItem('img_url');//清除localstorage里面的img_url
               if($('.hTimg').val()!==''){
                   layer.msg('添加成功！', {
                       icon: 1,
                       time: 2000 //2秒关闭（如果不配置，默认是3秒）
                   });
               }
           }
           else if(title=='上传营业执照'){
               $('.yYimg').val(localStorage.getItem('img_url'));
               $('.yYimg').val($('.yYimg').val().substr(1,$('.yYimg').val().length-2));
               if($('.yYimg').val()!==''){
                   $('#yyzz').attr('src',$('.yYimg').val());
               }
               localStorage.removeItem('img_url');//清除localstorage里面的img_url
               if($('.yYimg').val()!==''){
                   layer.msg('添加成功！', {
                       icon: 1,
                       time: 2000 //2秒关闭（如果不配置，默认是3秒）
                   });
               }
           }
        }
    });

}

function layerWin_Detail(url,title){

    // layer.open({
    //     type: 2,
    //     title: false,
    //     closeBtn: false,
    //     shade: [0],
    //     area: ['340px', '215px'],
    //     offset:'rb', //右下角弹出
    //     time: 2000, //2秒后自动关闭
    //     shift: 2,
    //     content: [url, 'no'], //iframe的url，no代表不显示滚动条
    //     end: function(){ //此处用于演示
    //         layer.open({
    //             type: 2,
    //             title: title,
    //             shadeClose: true,
    //             shade: false,
    //             maxmin: true, //开启最大化最小化按钮
    //             area: ['1150px', '650px'],
    //             content: url
    //         });
    //     }
    // });
    layer.open({
        type: 2,
        title: title,
        shadeClose: true,
        shade: false,
        maxmin: true, //开启最大化最小化按钮
        area: ['666px', '500px'],
        content: url,
        success:function (layero,index) {},
        end: function() {
            if(title=='上传认证授权书'){
                $('.hTimg').val(localStorage.getItem('img_url'));
                $('.hTimg').val($('.hTimg').val().substr(1,$('.hTimg').val().length-2));
                if($('.hTimg').val()!==''){
                    $('#rzsqs_detail').attr('src',$('.hTimg').val());
                }
                localStorage.removeItem('img_url');//清除localstorage里面的img_url
                if($('.hTimg').val()!==''){
                    layer.msg('添加成功！', {
                        icon: 1,
                        time: 2000 //2秒关闭（如果不配置，默认是3秒）
                    });
                }
            }
            else if(title=='上传营业执照'){
                $('.yYimg').val(localStorage.getItem('img_url'));
                $('.yYimg').val($('.yYimg').val().substr(1,$('.yYimg').val().length-2));
                if($('.yYimg').val()!==''){
                    $('#yyzz_detail').attr('src',$('.yYimg').val());
                }
                localStorage.removeItem('img_url');//清除localstorage里面的img_url
                if($('.yYimg').val()!==''){
                    layer.msg('添加成功！', {
                        icon: 1,
                        time: 2000 //2秒关闭（如果不配置，默认是3秒）
                    });
                }
            }
        }
    });

}

window.onload=function () {
    $('#pickdate').dateDropper({
        animate: false,
        format: 'Y-m-d',
        maxYear: '2020'
    });
    $('.pickdate').dateDropper({
        animate: false,
        format: 'Y-m-d',
        maxYear: '2020'
    });

//     laydate({
//         elem: '#slsj', //对应id
//         format: 'YYYY-MM-DD', //日期格式 // 分隔符可以任意定义，该例子表示只显示年月
//         min: laydate.now(), //设定最小日期为当前日期
//         max: '2099-06-16', //最大日期
//         festival: true, //显示节日
//         istime: false,   //是否显示时分秒
//         istoday: true, //是否是今天
//         choose: function(datas){ //选择日期完毕的回调
//             //end.min = datas; //开始日选好后，重置结束日的最小日期
//             end.start = datas;//将结束日的初始值设定为开始日
//         }
//     });
//
};









