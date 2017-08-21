var orderSave = {
  METHOD_NAME: 'order.orderSave',
  SECURITY_TYPE: 'None',
  REQUIRED: {
    address:'string',
    usercode:'string',
    shopCatIds:'string'
  },
  OPTIONAL: {
    remark:'string'
  },
  VERIFY: {},
  ERROR_CODE: {}
}