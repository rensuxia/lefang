$(function () {
	window['open'] = {};
	open.GetQueryString = function (name) {
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return (r[2]); return '';
	};
	var pro_id = open.GetQueryString('categoryid');//获取URL 参数id值
	console.log(pro_id);

	var template = $('#sxlb_nr').text();
	// var templateFn = _.template(template);
	// $('#sxlb_conent').append(templateFn);


	var up = 1;
	$('.dq_up').click(function () {
		if (up == 1) {
			$(this).children('img').css('webkit-transform', 'rotate(180deg)');
			$(this).addClass('active');
			up = 2;
		} else {
			$(this).children('img').css('webkit-transform', 'rotate(0deg)');
			$(this).removeClass('active');
			up = 1;
		}
		$('.sx_menu').slideToggle('slow');
	});

	//筛选子页API  成分列表
	var cf = new MilkT(prod_Category, 3)
	cf.send({ categoryId: pro_id })
		.done(function (data) {
			// console.log(data);

			var one_list = data.productCategoryEntityList;
			// console.log(one_list);

			var sx_nav = _.template('<% _.forEach(one_list, function(data){ \
                  %>\
								<a href="javascript:;" data-id="<%= data.categoryId %>"><%= data.categoryName %> \
									<img src="./images/icon/arrow_zk.png " style="width: 10px;" alt="">\
								</a>\
					<%\
                });%>');
			var templateTest = sx_nav({ 'one_list': one_list });
			$('#one').append(templateTest);

			//第一个 不限 hover 的样式


			$('#cf_bx').siblings().hover(
				function () {
					$(this).children('img').attr('src', './images/icon/arrow_sq.png');
					// $(".two_box").css("display","block");
				},
				function () {
					$(this).children('img').attr('src', './images/icon/arrow_zk.png');
					// $(".two_box").css("display","none");
				}
			);


			// 成分  选项卡 暂时关闭
			// $(".lefang_news_zhishi").hide();
			$('#one a:not(:first-of-type)').mouseover(function () {
				var bx_index = $(this).data('id');
				// console.log(bx_index);
				$('#one a ').eq($(this).index()).addClass('.orange').siblings().removeClass('.orange');
				$('.two_box').hide();
				$('.two_box').eq($(this).index()).show();

				//加载two——box  成分列表 二级菜单
				var yarn = new MilkT(yarn_listA, 3)
				yarn.send({ categoryId: bx_index, type: '1' })
					.done(function (data) {
						// console.log(data);
						if (data.lenght == 0) {
							$('.two_box').css('display', 'none');
						}
						var name = data.productCategoryEntityList;
						var compiled = _.template('<% _.forEach(name, function(data){ \
                  %><a data-id="<%= data.categoryId %>"><%= data.categoryName %></a><%\
                });%>');
						$('.two_box ').empty();
						var templateTest = compiled({ 'name': name });
						$('.two_box').append(templateTest);

						// 点击下拉菜单
						$('.two_box').children('a').click(function () {
							$(this).addClass('orange');
							$(this).css('color:#fff');
							$(this).siblings().removeClass('orange');
							var box_id = $(this).data('id');
							console.log(box_id);

							//单击加载筛选数据
							var page = new MilkT(pro_page, 3)
							page.send({ categoryId: box_id, currentPage: '1' })
								.done(function (data) {
									console.log(data);
									// alert("1111111");
									var pro_list = data.productCategoryEntityList;


									var li = _.template('<% _.forEach(pro_list, function(data){ \
				                  %><li>\
										<a href="javascript:;"><%= data.productName %></a>\
										<a href="javascript:;"><%= data.material %></a>\
										<a href="javascript:;"><%= data.yarns %></a>\
										<a href="javascript:;"><%= data.technology %></a>\
										<a href="javascript:;" class="dun"><%= data.productPrice %></a>\
										<a href="javascript:;" style="width:170px"><%= data.companyName %></a>\
										<a href="javascript:;"><%= data.batchCreateTime %></a>\
										<a href="javascript:;"><%= data.productNo %></a>\
										<a href="yarn_detail.html?id=<%=data.productId%>" class="buy">立即购买</a>\
									</li><%\
				                });%>');
									$('.pro_list li:not(:first-of-type)').remove();
									var templateTest = li({ 'pro_list': pro_list });
									$('.pro_list').append(templateTest);
								}).fail(function () {
									// alert("数据加载失败");
								})

						});
					});


			})





			$('.cf_active:first ').children('a').click(function () {
				$(this).addClass('orange');
				$(this).css('color:#fff');
				$(this).siblings().removeClass('orange');

				// $(this).index().eq(0).$(".two_box").css("display","none");
				// console.log(b);
				// var pro_id=$(this).data('id');
				// console.log(pro_id);
				//单击加载筛选数据
				var page = new MilkT(pro_page, 3)
				page.send({ categoryId: pro_id, currentPage: '1' })
					.done(function (data) {
						console.log(data);
						var pro_list = data.productCategoryEntityList;
						var li = _.template('<% _.forEach(pro_list, function(data){ \
                  %><li>\
						<a href="javascript:;"><%= data.productName %></a>\
						<a href="javascript:;"><%= data.material %></a>\
						<a href="javascript:;"><%= data.yarns %></a>\
						<a href="javascript:;"><%= data.technology %></a>\
						<a href="javascript:;" class="dun"><%= data.productPrice %></a>\
						<a href="javascript:;" style="width:170px"><%= data.companyName %></a>\
						<a href="javascript:;"><%= data.batchCreateTime %></a>\
						<a href="javascript:;"><%= data.productNo %></a>\
						<a href="yarn_detail.html?id=<%=data.productId%>" class="buy">立即购买</a>\
					</li><%\
                });%>');
						$('.pro_list li:not(:first-of-type)').remove();
						var templateTest = li({ 'pro_list': pro_list });
						$('.pro_list').append(templateTest);
					}).fail(function () {
						// alert("数据加载失败");
					})
			});


			$('.nav_bt ').children('a').click(function () {
				$(this).addClass('mr');
				$(this).siblings().removeClass('mr');
			});



		});

	//单击 触发搜索


	//
	var fscgor = new MilkT(findsubclasscategory, 3)
	fscgor.send({ categoryId: pro_id })
		.done(function (data) {
			// console.log(data);
			var flei_dt = data.productCategoryEntityList;
			console.log(flei_dt);
			var dom = '';
			$(flei_dt).each(function (i, m) {
				var a = '';
				var arr = m.attributeValue.split(',');
				$(arr).each(function (j, n) {
					a += '<a href="javascript:;">' + n + '</a>';
				});
				var e = '<dl class="m-dl">' +
					'<dt class="m-dt"><a href="javascript:;" data-id=' + m.attributeId + '>' + m.attributeName + ':</a></dt>' +
					'<dd class= "m-dd cf_active" >' +
					'<a href="javascript:;" id=cf_bx class=orange >不限</a> ' +
					a +
					'</dd>' +
					'</dt>' +
					'</dl>'
				dom += e;
			});

			$('.sx_menu').append(dom);
			// 单击品名一下接口
			var lb_vlues = [];
			var lb_ids = [];
			var lb_atrvlue = '';
			var lb_atrid = '';
			$('.cf_active').children('a').click(function () {
				//获取 id 和 值
				$(this).addClass('orange');
				$(this).css('color:#fff');
				$(this).siblings().removeClass('orange');
				lb_vlues = [];
				lb_ids = [];

				//单击 循环得到id 值
				for (var i = 1; i <= 5; i++) {
					// console.log($(".m-dl").eq(i).find(".orange").text())
					lb_vlues.push($('.m-dl').eq(i).find('.orange').text());
					lb_ids.push($('.m-dl').eq(i).find('.orange').parent('.cf_active').prev('.m-dt').children('a').data('id'));
				}

				lb_vlues = String(lb_vlues);
				lb_ids = String(lb_ids);
				console.log(lb_ids)
				console.log(lb_vlues)

				//商品分页接口
				var page = new MilkT(pro_page, 3)
				page.send({ categoryId: pro_id, currentPage: '1', attributeValues: lb_vlues, attributeIds: lb_ids })
					.done(function (data) {
						console.log(data);

						var pro_list = data.productCategoryEntityList;

						var li = _.template('<% _.forEach(pro_list, function(data){ \
                  %><li>\
						<a href="javascript:;"><%= data.productName %></a>\
						<a href="javascript:;"><%= data.material %></a>\
						<a href="javascript:;"><%= data.yarns %></a>\
						<a href="javascript:;"><%= data.technology %></a>\
						<a href="javascript:;" class="dun"><%= data.productPrice %></a>\
						<a href="javascript:;" style="width:170px"><%= data.companyName %></a>\
						<a href="javascript:;"><%= data.batchCreateTime %></a>\
						<a href="javascript:;"><%= data.productNo %></a>\
						<a href="yarn_detail.html?id=<%=data.productId%>" class="buy">立即购买</a>\
					</li><%\
                });%>');
						$('.pro_list li:not(:first-of-type)').remove();
						var templateTest = li({ 'pro_list': pro_list });
						$('.pro_list').append(templateTest);
					});


			});

		});




	/********* 默认加载 默认分页 ****************/
	var page = new MilkT(pro_page, 3)
	page.send({ categoryId: pro_id, currentPage: '1' })
		.done(function (data) {
			console.log(data);
			var yarn_list = data.productCategoryEntityList;
			// console.log(yarn_list);
			// var pages_total= data.pages; // 总页数
			var pages_total = 10;

			var li = _.template('<% _.forEach( yarn_list, function(data){ \
                  %><li>\
						<a href="javascript:;"><%= data.productName %></a>\
						<a href="javascript:;"><%= data.material %></a>\
						<a href="javascript:;"><%= data.yarns %></a>\
						<a href="javascript:;"><%= data.technology %></a>\
						<a href="javascript:;" class="dun"><%= data.productPrice %></a>\
						<a href="javascript:;" style="width:170px"><%= data.companyName %></a>\
						<a href="javascript:;"><%= data.batchCreateTime %></a>\
						<a href="javascript:;"><%= data.productNo %></a>\
						<a href="yarn_detail.html?id=<%=data.productId%>" class="buy">立即购买</a>\
					</li><%\
                });%>');

			var templateTest = li({ 'yarn_list': yarn_list });
			$('.pro_list').append(templateTest);

			// 分页   
			//1.遍历出来 页数 和总页数
			//2.单击 获取页码 存储
			var sx_pags = data;

			//得到总页数 且循环页数;
			var page_sum = data.pages;
			//输出页码
			// var dom="";
			//   for(i=1;i<=page_sum;i++){
			// 	console.log(i);
			// 	if(i<=5){
			// 		var e="<a href='javascript:;'>"+i+"</a>";
			// 	 	dom+=e;

			// 	}

			// }
			// $('.pag_num').html(dom);

			// 存储页码
			$('.pag_num a').click(function () {
				// console.log($(this).index());
				$(this).addClass('active').siblings().removeClass('active');
				var page = ($(this).index()) + 1;
				console.log(page);

			});
			var sx_pag = _.template('\
						<a href="javascript:;">……</a>\
						<a href="javascript:;"><%= sx_pags.pages%></a>\
                ');
			//              
			var templateTest = sx_pag({ 'sx_pags': sx_pags });
			$('.pag_sum').append(templateTest);

		})
		.fail(function () {
			console.log('报错');

		})


	//上一页
	$('previous-pag').click(function () {
		//当前页面-1
		// if(pages_total>=1 ){
		// 	pages_total=1;
		// }else{
		// 	pages_total-=1;
		// 	console.log(pages_total);
		// }

	});

	//下一页
	$('next-pag').click(function () {
		//当前页面+1
		// if(pages_total>=1 ){
		// 	pages_total=1;
		// }else{
		// 	pages_total-=1;
		// 	console.log(pages_total);
		// }

	});

	//第一页
	$('first-pag').click(function () {
		//当前页面+1
		// if(pages_total>=1 ){
		// 	pages_total=1;
		// }else{
		// 	pages_total-=1;
		// 	console.log(pages_total);
		// }

	});

	//最后一页
	$('last-pag').click(function () {
		//当前页面+1
		// if(pages_total>=1 ){
		// 	pages_total=1;
		// }else{
		// 	pages_total-=1;
		// 	console.log(pages_total);
		// }

	});
	/*var page= new MilkT(pro_page ,3)
	  page.send({categoryId:pro_id,currentPage:'1'})
		  .done(function(data){
		   console.log(data);
		   var sx_pags=data;
			  var sx_pag = _.template('<% _.forEach( sx_pags, function(data){ \
			  %>\
					<a href="javascript:;" class="first-pag">\
					<img src="./images/icon/page_first.png" alt="">\
				</a>\
				<a href="javascript:;" class="previous-pag">\
						<img src="./images/icon/page_previous.png" alt="">\
				</a>\
					<a href="javascript:;"><%= sx_pags.pageNum%></a>\
					<a href="javascript:;" class="next-pag">\
						<img src="./images/icon/page_next.png" alt="">\
					</a>\
					<a href="javascript:;" class="last-pag">\
						<img src="./images/icon/page_last.png" alt="">\
					</a>\
				<%\
			});%>');

			var templateTest=sx_pag({'sx_pags':sx_pags});
			$(".pag").append(templateTest);
		});*/

	/************* 分页**************/

	$('.first-pag').hover(
		function () {
			$(this).children('img').attr('src', './images/icon/page_first_press.png');
		},
		function () {
			$(this).children('img').attr('src', './images/icon/page_first.png');
		}
	);
	//?ҳ
	$('.previous-pag').hover(
		function () {
			$(this).children('img').attr('src', '/images/icon/page_previous_press.png ');
		},
		function () {
			$(this).children('img').attr('src', './images/icon/page_previous.png');
		}
	);
	//?һҳ
	$('.next-pag').hover(
		function () {
			$(this).children('img').attr('src', './images/icon/page_next_press.png');
		},
		function () {
			$(this).children('img').attr('src', './images/icon/page_next.png');
		}
	);
	//????ҳ
	$('.last-pag').hover(
		function () {
			$(this).children('img').attr('src', './images/icon/page_last_press.png');
		},
		function () {
			$(this).children('img').attr('src', './images/icon/page_last.png');
		}
	);















})