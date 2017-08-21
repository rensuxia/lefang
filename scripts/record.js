$(function () {
  var template_record = $('#lefang_record').text();
  var templateFn_record= _.template(template_record);
  $('#lefangtex_record').append(templateFn_record);
})
