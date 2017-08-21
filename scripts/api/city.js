//省
var city_province = {
  METHOD_NAME: 'city.province',
  SECURITY_TYPE: 'None',
  REQUIRED: {
  },
  OPTIONAL: {},
  VERIFY: {},
  ERROR_CODE: {}
}
//市
var city_city = {
  METHOD_NAME: 'city.city',
  SECURITY_TYPE: 'None',
  REQUIRED: {
    pid:'long'
  },
  OPTIONAL: {},
  VERIFY: {},
  ERROR_CODE: {}
}
//区
var city_area = {
  METHOD_NAME: 'city.area',
  SECURITY_TYPE: 'None',
  REQUIRED: {
    pid:'long'
  },
  OPTIONAL: {},
  VERIFY: {},
  ERROR_CODE: {}
}
//增加详细地址
var add_address={
  METHOD_NAME: 'address.addAddress',
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


//手机号码的验证
// var userPhoneN = {
//   METHOD_NAME: 'user.phone_number',
//   SECURITY_TYPE: 'None',
//   REQUIRED: {
//     phone_number:'string'
//   },
//   OPTIONAL: {},
//   VERIFY: {},
//   ERROR_CODE: {}
// }


/*增加删除更新地址等*/
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
