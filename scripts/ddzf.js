 $(function(){
    var template = $('#ddzf_txt').text();
      var templateFn = _.template(template);
      $('#ddzf_coent').append(templateFn);


})