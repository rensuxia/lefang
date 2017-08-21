/**
 * Created by Administrator on 2017/7/18 0018.
 */
$(function () {
    //页面渲染
    var template_lzj=$('#lefang_lzj').text();
    var templateFn_lzj=_.template(template_lzj);
    $('#lefangtex_lzj').append(templateFn_lzj);

    // var conentBox=[];
    // conentBox['box1']=$('#box1');
    // conentBox['box2']=$('#box2');
    // conentBox['box3']=$('#box3');
    //
    // $('.box').click(function(){
    //     console.log($(this));
    //     var id=$(this).attr('class');
    //     conentInvoices[id].css('display','none');
    //     conentInvoices[id].css('display','block');
    //     $(this).addClass("active").siblings().removeClass("active");
    // })

// <<<<<<< .mine
// ||||||| .r9106
//     $('.box').click(function(){
//         console.log($(this));
//         var id=$(this).attr('class');
//         conentInvoices[id].css('display','none');
//         conentInvoices[id].css('display','block');
//         $(this).addClass("active").siblings().removeClass("active");
//     })
// =======
//     $('.box').click(function(){
//         var id=$(this).attr('class');
//         conentInvoices[id].css('display','none');
//         conentInvoices[id].css('display','block');
//         $(this).addClass("active").siblings().removeClass("active");
//     })
// >>>>>>> .r9110

    $('.lzj_content_list li').click(function () {
        console.log(this);
        $(this).addClass('active').siblings().removeClass('active');
        // $('.lzj li').eq($(this).index()).addClass('active').siblings().removeClass('active');
        $('.lzj>div').hide();
        $('.lzj>div').eq($(this).index()).show();
    })

})
