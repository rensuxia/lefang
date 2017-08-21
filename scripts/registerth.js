$(function(){
	var template_zhucth = $('#lefang-zhucth').text();
    var templateFn_zhucth = _.template(template_zhucth);
    $('#lefangtex-zhucth').append(templateFn_zhucth);
})