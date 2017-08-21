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
