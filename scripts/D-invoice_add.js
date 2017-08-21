

$(function(){

    var template_address = $('#add_Box').text();
    var templateFn_address = _.template(template_address);
    $('#add_conent').append(templateFn_address);


    //定义表单数据的对象
    var ssq={
        province:'',
        city:'',
        area:'',
        address:'',
        postalCode:'',
        name:'',
        phone:''
    };

    //获取省
    var stance = new MilkT(province, 3);
    stance.send({})
    .done(function(data){

        var province=data.city;
        var compiled = _.template('<% _.forEach(province, function(data) { %>\
                                <option value=<%= data.number %>><%= data.name %></option>\
                                <% }); %>');

        var templateTest=compiled({ 'province': province});
        $('#province').append(templateTest);
    })

    //选中某个省(当select的值发生改变时触发)
    $('#province').change(function(){
        getCity(Number($('#province option:selected').val()));
    })

    //获取城市
    function getCity(number){
        var stance = new MilkT(city, 3);
        stance.send({pid:number})
        .done(function(data){

            var cityArray=data.city;
            var compiled = _.template('<% _.forEach(cityArray, function(city) { %>\
                                    <option value=<%= city.number %>><%= city.name %></option>\
                                    <% }); %>');

            var templateTest=compiled({ 'cityArray': cityArray});
            $('#city').children().remove();
            $('#city').append(templateTest);
        })

        $('#city').change(function(){
            getArea(Number($('#city option:selected').val()));
        })
    }

    //获取区
    function getArea(number){
        var stance = new MilkT(area, 3);
        stance.send({pid:number})
        .done(function(data){

            var areaArray=data.city;
            var compiled = _.template('<% _.forEach(areaArray, function(area) { %>\
                                    <option><%= area.name %></option>\
                                    <% }); %>');

            var templateTest=compiled({ 'areaArray': areaArray});
            $('#area').children().remove();
            $('#area').append(templateTest);
        })
    }



    //错误提示
    $('.formData').on({
        'blur':function(){
            if(!$(this).val()){
                $(this).css('border','1px solid red');
            }
        },
        'focus':function(){
            $(this).css('border','1px solid darkgray');
        }
    })

    //验证手机号
    $('#phone').blur(function(){
        var myreg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/; 
        if(!myreg.test($('#phone').val())){ 
            alert('请输入有效的手机号码！'); 
            return false; 
        }
    })

    //验证地址
    $('#address').blur(function(){
        var myreg = /[^\x00-\xff]|[A-Za-z0-9_]/ig; 
        if(!myreg.test($('#address').val())){ 
            alert('输入的地址不合法'); 
            return false; 
        }
    })


    //验证邮政编码
    $('#postalCode').blur(function(){
        var myreg = /^[0-9][0-9]{5}$/; 
        if(!myreg.test($('#postalCode').val())) { 
            alert('邮政编码必须为6位数字'); 
            return false; 
        }
    })

    //验证姓名
    $('#name').blur(function(){
        var myreg = /^([\u4e00-\u9fa5]){2,7}$/; 
        if(!myreg.test($('#name').val())) { 
            alert('输入姓名不合法'); 
            return false; 
        }
    })

    


    //提交数据
    $('#commit').click(function(){
        ssq.province=$('#province option:selected').text();
        ssq.city=$('#city option:selected').text();
        ssq.area=$('#area option:selected').text();
        ssq.address=$('#address').val();
        ssq.postalCode=$('#postalCode').val();
        ssq.name=$('#name').val();
        ssq.phone=$('#phone').val();

        //遍历对象中所有属性
        function isOkinput(){
            for(var property in ssq){
              if(ssq[property]==''){
                alert('请将信息填写完整');
                return false;
              }
            }
        }

        //如果所有表单信息填写完整
        if(isOkinput()!=false){
            var stance = new MilkT(addInvoiceAdress, 3);
            stance.send({
              usercode:store.get('usercode'),
              username:ssq.name,
              province:ssq.province,
              city:ssq.city,
              area:ssq.area,
              address:ssq.address,
              phone_number:ssq.phone,
              status:'',
              postcodes:ssq.postalCode
            })
            .done(function(data){
                store.set('isCanDel',true);
                alert('数据提交成功');
                //console.log(data);
                window.close();
                self.opener.location.reload();//刷新父窗口 
            })
            .fail(function(){
                console.log('失败');
            })
        }

    })

    //单独调用设为默认接口进行设置
    // function setdefault(id){
    //     //是否设为默认
    //     var status;
    //     $('#setAddress:checked').val()=='on'?status='1':status='2';
    //     var stance = new MilkT(setInvoiceAddress, 3);
    //     stance.send({
    //         usercode:store.get('usercode'),
    //         status:status,
    //         id:id
    //     })
    //     .done(function(data){
    //         if(data.value==1){
    //             console.log('成功');
    //         }
    //     })
    //     .fail(function(){
    //         alert('失败');
    //     })
    // }


    $('#cancel').click(function(){
        window.close();
    })

})