$(function(){

    /*渲染页面*/
    var template_address = $('#add_Box').text();
    var templateFn_address = _.template(template_address);
    $('#add_conent').append(templateFn_address);

    $('button').on('click',function(){
    	window.close();
    })

    
    $('#money').text(store.get('dk_money'));
    //$('#pro_name').text(store.get('pro_name'));
    var defaultAddress=store.get('defaultAddress');
    var address=defaultAddress.province+defaultAddress.city+defaultAddress.area+defaultAddress.address;
    $('#address').text(address);
    $('#phone').text(defaultAddress.phone_number);
    $('#postalCode').text(defaultAddress.postcodes);
})