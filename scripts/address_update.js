$(function() {
	var infoData =store.get('data');

	/*获取旧值渲染页面*/
	var old_province = _.template('<option><%=province %></option>');
	var infoDataProvince = old_province({ 'province': infoData.province });
	$('#province').append(infoDataProvince);

	var old_city = _.template('<option><%= city %></option>');
	var infoDataCity = old_city({ 'city': infoData.city })
	$('#city').append(infoDataCity);

	var old_area = _.template('<option><%= area %></option>');
	var infoDataArea = old_area({ 'area': infoData.area })
	$('#area').append(infoDataArea);

	$('#address').val(infoData.address);
	$('#postalCode').val(infoData.postcodes);
	$('#name').val(infoData.username);
	$('#phone').val(infoData.phone_number);

	// if(infoData.status=='1'){
	// 	$('#setAddress').attr('checked','checked');
	// }

	/*删除修改前的数据*/
	$('#commit').on('click', function() {
		if(store.get('isCanDel') == true) {
			// alert('000')
			var stance = new MilkT(addressDel, 3);
			stance.send({
					id: infoData.id
				})
				.done(function(data) {
					store.remove('isCanDel');
					store.remove('data');
          self.opener.location.reload();//刷新父窗口
					// alert('666');
					// parent.window.location.reload();
					// var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
					// parent.layer.close(index);
				})
				.fail(function() {
					console.log('失败');
				})
		}
	})

	$('#cancel').on('click', function() {
	  window.close();
		// parent.window.location.reload();
		// var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
		// parent.layer.close(index);
	})
})
