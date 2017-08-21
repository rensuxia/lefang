$(function () {
    //页面渲染
    var template_lzj=$('#lefang_lzj').text();
    var templateFn_lzj=_.template(template_lzj);
    $('#lefangtex_lzj').append(templateFn_lzj);

    var conentBox=[];
    conentBox['box1']=$('.box1');
    conentBox['box2']=$('.box2');
    conentBox['box3']=$('.box3');

    $('.boxlzjli').click(function(){
        var id=$(this).attr('id');
        // console.log(id);
        $('.lzj_content_list').nextAll().css('display','none');
        $(conentBox[id]).css('display','block');
        $(this).addClass('active').siblings().removeClass('active');
    });
});
