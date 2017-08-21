$(function(){
	var template_address = $('#purList_Box').text();
    var templateFn_address = _.template(template_address);
    $('#purList_conent').append(templateFn_address);
})