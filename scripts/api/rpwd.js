/***修改密码接口对接****/
var rpwd={
  METHOD_NAME: 'user.updatecode',
  SECURITY_TYPE: 'None',
  REQUIRED: {
    usercode:'string',
    password:'string',
    freshpassword:'string'
  },
  OPTIONAL: {},
  VERIFY: {},
  ERROR_CODE: {}
}
