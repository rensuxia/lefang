//选择图片以及文件上传、
$(function() {
	var template_top = $('#lefang_top').text();
	var templateFn_top = _.template(template_top);
	$('#lefangtex-top').append(templateFn_top);

	var template_nav = $('#lefang_nav').text();
	var templateFn_nav = _.template(template_nav);
	$('#lefangtex-nav').append(templateFn_nav);

	var template_release = $('#lefang_release').text();
	var templateFn_release = _.template(template_release);
	$('#lefangtex-release').append(templateFn_release);

	var template_newaddress = $('#lefang_qygl_right').text();
	var templateFn_newaddress = _.template(template_newaddress);
	$('.qygl-right').append(templateFn_newaddress);

	var template_foot = $('#lefang_foot').text();
	var templateFn_foot = _.template(template_foot);
	$('#lefangtex-foot').append(templateFn_foot);

	// 产品分类接口对接获取产品的分类信息一级产品信息
	LoadSelectData($('#level'), '0');

	//选中某个一级选项时select的值发生改变
	$('#level').change(function() {
		var level_option = $('#level option:selected').val();
		LoadSelectData($('#title'), level_option);
		LoadSelectData($('#hname'));
		getAttr(level_option);
	});
	$('#title').change(function() {
		var title_option = $('#title option:selected').val();
		LoadSelectData($('#hname'), title_option);
		getAttr(title_option);
	});
	$('#hname').change(function() {
		var hname_option = $('#hname option:selected').val();
		getAttr(hname_option);
	})

	/*发布新商品接口对接Release_Goods------product.releaseGoods(接口)
	 * */
	$('#release').on('click', function() {
		// alert(store.get('enterprise_id'));
		var Release = new MilkT(Release_Goods, 3);
		Release.send({
			product_name: $('#pname').val(),
			product_no: '',
			main_pic: '',
			purpose: $('#purpose').val(),
			addr: $('#addr').val(),
			remark: '',
			product_details: $('#product_detail').val(),
			brand_name: $('#brand_name').val(),
			category_id: '',
			company_code: store.get('enterprise_id'),
			batch_no: '',
			inspection_report_url: '',
			z_remark: '',
			refer_price: $('#price').val(),
			is_special: '',
			special_price: $('#special_price').val(),
			count: $('#count').val(),
			isup: '',
			overdue: $('#overdue').val(),
			unit: $('#unit').val(),
			periodfordispatch: $('#periodfordispatch').val(),
			mqq: $('#mqq').val(),
			issuperior: '',
			pic1: '',
			pic2: '',
			pic3: '',
			product_json: ''
		}).done(function(data) {
			console.log(data);
		});
	});

});

/*产品分类接口调用----方法*/
function LoadSelectData(obj, id) {
	if(id == '' || id == null || id == undefined || id == 'undefined') {
		$(obj).find('option').remove();
		$(obj).append('<option value="">---请选择---</option>');
	} else {
		$(obj).find('option').remove();
		$(obj).append('<option value="">---请选择---</option>');
		var CateGory = new MilkT(category, 3);
		CateGory.send({ category_id: id }).done(function(data) {
			// console.log(data);
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
/*产品分类--所对应的信息属性---接口product.SelectAttr***/
function getAttr(cid) {
	var stance = new MilkT(categoryattr, 3);
	stance.send({ category_id: cid })
		.done(function(data) {
			var attrData = data.CategoryattrList;
			console.log(attrData);
			var compiled = _.template('<% _.forEach(attrData, function(data) { \
                            %>\
                            <label class="letter_spacing"><%= data.attr_name %>:</label>\
                               <input type="<%= data.input_type%>" class="txt content attr_type" >\
                            <br>\
                           \
                            <% \
                          }); %>');
			var templateTest = compiled({ 'attrData': attrData });
			$('#attr').children().remove();

			$('#attr').append(templateTest);

			/*type的改变--如果**type==1单选按钮 **type==2 复选框 ** type==3 下拉菜单** type==4 文本*/
			$('.attr_type').each(function() {
				if(eval($(this).attr('type')) == 1) {
					$(this).attr('type', 'radio')
				} else if(eval($(this).attr('type')) == 2) {
					$(this).attr('type', 'checkbox');
				} else if(eval($(this).attr('type')) == 3) {
					$(this).attr('type', 'radio')
				} else if(eval($(this).attr('type')) == 4) {
					$(this).attr('type', 'text')
				}
				$('input[type="radio"]').css('width', '20px');
				$('input[type="checkbox"]').css('width', '20px');
			})
		})
	// }

}

window.onload = function() {
	//    加载图片
      var result = document.getElementById('preview');
      var input = document.getElementById('file');

      var result1 = document.getElementById('preview1');
      var input1 = document.getElementById('file1');

      var result2 = document.getElementById('preview2');
      var input2 = document.getElementById('file2');

      var result3 = document.getElementById('preview3');
      var input3 = document.getElementById('file3');

      if(typeof FileReader === 'undefined') {
        result.innerHTML = '抱歉，你的浏览器不支持 FileReader';
        input.setAttribute('disabled', 'disabled');
      } else {
        input.addEventListener('change', readFile, false);
      }

      function readFile() {
        var file = this.files[0];
        //				alert(file);
        if(!/image\/\w+/.test(file.type)) {
          alert('请确保文件为图像类型');
          return false;
        }
        var reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function(e) {
          //alert(3333)
          //alert(this.result);
          result.innerHTML = '<img src="' + this.result + '" alt=""/>'
        }
      }

      if(typeof FileReader === 'undefined') {
        result1.innerHTML = '抱歉，你的浏览器不支持 FileReader';
        input1.setAttribute('disabled', 'disabled');
      } else {
        input1.addEventListener('change', readFile1, false);
      }

      function readFile1() {
        var file = this.files[0];
        //				alert(file);
        if(!/image\/\w+/.test(file.type)) {
          alert('请确保文件为图像类型');
          return false;
        }
        var reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function(e) {
          //alert(3333)
          //alert(this.result);
          result1.innerHTML = '<img src="' + this.result + '" alt=""/>'
        }
      }

      if(typeof FileReader === 'undefined') {
        result2.innerHTML = '抱歉，你的浏览器不支持 FileReader';
        input2.setAttribute('disabled', 'disabled');
      } else {
        input2.addEventListener('change', readFile2, false);
      }

      function readFile2() {
        var file = this.files[0];
        //				alert(file);
        if(!/image\/\w+/.test(file.type)) {
          alert('请确保文件为图像类型');
          return false;
        }
        var reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function(e) {
          //alert(3333)
          //alert(this.result);
          result2.innerHTML = '<img src="' + this.result + '" alt=""/>'
        }
      }

      if(typeof FileReader === 'undefined') {
        result3.innerHTML = '抱歉，你的浏览器不支持 FileReader';
        input3.setAttribute('disabled', 'disabled');
      } else {
        input3.addEventListener('change', readFile3, false);
      }

      function readFile3() {
        var file = this.files[0];
        //				alert(file);
        if(!/image\/\w+/.test(file.type)) {
          alert('请确保文件为图像类型');
          return false;
        }
        var reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function(e) {
          //alert(3333)
          //alert(this.result);
          result3.innerHTML = '<img src="' + this.result + '" alt=""/>'
        }
      }

}
