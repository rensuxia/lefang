$(function () {

  /*点击分页1 2 3 ...时使其点击的页数改变颜色*/
  $('#pag li').click(function () {
    $(this).addClass('current') //为当前元素添加class--current
      .siblings().removeClass('current');//当前元素的其他兄弟元素去除current属性
    $('#pag li:last-child').removeClass('current');
  });
  $('.next').on('click',function () {
    var first=$('.next').parent().first().addClass('none');
    var lasts=$('.next').parent().next();
    lasts.css('display','block');
    // console.log($('.next').parent().next());
  })

  /******商品列表显示*********/
  var ucode=store.get('usercode');
  // console.log(uBuyer);
  var product = new MilkT(plist, 3);
  product.send({usercode:ucode})
    .done(function (data) {
      // console.log(data);
      var resultData = data.value;//保存结果
      // console.log(resultData);
      var complied = _.template('<% _.forEach(dom, function(pdata){ %>\
                   <li>\
              <a href="javascript:;" ><%= pdata.product_name %></a>\
              <a href="javascript:;" ><%= pdata.material%></a>\
              <a href="javascript:;" ><%= pdata.jingsha %>*<%= pdata.weisha%></a>\
              <a href="javascript:;" ><%= pdata.jingmi %>*<%= pdata.weimi%></a>\
              <a href="javascript:;" ><%= pdata.fukuan %></a>\
              <a href="javascript:;"><%= pdata.refer_price %></a>\
              <a href="javascript:;" class="create_time"><%= pdata.create_time %></a>\
              <a href="javascript:;" class="batch"><%= pdata.batch_no %></a>\
              <a href="grey_detail.html?id=<%=pdata.pid%>&BatchId=<%=pdata.id%>" class="cha">查看详情</a>\
          </li>\
        <% });%>');
      var templateTest = complied({'dom': resultData});
      $('.pro_list').append(templateTest);
      /*******分页*******/
      $(document).ready(function () {
        var show_per_page = 10;
        var number_of_items = $('.pro_list li').length;
        console.log(number_of_items);
        var number_of_pages = Math.ceil(number_of_items / show_per_page);
        //隐藏域默认值
        $('#current_page').val(0);
        $('#show_per_page').val(show_per_page);
        var navigation_html = '<li onclick="previous()"><a class="previous_link" href="javascript:;"><< </a></li>';
        var current_link = 0;
        while (number_of_pages > current_link) {
          navigation_html += '<li onclick="go_to_page(' + current_link + ')"><a class="page_link" href="javascript:" longdesc="' + current_link + '">' + (current_link + 1) + '</a></li>';
          current_link++;
        }
        navigation_html += '<li onclick="next()"><a class="next_link" href="javascript:;">>></a></li>';
        // navigation_html+=' <li style="display: none"> <a href=""> 跳到第 <input type="text" value="">页 <a href="#">确定</a> </a> </li>';
        $('#pag').html(navigation_html);
        $('#pag li:eq(1)').addClass('current');
        //隐藏该对象下面的所有子元素
        $('.pro_list').children().css('display', 'none');
        //显示第n（show_per_page）元素
        $('.pro_list').children().slice(0, show_per_page).css('display', 'block');
      });

    });

  /****商家信息的展示*****/
    var cinfo=new  MilkT(comanyinfo,3);
    cinfo.send({usercode:ucode})
      .done(function (data) {
        // console.log(data);
        /**省市代码转换**/
          //省份
        var pCity='';   //获取省名称
        var cCity='';  //获取市名称
        var cPro = new MilkT(city_province,1);
        cPro.send({})
          .done(function(dataP){
            for(var i=0;i<dataP.city.length;i++){
              if(dataP.city[i].number==data.province){
                pCity=dataP.city[i].name;
                var cnumber=dataP.city[i].number;
              }
            }
            //城市
            var cCro = new MilkT(city_city,1)
            cCro.send({pid:cnumber})
              .done(function(dataC){
                // console.log(dataC);
                for(var i=0;i<dataC.city.length;i++){
                  if(data.city==dataC.city[i].number){
                    cCity=dataC.city[i].name;
                  }
                }
                data.city=cCity;
                data.province=pCity;
                var template = $('#lefang_content').text();
                var templateFn = _.template(template);
                // var dom = templateFn(data);
                $('#Pppp span:last-of-type').text(pCity+cCity);
              });
          });
        console.log(pCity);
        console.log(cCity);
        /***内容追加**/
        var template = $('#lefang_content').text();
        var templateFn = _.template(template);
        var dom = templateFn(data);
        $('#lefangtex_conent').append(dom);
      });

});



/****跳转到上一页****/
function previous(){
  var new_page = parseInt($('#current_page').val()) - 1;
  //if there is an item before the current active link run the function
  if($('#pag li.current').prev('li').children('.page_link').length==true){
    go_to_page(new_page);
  }
}
/****跳转到上下一页****/
function next(){
  var new_page = parseInt($('#current_page').val()) + 1;
  //if there is an item after the current active link run the function
  if($('#pag li.current').next('li').children('.page_link').length==true){
    go_to_page(new_page);
  }
}

/****跳转到某一页****/
function go_to_page(page_num){
  //get the number of items shown per page
  var show_per_page = parseInt($('#show_per_page').val());
  //get the element number where to start the slice from
  var start_from = page_num * show_per_page;
  //get the element number where to end the slice
  var end_on = start_from + show_per_page;

  //hide all children elements of content div, get specific items and show them
  $('.pro_list').children().css('display', 'none').slice(start_from, end_on).css('display', 'block');
  /*get the page link that has longdesc attribute of the current page and add active_page class to it
   and remove that class from previously active page link*/
  //给当前li动态添加active类
  $('.page_link[longdesc=' + page_num +']').parents('li').addClass('current').siblings('.current').removeClass('current');
  //update the current page input field
  $('#current_page').val(page_num);
}
