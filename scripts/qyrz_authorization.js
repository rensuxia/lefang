$(function () {
    //渲染页面
    var template_top = $('#lefang_authorization').text();
    var templateFn_top = _.template(template_top);
    $('#lefangtex_authorization').append(templateFn_top);
})
