$(function(){


    var ts = new MilkT(addressA,3)
          ts.send({usercode:'1'})
              .done(function(data){
                console.log(data);
                // var template = $('#lefang-ysyp').text();
                // var templateFn = _.template(template);
                // $('#lefangtex-ysyp').append(templateFn);
                //  //alert(JSON.stringify(dom));
                // var alldata=data.addressEntity;
                // var cy=alldata['574'].city
                // console.log()
                //   //循环模式
                // var compiled = _.template('<% _.forEach(alldata, function(pdata) { \
                //   %><li>\
                //   <a href="product.html?id=<%=pdata.productId  %>">\
                //   <img src="images/2f_bamboo_cloth.png" alt="">\
                //   <span>【<%= pdata.companyName %>】<%= pdata.productName %></span>\
                //   </a>\
                //   </li><% \
                // }); %>');

                // var templateTest=compiled({ 'alldata': alldata});
                // $("#lefang-te").append(templateTest);
              })
})