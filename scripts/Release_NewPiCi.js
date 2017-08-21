$(function () {
  var template_top = $('#lefang_top').text();
  var templateFn_top = _.template(template_top);
  $('#lefangtex-top').append(templateFn_top);

  var template_nav = $('#lefang_nav').text();
  var templateFn_nav = _.template(template_nav);
  $('#lefangtex-nav').append(templateFn_nav);

  var template_PiCi = $('#lefang_qygl_right').text();
  var templateFn_PiCi = _.template(template_PiCi);
  $('.qygl-right').append(templateFn_PiCi);

  var template_foot = $('#lefang_foot').text();
  var templateFn_foot = _.template(template_foot);
  $('#lefangtex-foot').append(templateFn_foot);
})
