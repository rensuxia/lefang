$(function(){
    var template_kjcs = $('#lefang-kjcs').text();
        var templateFn_kjcs = _.template(template_kjcs);
         $('#lefangtex-kjcs').append(templateFn_kjcs);
         console.log($('.state-progress .title').text());
     var uploadF = new MilkT(uploadFile,3)
    uploadF.send({file:$('.imgWrap img').attr('src'),file_name:$('.state-progress .title').text()})
    .done(function(data){
        // console.log()
        // var template = $('#lefang-kjcs').text();
        // var templateFn = _.template(template);
        //  $('#lefangtex-kjcs').append(templateFn);
        console.log(data);
    })
})