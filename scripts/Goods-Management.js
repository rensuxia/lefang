$(function() {
	var template_top = $('#lefang_top').text();
	var templateFn_top = _.template(template_top);
	$('#lefangtex-top').append(templateFn_top);

	var template_nav = $('#lefang_nav').text();
	var templateFn_nav = _.template(template_nav);
	$('#lefangtex-nav').append(templateFn_nav);

	var template_newaddress = $('#lefang_qygl_right').text();
	var templateFn_newaddress = _.template(template_newaddress);
	$('.qygl-right').append(templateFn_newaddress);

	// var template_management = $('#lefang_management').text();
	// var templateFn_management = _.template(template_management);
	// $('#lefangtex-management').append(templateFn_management);

	var template_foot = $('#lefang_foot').text();
	var templateFn_foot = _.template(template_foot);
	$('#lefangtex-foot').append(templateFn_foot);

	/**
	 * 商品管理---商品列表---接口product.queryGoodsList
	 * */
	var stance = new MilkT(goodsList, 3);
	//alert(store.get('enterprise_id'));
	stance.send({ usercode: store.get('usercode') })
		.done(function(data) {
			var ListData = data.value;
      var compiled = _.template('<% _.forEach(ListData, function(data) { %>\
                             <tr>\
                                    <td>\
                                        <input type="checkbox">\
                                    </td>\
                                    <td class="status"><%=data.apply_status %></td>\
                                    <td class="pname"><%= data.product_name %></td>\
                                    <td><%= data.	addr %></td>\
                                    <td class="brand"><%= data.brand_name %></td>\
                                    <td><%= data.purpose %></td>\
                                    <td class="category"><%= data.category_name %></td>\
                                    <td><%= data.batch_no %></td>\
                                    <td>\
                                        <a href="#"  onclick="SDel(this,<%=data.pid%>)">删除</a>\
                                        \<a href="nAdd.html">下架</a>\
                                    </td>\
                             </tr>\
                            <% }); %>');
			var templateTest = compiled({ 'ListData': ListData });
			$('tr').last().parent().append(templateTest);
      xianshi();
		})


	// 产品分类接口对接获取产品的分类信息一级产品信息
	LoadSelectData($('#level'), '0');
	//选中某个一级选项时select的值发生改变
	$('#level').change(function() {
		var level_option = $('#level option:selected').val();
		LoadSelectData($('#title'), level_option);
		LoadSelectData($('#hname'));
	});
	$('#title').change(function() {
		var level_option = $('#title option:selected').val();
		LoadSelectData($('#hname'), level_option);
	});
	/*下架商品的接口对接*/
})
/*产品分类的二级联动*/
function LoadSelectData(obj, id) {
	if(id == '' || id == null || id == undefined || id == 'undefined') {
		$(obj).find('option').remove();
		$(obj).append('<option value="">---请选择---</option>');
	} else {
		$(obj).find('option').remove();
		$(obj).append('<option value="">---请选择---</option>');
		var CateGory = new MilkT(category, 3);
		CateGory.send({ category_id: id }).done(function(data) {
			var CateData = data.CategoryList;
			var compiled = _.template('<% _.forEach(CateData, function(data) { \
                            %>\
                            <option value="<%=data.id %>"><%=data.name %></option>\
                            <% \
                          }); %>');
			var templateTest = compiled({ 'CateData': CateData });
			$(obj).append(templateTest);
		});
	}
}
/** * 搜索按钮的接口对接 * */
function getCid(cid) {
	var status = $('#pstatus option:selected').val();
	var name = store.get('usercode');
	var dom = new MilkT(serachGood, 3);
	dom.send({
		usercode: name,
		product_name: $('#pname').val(),
		category_id: cid,
		brand_name: $('#brand').val(),
		apply_status: status,
		isup: '1'
	}).done(function(data) {
		console.log(data);
		var ListData = data.value;
		console.log(ListData);
    var compiled = _.template('<% _.forEach(ListData, function(data) { %>\
                             <tr>\
                                    <td>\
                                        <input type="checkbox">\
                                    </td>\
                                    <td class="status"><%= data.apply_status %></td>\
                                    <td class="pname"><%= data.product_name %></td>\
                                    <td><%= data.addr %></td>\
                                    <td class="brand"><%= data.brand_name %></td>\
                                    <td><%= data.purpose %></td>\
                                    <td class="category"><%= data.category_name %></td>\
                                    <td><%= data.batch_no %></td>\
                                    <td></td>\
                                    <td></td>\
                                    <td>\
                                        <a href="#">编辑</a>\
                                    </td>\
                             </tr>\
                            <% }); %>');

     var templateTest = compiled({ 'ListData': ListData });
		$('table tbody tr:gt(0)').children().remove();
		$('tr').last().parent().append(templateTest);
		xianshi();
	})

}
/**--单个商品下架-**/
function xiajia(gid) {
  if($('input[name=\'test\']:checked')) {
   var stance=new MilkT(XiaGood,3);
   stance.send({id:gid}).done(function (data) {
     console.log(data);
   })

  }
}
/**
 *状态显示内容
 **/
function xianshi() {
	$('.status').each(function() {
		if(eval($(this).text()) == 1) {
			$(this).text('审核中');
		} else if(eval($(this).text()) == 2) {
			$(this).text('审核通过');
		} else if(eval($(this).text()) == 3) {
			$(this).text('审核驳回');
		}
	})
}
/*v选中复选框进行删除方法---单个删除商品	当前行进行删除商品的接口对接**/
function SDel(obj, id) {
  if($('input[name=\'test\']:checked')) {
    n=$(this).parent('tr').index();
    var del = new MilkT(DelGood, 3);
    del.send({
      id: id
    }).done(function(data) {
      console.log(data);
      $('table#goodlist').find('tr:eq('+n+')').remove();
    })
  }else {
    alert('请选择需要删除的商品');
  }
}
/*选中复选框进行删除方法	批量删除/*删除商品的接口对接*/
function del(obj, id) {
  $('input[name=\'test\']:checked').each(function() { // 遍历选中的checkbox
    n = $(this).parent('tr').index();
    var del = new MilkT(DelGood, 3);
    del.send({id: id}).done(function (data) {
      //console.log(data);
      $('table#goodlist').find('tr:eq(' + n + ')').remove();
    })
  })
}

