//地址列表
var addressList = {
  METHOD_NAME: 'address.Address',
  SECURITY_TYPE: 'None',
  REQUIRED: {
   usercode:'string',
  },
  OPTIONAL: {},
  VERIFY: {},
  ERROR_CODE: {}
}


//删除地址
var addressDel = {
  METHOD_NAME: 'address.DeleteAddress',
  SECURITY_TYPE: 'None',
  REQUIRED: {
    id:'long'
  },
  OPTIONAL: {},
  VERIFY: {},
  ERROR_CODE: {}
}
//设置默认地址
var addressSet = {
  METHOD_NAME: 'address.SetAddress',
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
//编辑更新地址

var addressUpdate={
  METHOD_NAME:'address.updateAddress',
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
