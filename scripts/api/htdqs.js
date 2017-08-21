//销售合同待签署、采购合同待签署
//相比较合同管理多了一个签署按钮，所以不能一起封装
var htdqsXs={
    METHOD_NAME:'contract.salesandpurchasing',
    SECURITY_TYPE:'None',
    REQUIRED: {
        usercode:'string',
        CompanyId:'string',
        contractType:'string',
        contractStatus:'string',
        currentPage:'srting'
},
    OPTIONAL: {},
    VERIFY: {},
    ERROR_CODE: {}
}
//采购合同管理按钮
var CGhtgl_select={
    METHOD_NAME:'contract.statusnubmer',
    SECURITY_TYPE:'None',
    REQUIRED:{
        usercode:'string',
        CompanyId:'string',
        contractType:'string'
    },
    OPTIONAL:{},
    VERIFY:{},
    ERROR_CODE:{}
}
//销售合同管理按钮
var XShtgl_select={
    METHOD_NAME:'contract.statusnubmer',
    SECURITY_TYPE:'None',
    REQUIRED:{
        usercode:'string',
        CompanyId:'string',
        contractType:'string'
    },
    OPTIONAL:{},
    VERIFY:{},
    ERROR_CODE:{}
}
//采购合同管理、销售合同管理、销售合同按钮的点击事件、采购合同按钮的点击事件
var htdqsCggl={
    METHOD_NAME:'contract.salesandpurchasing',
    SECURITY_TYPE:'None',
    REQUIRED: {
        usercode:'string',
        CompanyId:'string',
        contractType:'string',
        contractStatus:'string',
        currentPage:'string'
    },
    OPTIONAL: {},
    VERIFY: {},
    ERROR_CODE: {}
}
//销售合同待签署的查询按钮、采购合同待签署的查询按钮
var checkXs={
    METHOD_NAME:'contract.salesandpurchasing',
    SECURITY_TYPE:'None',
    REQUIRED:{
        usercode:'string',//当前操作人id
        CompanyId:'string',//当前操作人公司id
        contractStatus:'string',//该订单状态  1采购合同待签署   2销售合同待签署
        contractType:'string',//该订单类型  1采购   2销售
        contractSearchValue:'string',//传入的搜索值
        currentPage:'string'//当前页
    },
    OPTIONAL: {},
    VERIFY: {},
    ERROR_CODE: {}
}





//验证同一公司合同编号不能重复的接口
var validate={
    METHOD_NAME:'contract.validatecontractcode',
    SECURITY_TYPE:'None',
    REQUIRED:{
        usercode:'string',  //当前操作人id
        CompanyId:'string',  //当前操作人公司id
        contractCode:'string'  //合同的编号，这里是用户输入的编号
    },
    OPTIONAL: {},
    VERIFY: {},
    ERROR_CODE: {}
}



