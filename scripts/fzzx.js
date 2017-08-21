$(function () {
  //  渲染
  var template_fzzx=$('#lefang_fzzx').text();
  var templateFn_fzzx=_.template(template_fzzx);
  $('#lefangtex_fzzx').append(templateFn_fzzx);

    //获取左边列表的一级大标题
    var fzzxcateone = new MilkT(fzzx_cateone, 3);
    fzzxcateone.send({})
        .done(function(data){
            for(var i=0;i<data.cmscate1.length;i++){
                var obj=data.cmscate1[i];
                var compiled= _.template('\
                <div class="clearfix fzzx-zjlfw">\
                    <p class="animated "><%= Obj.category_name %></p>\
                    <ul  id="leimu<%= Obj.id %>" class="right leimutab animated">\
                    </ul>\
                </div>');
                var templateTest=compiled({'Obj':obj});
                // console.log(templateTest);
                $('#fzzx-left-list').append(templateTest);
                gettwo(obj.id);
            }
        })
    //获取左边列表的二级小标题
    function gettwo(id){
        var stance = new MilkT(fzzx_catetwo, 3);
        stance.send({cateoneid:id}).done(function(data){
            // console.log(data);
                //处理二级栏目
                var fzzxList=data.cmscate1;
                for(var result in fzzxList){
                var compiled= _.template('\
                    <li id="<%= FzzxList.id %>" class="d_li" onclick="showInfo(this)">\
                        <a href="#"><%= FzzxList.category_name %></a>\
                    </li>\
                </div>');
                var templateTest=compiled({'FzzxList':fzzxList[result]});
                // console.log(templateTest);
                // var arrar=[$('#leimu1),$('#leimu2)];
                var arrar=[];
                $('.leimutab').each(function(){
                    arrar.push($(this));
                });
                var nid=Number(id);
                arrar[nid-1].append(templateTest);
                }
                $('#leimu1').children().eq(0).addClass('active');
        })
    }


    //获取页面上传递的id
    function getUrlParam(id){
        var reg = new RegExp('(^|&)'+ id +'=([^&]*)(&|$)'); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg); //匹配目标参数
        if (r!=null) return unescape(r[2]); return null; //返回参数值
    }

    // 公司动态特殊处理
    var fzzxlist= new MilkT(fzzx_list,3);
    fzzxlist.send({cateID:19}).done(function (data) {
        // console.log(data);
        // console.log(data.cms.length);    //1
        var news=data.cms;
        var compiled= _.template('<% _.forEach(News, function(news) { \
                %> \
                <li class="clearfix"> \
                    <div> \
                        <div class="fzzx-list-left left"> \
                            <img src="<%= news.news_pictuer_url%>" alt="" /> \
                        </div> \
                    </div> \
                    <div class="fzzx-list-right left"> \
                        <a href="fzzx_detail.html?id= <%= news.id %>"><p style="font-size:16px;"><%= news.news_title %></p></a>\
                        <div class="fzzx-market-content">\
                            <p style="font-size:14px;"><%= news.news_content %></p> \
                        </div>\
                        <a href="fzzx_detail.html?id= <%= news.id %>">查看详情</a>\
                    </div> \
                </li> \
                <%});%>');
        var templateTest=compiled({'News':news});
        // console.log(templateTest);   //输出ul列表的内容
        //公司动态
        $('#fzzx-company').append(templateTest);

        //分页
        $(document).ready(function(){
            //每页显示的数目
            var show_per_page = 5;
            //获取fzzx-top-line li里面，数据的数量
            var number_of_items = $('#fzzx-company li').length;
            //计算页面显示的数量
            var number_of_pages = Math.ceil(number_of_items/show_per_page);
            //隐藏域默认值
            $('.current_page').val(0);
            $('.show_per_page').val(show_per_page);

            var navigation_html = '<li onclick="previous()"><a class="previous_link" href="javascript:previous();">上一页</a></li>';
            var current_link = 0;
            while(number_of_pages > current_link){
                navigation_html += '<li onclick="go_to_page('+current_link+')"><a class="page_link" href="javascript:" longdesc="' + current_link +'">'+ (current_link + 1) +'</a></li>';
                current_link++;
            }
            navigation_html += '<li onclick="next()"><a class="next_link" href="javascript:next();">下一页</a></li>';

            $('.page_navigation ul').html(navigation_html);

            //add active class to the first page link
            $('.page_navigation li:eq(1)').addClass('active');

            //隐藏该对象下面的所有子元素
            $('#fzzx-company').children().css('display', 'none');

            //显示第n（show_per_page）元素
            $('#fzzx-company').children().slice(0, show_per_page).css('display', 'block');

        });

    })

    //纺织资讯详情页面
    var nId=Number(getUrlParam('id'));
    var fzzxcontent=new MilkT(fzzx_content,3);
    fzzxcontent.send({id:nId})
        .done(function (data) {
            // console.log(data);
            data.release_time=todate(data.release_time,'-',true);
            var template=$('#lefang_fzzx_detail').text();
            var templateFn = _.template(template);
            var dom=templateFn(data);
            $('#lefangtex_fzzx_detail').append(dom);
        })

    //转换日期格式
    function todate(inputstr, showsplit, showweek) {
    //Wed Mar 22 13:38:37 CST 2017
        inputstr = inputstr + ''; //末尾加一个空格
        var date = '';
        var month = new Array();
        var week = new Array();
        month['Jan'] = 1;
        month['Feb'] = 2;
        month['Mar'] = 3;
        month['Apr'] = 4;
        month['May'] = 5;
        month['Jan'] = 6;
        month['Jul'] = 7;
        month['Aug'] = 8;
        month['Sep'] = 9;
        month['Oct'] = 10;
        month['Nov'] = 11;
        month['Dec'] = 12;
        week['Mon'] = '一';
        week['Tue'] = '二';
        week['Wed'] = '三';
        week['Thu'] = '四';
        week['Fri'] = '五';
        week['Sat'] = '六';
        week['Sun'] = '日';
        var str = inputstr.split(' ');
        date = str[5];
        date += showsplit + month[str[1]] + showsplit + str[2];
        if(showweek){
            date += '    ' + ' 星期' + week[str[0]];
        }
        return date;
    }

    //地图
    var map = new BMap.Map('concat-us-img');          // 创建地图实例
    var point = new BMap.Point(120.319767,31.695287);  // 创建点坐标
    map.centerAndZoom(point,17);                 // 初始化地图，设置中心点坐标和地图级别
    var mk = new BMap.Marker(point);//添加地图上的覆盖物——标记
    mk.setAnimation(BMAP_ANIMATION_BOUNCE);  //坐标点的跳动
    map.addOverlay(mk);
    map.enableScrollWheelZoom(true);//启用滚轮缩放
    map.addControl(new BMap.NavigationControl()); //添加导航控件
    map.addControl(new BMap.ScaleControl()); //添加缩放控件
    map.addControl(new BMap.OverviewMapControl());//添加概览图控件
    map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
    var sContent ='江苏中添纺织科技有限公司坐落于江苏省无锡市惠山区惠山大道1719-1号D区1号楼5楼';
    var infoWindow = new BMap.InfoWindow(sContent);  // 创建信息窗口对象
    map.openInfoWindow(infoWindow,point); //开启信息窗口
});
/**
 * 标签页的切换
 * @param obj  当前li
 */
function showInfo(obj){
    // console.log($(".title").text());
    $('#title').html($(obj).text());
    var Listid=$(obj).attr('id');
    $(obj).parents('#fzzx-left-list').find('li').removeClass('active');
    $(obj).addClass('active');
    $('.fzzx-zjlfw-right>div').hide();
    $('.fzzx-fzzx-right>div').hide();
    var index=$(obj).parent().parent('div').index();
    if($('.fzzx-container').children('div').eq(index+1).length>0){
        var divobj=$('.fzzx-container').children('div').eq(index+1);
        // console.log(divobj);
        if($(divobj).children('div').length==1){
            $(divobj).children('div').css('display','block');
        }
        if($(divobj).children('div').length>1){
            $(divobj).children('div').eq($(obj).index()).css('display','block');
        }
    }
    var a1=$('.fzzx-container').children('div').eq(index+1).attr('id');
    var a2=$('#fzzx-fzzx-right').attr('id');
    if(a1==a2){
        getContentInfo(Listid);
    }
}
//动态获取右边列表对应的内容
function getContentInfo(id) {
    var fzzxlist= new MilkT(fzzx_list,3);
    // console.log(id);
    //纺织资讯列表对应的右边内容的显示
    fzzxlist.send({cateID:id}).done(function (data) {
            // console.log(data);
            var news=data.cms;
            var compiled= _.template('<% _.forEach(News, function(news) { \
            %> \
            <li class="clearfix"> \
                <div> \
                    <div class="fzzx-list-left left"> \
                        <img src="<%= news.news_pictuer_url%>" alt="" /> \
                    </div> \
                </div> \
                <div class="fzzx-list-right left"> \
                    <a href="fzzx_detail.html?id= <%= news.id %>"><p style="font-size:16px;"><%= news.news_title %></p></a> \
                    <div class="fzzx-market-content">\
                        <p style="font-size:14px;"><%= news.news_content %></p> \
                    </div>\
                    <a href="fzzx_detail.html?id= <%= news.id %>">查看详情</a>\
                </div> \
            </li> \
            <%});%>');
            var templateTest=compiled({'News':news});
            //console.log(templateTest);   //输出ul列表的内容
            //纺织行情
            $('#fzzx-top-line').find('li').remove();
            $('#fzzx-top-line').append(templateTest);

        //分页
        $(document).ready(function(){
            //每页显示的数目
            var show_per_page = 5;
            //获取fzzx-top-line li里面，数据的数量
            var number_of_items = $('#fzzx-top-line li').length;
            //计算页面显示的数量
            var number_of_pages = Math.ceil(number_of_items/show_per_page);
            //隐藏域默认值
            $('#current_page').val(0);
            $('#show_per_page').val(show_per_page);

            var navigation_html = '<li onclick="previous()"><a class="previous_link" href="javascript:;">上一页</a></li>';
            var current_link = 0;
            while(number_of_pages > current_link){
                navigation_html += '<li onclick="go_to_page('+current_link+')"><a class="page_link" href="javascript:" longdesc="' + current_link +'">'+ (current_link + 1) +'</a></li>';
                current_link++;
            }
            navigation_html += '<li onclick="next()"><a class="next_link" href="javascript:;">下一页</a></li>';

            $('#page_navigation ul').html(navigation_html);

            //add active class to the first page link
            $('#page_navigation li:eq(1)').addClass('active');

            //隐藏该对象下面的所有子元素
            $('#fzzx-top-line').children().css('display', 'none');

            //显示第n（show_per_page）元素
            $('#fzzx-top-line').children().slice(0, show_per_page).css('display', 'block');
        });
    })
}

//上一页
function previous(){
    var new_page = parseInt($('#current_page').val()) - 1;
    var company_new_page = parseInt($('.current_page').val()) - 1;//公司动态特殊处理
    //if there is an item before the current active link run the function
    if($('#page_navigation li.active').prev('li').children('.page_link').length==true){
        go_to_page(new_page);
    }
    //公司动态特殊处理
    if($('.page_navigation li.active').prev('li').children('.page_link').length==true){
        go_to_page(company_new_page);
    }
}
//下一页
function next(){
    var new_page = parseInt($('#current_page').val()) + 1;
    var company_new_page = parseInt($('.current_page').val()) + 1;//公司动态特殊处理
    //if there is an item after the current active link run the function
    if($('#page_navigation li.active').next('li').children('.page_link').length==true){
        go_to_page(new_page);
    }
    //公司动态特殊处理
    if($('.page_navigation li.active').next('li').children('.page_link').length==true){
        go_to_page(company_new_page);
    }
}
//跳转某一页
function go_to_page(page_num){
        //get the number of items shown per page
        var show_per_page = parseInt($('#show_per_page').val());
        var company=parseInt($('.show_per_page').val());//公司动态特殊处理
        //get the element number where to start the slice from
        var start_from = page_num * show_per_page;
        var  company_start_from=page_num * company;//公司动态特殊处理
        //get the element number where to end the slice
        var  end_on = start_from + show_per_page;
        var  company_end_on = start_from + company;//公司动态特殊处理

        //hide all children elements of content div, get specific items and show them
        $('#fzzx-top-line').children().css('display', 'none').slice(start_from, end_on).css('display', 'block');
        $('#fzzx-company').children().css('display', 'none').slice(company_start_from, company_end_on).css('display', 'block');//公司动态特殊处理

        /*get the page link that has longdesc attribute of the current page and add active_page class to it
         and remove that class from previously active page link*/
        //给当前li动态添加active类
        $('.page_link[longdesc=' + page_num +']').parents('li').addClass('active').siblings('.active').removeClass('active');
        //update the current page input field
        $('#current_page').val(page_num);
        $('.current_page').val(page_num);//公司动态特殊处理

}

