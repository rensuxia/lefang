$(function(){
    var enterPQriseApply = new MilkT(enterpriseQPrise,3)     
    enterPQriseApply.send({usercode:store.get('usercode')})
    .done(function(data){
        alert(data);
        if(data.value<=0){
            alert('企业尚未认证通过,请前往认证！');
            window.location.href='qyrz.html';
        }

    }).fail(function(){
        alert('企业尚未认证通过,请前往认证！');
        window.location.href='qyrz.html';
    })
})