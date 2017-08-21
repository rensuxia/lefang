var userLMobile = {
  METHOD_NAME: 'user.loginmobile',
  SECURITY_TYPE: 'None',
  REQUIRED: {
   mobile:'string',
   code:'string'
  },
  OPTIONAL: {},
  VERIFY: {},
  ERROR_CODE: {
       8003: '该手机号码不存在'
  }
}