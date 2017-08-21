//商品管理列表
var goodsList={
    METHOD_NAME:'product.queryGoodsList',
    SECURITY_TYPE: 'None',
    REQUIRED: {
        usercode:'string'
    },
    OPTIONAL: {},
    VERIFY: {},
    ERROR_CODE: {}
}
//搜索接口的对接
var serachGood={
  METHOD_NAME:'product.querySearch',
  SECURITY_TYPE: 'None',
  REQUIRED: {
        usercode:'string',
        product_name:'string',
        category_id:'string',
        brand_name:'string',
        apply_status:'string',
        isup:'string'
    },
  OPTIONAL: {},
  VERIFY: {},
  ERROR_CODE: {}
}
/*删除接口对接*/
var DelGood={
  METHOD_NAME:'product.queryDelete',
  SECURITY_TYPE: 'None',
  REQUIRED: {
   id:'string'
  },
  OPTIONAL: {},
  VERIFY: {},
  ERROR_CODE: {}
}
/**下架接口对接**/
var XiaGood={
  METHOD_NAME:'product.queryDown',
  SECURITY_TYPE: 'None',
  REQUIRED: {
    id:'string'
  },
  OPTIONAL: {},
  VERIFY: {},
  ERROR_CODE: {}
}
// 获得产品分类的接口对接
var category={
    METHOD_NAME:'product.queryCategory',
    SECURITY_TYPE: 'None',
    REQUIRED: {
        category_id:'string'
    },
    OPTIONAL: {},
    VERIFY: {},
    ERROR_CODE: {}
}

//获得产品分类一级分类所对应的属性
var categoryattr= {
  METHOD_NAME: 'product.SelectAttr',
  SECURITY_TYPE: 'None',
  REQUIRED: {
    category_id: 'string'
  },
  OPTIONAL: {},
  VERIFY: {},
  ERROR_CODE: {}
}



// 发布商品接口对接
var Release_Goods={
    METHOD_NAME:'product.releaseGoods',
    SECURITY_TYPE: 'None',
    REQUIRED: {
        product_name:'string',
        product_no:'string',
        main_pic:'string',
        purpose:'string',
        addr:'string',
        remark:'string',
        product_details:'string',
        brand_name:'string',
        category_id:'string',
        company_code:'string',
        batch_no:'string',
        inspection_report_url:'string',
        z_remark:'string',
        refer_price:'string',
        is_special:'string',
        special_price:'string',
        count:'string',
        isup:'string',
        overdue:'string',
        unit:'string',
        periodfordispatch:'string',
        mqq:'string',
        issuperior:'string',
        pic1:'string',
        pic2:'string',
        pic3:'string',
        product_json:'string',

    },
    OPTIONAL: {},
    VERIFY: {},
    ERROR_CODE: {}
}
