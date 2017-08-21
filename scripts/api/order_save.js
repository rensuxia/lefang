var smorder_save = {
  METHOD_NAME: 'order.smallordersave',
  SECURITY_TYPE: 'None',
  REQUIRED: {
   address:'string',
   productBatchId:'string',
   productNumbers:'string',
   usercode:'string',
   type:'string'
  },
  OPTIONAL: {
  	remark:'string'
  },
  VERIFY:{},
  ERROR_CODE: {}
}
