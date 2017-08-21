$(function () {
    //获取乐纺头条和纺织知识两个列表
    var lfknowedge=new MilkT(lfKnowledge,3);
    lfknowedge.send({cateoneid:'2'}).done(function (data) {
        var knowedge=data.cmscate1;
        var top_line_name=knowedge[0].category_name;//获取第一条数据的名称
        var top_line_id=knowedge[0].id;  //获取第一条数据的id
        var fzzx_knowedge=knowedge[knowedge.length-1].category_name;//获取最后一条数据的名称
        var fzzx_knowedge_id=knowedge[knowedge.length-1].id;//获取最后一条数据的id
        $('#lf_top').text(top_line_name);
        $('#fz_knowedge').text(fzzx_knowedge);
        //乐纺头条内容的动态加载
        getInfo($('#lefang_top_line'),top_line_id);
        //纺织知识内容的动态加载
        getInfo($('#lefang_knowedge'),fzzx_knowedge_id);
    })
    //获取乐纺头条和纺织知识对应的列表内容
    function getInfo(obj,id) {
        var lfcontent=new MilkT(lfContent, 3);
        lfcontent.send({cateID:id}).done(function (data) {
            // console.log(data);
            var news=data.cms;
            for(var i=0;i<news.length;i++){//转换日期
                news[i].release_time=todate(news[i].release_time,'-',true);
            }
            // console.log(news);
            var compiled=_.template('<% _.forEach(news,function(news){\
            %>\
             <li id="<%= news.id %>" onmouseover="showImg(this)">\
            <a href="javascript:;">\
            <img src="<%= news.news_pictuer_url%>"/>\
            </a>\
            <p>\
            <a href="fzzx_detail.html?id= <%= news.id %>"><%= news.news_title %></a>\
        <span><%= news.release_time %></span>\
        </p>\
        </li>\
            <%})%>');
            var templateTest=compiled({'news':news});
            $(obj).append(templateTest);
        })
    }
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


})

function showImg(obj) {
    // alert('1111');
    // var nId=$(obj).parents('li').attr('id');    //如果点击事件给a将会找到父元素的id
    var nId=$(obj).attr('id');
    var lfcontentdetail=new MilkT(lfContentDetail,3);
    lfcontentdetail.send({id:nId}).done(function (data) {
        // console.log(data);
        var compiled=_.template('\
            <a href="javascript:;" class="lefang_imgs">\
            <img class="ImgSize" src="<%= Data.news_pictuer_url %>" alt="">\
        </a>\
        <h3><%= Data.news_title %></h3>\
            <div class="contentP"><%= Data.news_content %></div>\
        <a href="fzzx_detail.html?id=<%= Data.id %>"  class="lefang_news_des right">详情<img src="images/icon/arrow-A.png" alt=""></a>\
            ')
        var templateTest=compiled({'Data':data});
        $('#lefang_detail').children().remove();
        $('#lefang_detail').append(templateTest);
    })
}


