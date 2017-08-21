$(function () {
  var template_top = $('#lefang_top').text();
  var templateFn_top = _.template(template_top);
  $('#lefangtex-top').append(templateFn_top);

  var template_nav = $('#lefang_nav').text();
  var templateFn_nav = _.template(template_nav);
  $('#lefangtex-nav').append(templateFn_nav);

  var template_pay = $('#lefang_pay').text();
  var templateFn_pay = _.template(template_pay);
  $('#lefangtex-pay').append(templateFn_pay);

  var template_foot = $('#lefang_foot').text();
  var templateFn_foot = _.template(template_foot);
  $('#lefangtex-foot').append(templateFn_foot);
})

