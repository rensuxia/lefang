//定义接口

/*-------省------*/
var province = {
  METHOD_NAME: 'city.province',
  SECURITY_TYPE: 'None',
  REQUIRED: {},
  OPTIONAL: {},
  VERIFY: {},
  ERROR_CODE: {}
}

/*-------市-------*/
var city = {
  METHOD_NAME: 'city.city',
  SECURITY_TYPE: 'None',
  REQUIRED: {
  	pid:'long'
  },
  OPTIONAL: {},
  VERIFY: {},
  ERROR_CODE: {}
}

/*-------区-------*/
var area = {
  METHOD_NAME: 'city.area',
  SECURITY_TYPE: 'None',
  REQUIRED: {
  	pid:'long'
  },
  OPTIONAL: {},
  VERIFY: {},
  ERROR_CODE: {}
}

/*添加地址*/
var addInvoiceAdress = {
  METHOD_NAME: 'addresspostcodes.addAddressPostcodes',
  SECURITY_TYPE: 'None',
  REQUIRED: {
      usercode:'string',
      username:'string',
      province:'string',
      city:'string',
      area:'string',
      address:'string',
      phone_number:'string',
      status:'string',
      postcodes:'string'
  },
  OPTIONAL: {},
  VERIFY: {},
  ERROR_CODE: {}
}

/*查询发票寄送地址*/
var queryInvoiceAddress = {
  METHOD_NAME: 'addresspostcodes.AddressPostcodes',
  SECURITY_TYPE: 'None',
  REQUIRED: {
      usercode:'string'
  },
  OPTIONAL: {},
  VERIFY: {},
  ERROR_CODE: {}
}

/*删除发票寄送地址*/
var deleteInvoiceAddress = {
  METHOD_NAME: 'addresspostcodes.DeleteAddressPostcodes',
  SECURITY_TYPE: 'None',
  REQUIRED: {
      id:'long'
  },
  OPTIONAL: {},
  VERIFY: {},
  ERROR_CODE: {}
}

/*修改发票地址*/
var updateInvoiceAddress = {
  METHOD_NAME: 'addresspostcodes.updateAddressPostcodes',
  SECURITY_TYPE: 'None',
  REQUIRED: {
      id:'long',
      username:'string',
      province:'string',
      city:'string',
      area:'string',
      address:'string',
      phone_number:'string',
      status:'string',
      postcodes:'string'
  },
  OPTIONAL: {},
  VERIFY: {},
  ERROR_CODE: {}
}

/*设为默认发票地址*/
var setInvoiceAddress = {
    METHOD_NAME: 'addresspostcodes.SetAddressPostcodes',
    SECURITY_TYPE: 'None',
    REQUIRED: {
        usercode:'string',
        status:'string',
        id:'long'
    },
    OPTIONAL: {},
    VERIFY: {},
    ERROR_CODE: {}
}



/*---------------------发票管理类接口------------------------*/

/*待开发票*/
var queryOrders = {
    METHOD_NAME: 'invoice.queryOrders',
    SECURITY_TYPE: 'None',
    REQUIRED: {
        usercode:'string'
    },
    OPTIONAL: {},
    VERIFY: {},
    ERROR_CODE: {}
}

/*索要发票*/
var getInvoices = {
    METHOD_NAME: 'invoice.queryInvoiceOrders',
    SECURITY_TYPE: 'None',
    REQUIRED: {
        usercode:'string'
    },
    OPTIONAL: {},
    VERIFY: {},
    ERROR_CODE: {}
}

/*发票管理*/
var invoicesManage = {
    METHOD_NAME: 'invoice.queryToOthers',
    SECURITY_TYPE: 'None',
    REQUIRED: {
        usercode:'string'
    },
    OPTIONAL: {},
    VERIFY: {},
    ERROR_CODE: {}
}

/*预览发票*/
var getInvoice = {
    METHOD_NAME: 'invoice.queryToMe',
    SECURITY_TYPE: 'None',
    REQUIRED: {
        usercode:'string'
    },
    OPTIONAL: {},
    VERIFY: {},
    ERROR_CODE: {}
}

/*采购订单列表*/
var purchaseOrderList = {
    METHOD_NAME: 'order.buyerOrders',
    SECURITY_TYPE: 'None',
    REQUIRED: {
        buyers:'string',
        enterprise_id:'string',
        currentPage:'string'
    },
    OPTIONAL: {
      querytype:'string'
    },
    VERIFY: {},
    ERROR_CODE: {}
}

/*销售订单列表*/
var saleOrderList = {
    METHOD_NAME: 'order.sellerOrders',
    SECURITY_TYPE: 'None',
    REQUIRED: {
        seller:'string',
        enterprise_id:'string',
        currentPage:'string'
    },
    OPTIONAL: {
        querytype:'string'
    },
    VERIFY: {},
    ERROR_CODE: {}
}

/*取消订单*/
var cancleOrder = {
    METHOD_NAME: 'order.orderCancle',
    SECURITY_TYPE: 'None',
    REQUIRED: {
        id:'string'
    },
    OPTIONAL: {},
    VERIFY: {},
    ERROR_CODE: {}
}
