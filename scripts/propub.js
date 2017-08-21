$(function(){
	var template_propub = $('#lefang-propub').text();
    var templateFn_propub = _.template(template_propub);
    $('#lefangtex-propub').append(templateFn_propub);
})