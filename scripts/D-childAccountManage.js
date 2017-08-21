$(function(){
    var template_address = $('#childAccount_Box').text();
    var templateFn_address = _.template(template_address);
    $('#childAccount_conent').append(templateFn_address);

    /*点击弹窗*/
    $('#newAdd').click(function(){
      openfire();
    })

    function openfire(){
            window.open(
            'D-newChildAccount.html',
            'newwindow',
            'height=100,width=600,height=400,top=100,left=300,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no, status=no'
        )
    }

    
})

    


